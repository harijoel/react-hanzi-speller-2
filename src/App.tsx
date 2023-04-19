import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import hsk from './hsk-vocabulary/hsk-6.json'
import ChineseWord from "./ChineseWord"
import Settings from "./Settings"
import { SpelledKey, Setting, HSKword } from "./types"
import { getDynamicIndex, getWordArray, playSound, playKeypressFX, playMistakeFX, playWinFX, sylibalizeInput } from "./util"

import './app.css'


function getRandomHSK(): HSKword {
  const random_HSK_vocab_id = Math.floor(Math.random() * hsk.words.length)
  return hsk.words[random_HSK_vocab_id]
}

function App() {
  const [hskWord, setHskWord] = useState<HSKword>(getRandomHSK)
  const [inputKeys, setInputKeys] = useState<SpelledKey[]>([])
  const [mistakeTrail, setMistakeTrail] = useState<string[]>([])
  const [revealNos, setRevealNos] = useState<number[]>([])
  // Settings
  const [settings, setSettings] = useState<Setting>({
    mode: "noTones", 
    mistakeCountTolerance: 2, 
    traditional: true, 
    showAns: false })
  const mistakeCountTolerance = settings.mistakeCountTolerance
  const mode = settings.mode
  const traditional = settings.traditional
  const showAns = settings.showAns
  // hanziPinyinArrayWord, textToType // Once every new word
  const [hanziPinyinArrayWord, textToType, textToTypeSyl_Array] = useMemo(() => {
    const word = hskWord["translation-data"]
    const hanziPinyinArrayWord = getWordArray(
                                    [word.simplified, word.traditional],
                                    word.pinyin,
                                    word["pinyin-numbered"],
                                    mode)
    const textToTypeSyl_Array = hanziPinyinArrayWord.map(syl => syl.textToType_Syl)
    const textToType = textToTypeSyl_Array.join("").split("")
    return [hanziPinyinArrayWord, textToType, textToTypeSyl_Array]
  }, [hskWord, mode])

  // Pinyinize input
  const inputSylArray = useMemo(() => {
    return sylibalizeInput(hanziPinyinArrayWord, inputKeys)
  }, [inputKeys, mode])
  console.log(inputSylArray)

  // Is Spelling over & Dynamic Index
  const isSpellingOver = inputKeys.length === textToType.length
  const dynamicIndex = getDynamicIndex(inputSylArray, textToTypeSyl_Array)
  // ##  End of dependent variables  ## //


  const addInputKey = useCallback(
    (key: string) => {
      playKeypressFX()
      setInputKeys(currentSpelledKeys => 
        [...currentSpelledKeys,  
        { inputKey: 
          !revealNos.length // if not reveal mode
            ? (mistakeTrail.length // if there is mistake
              ? mistakeTrail[0]    // dispaly that mistake
              : key)           // else diaplay correct
            : "missing",    // display missing mistake
        correctKey: key //textToType[currentSpelledKeys.length]
        }])
      setMistakeTrail([])
    },
    [inputKeys, mistakeTrail, revealNos, mode]
  )

  useEffect(() => {
    if (mistakeTrail.length >= mistakeCountTolerance && mistakeCountTolerance) {
      const index = inputKeys.length
      // Define trail patterns
      const mistakesFromAbsent = mistakeTrail.slice(0, mistakeCountTolerance)
      const mistakesFromMistype = mistakeTrail.slice(1, mistakeCountTolerance + 1)
      // Get correct text ahead
      const textAhead = textToType.slice(index+1, index+1 + mistakeCountTolerance)
      const remainingInputKeys: SpelledKey[] = textAhead.map(
        (correctKey, i) => {
          return {inputKey: correctKey, correctKey: correctKey}
        })
      
      // Compare text ahead with trail patterns
      let inputKey = mistakeTrail[0]
      let patternFound = false
        // case: Absent key
      if (JSON.stringify(mistakesFromAbsent) === JSON.stringify(textAhead)) {
        inputKey = "missing"
        patternFound = true
      }
        // case: Mistyped key
      if (JSON.stringify(mistakesFromMistype) === JSON.stringify(textAhead)) {
        inputKey = mistakeTrail[0]
        patternFound = true
      }
      // Display correct text ahead if pattern is found in mistake trail
      if (patternFound) {
        playKeypressFX()
        const wrongInputKey: SpelledKey = {inputKey: inputKey, correctKey: textToType[index]}
        setInputKeys(currentSpelledKeys => [...currentSpelledKeys,
                                            wrongInputKey,
                                            ...remainingInputKeys]
                                            )
        setMistakeTrail([])
        }
    }
  }, [mistakeTrail, mode])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z0-9]$/)) return

      e.preventDefault
      if (key === textToType[inputKeys.length]) {
        addInputKey(key)
      } 
      else {
        playMistakeFX()
        setMistakeTrail(oldMistakeTrail => [...oldMistakeTrail, key])
        console.log(mistakeTrail.length)
      }
      
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys, mistakeTrail, revealNos, mode])


  useEffect(() => {
    setRevealNos([])
  }, [dynamicIndex, mode])

  // Handle 'Enter' keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key != "Enter") return
      e.preventDefault

      // Start new word if game is over
      if (isSpellingOver) {
        playWinFX()
        setInputKeys([])
        setHskWord(getRandomHSK())
        setRevealNos([])
        setMistakeTrail([])
      } else {
        if (mistakeTrail.length > 0 || dynamicIndex === inputSylArray.length - 1 && !showAns) {
          setRevealNos([dynamicIndex])
        } 
      }
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys, mistakeTrail, mode])


  return (
    <div>
      <button onClick={() => playMistakeFX()}>Play Sound</button>
      <Settings setInputKeys={setInputKeys}
                setHskWord={setHskWord}
                getRandomHSK={getRandomHSK}
                setRevealNos={setRevealNos}
                setMistakeTrail={setMistakeTrail}
                setSettings={setSettings}
                settings={settings}
      />
      <h1>
        {!inputKeys.length && "##"}
        {inputKeys.map((c, i) => {
          const color = c.correctKey == c.inputKey ? "blue" : "red"
          return (
            <span key={"header-"+i} style={{color: color}}>{c.correctKey}</span>
              )})
        }
      </h1>
      <h2>{hskWord["translation-data"].english}</h2>
      <ChineseWord
        hanziPinyinArrayWord={hanziPinyinArrayWord} 
        inputSylArray={inputSylArray}
        traditional={traditional}
        textToTypeSyl_Array={textToTypeSyl_Array}
        revealNos={revealNos}
        showAns={showAns}
        mode={mode}
      />
    </div>
    
  )
}

export default App
