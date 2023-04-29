import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import hsk1 from './hsk-vocabulary/hsk-1.json'
import hsk2 from './hsk-vocabulary/hsk-2.json'
import hsk3 from './hsk-vocabulary/hsk-3.json'
import hsk4 from './hsk-vocabulary/hsk-4.json'
import hsk5 from './hsk-vocabulary/hsk-5.json'
import hsk6 from './hsk-vocabulary/hsk-6.json'
const hskVocabularies: any = {
  hsk1,
  hsk2,
  hsk3,
  hsk4,
  hsk5,
  hsk6
}

import ChineseWord from "./ChineseWord"
import Settings from "./Settings"
import { SpelledKey, Setting, HSKword, TouchedEl} from "./types"
import { getDynamicIndex, getWordArray, playKeypressFX, playMistakeFX, playWinFX, sylibalizeInput } from "./util"

import './app.css'
import Translation from "./Translation"
import Buddy from "./Buddy"
import StatusBar from "./StatusBar"

function getRandomHSK(hsk: any) {
  const random_HSK_vocab_id = Math.floor(Math.random() * hsk.words.length)
  return hsk.words[random_HSK_vocab_id]
}

function App() {
  // Settings: default
  const [settings, setSettings] = useState<Setting>({
    mode: "noTones", 
    mistakeCountTolerance: 2, 
    traditional: false, 
    showAns: false,
    hideChars: false,
    showEnglish: true,
    animations: true,
    hskLevel: "hsk3" })
  const mistakeCountTolerance = settings.mistakeCountTolerance
  const mode = settings.mode
  const traditional = settings.traditional
  const showAns = settings.showAns
  const hideChars = settings.hideChars
  const animations = settings.animations
  
  // State variables
  const [hskWord, setHskWord] = useState<HSKword>(() => getRandomHSK(hskVocabularies[settings.hskLevel]))
  const [inputKeys, setInputKeys] = useState<SpelledKey[]>([])
  const [mistakeTrail, setMistakeTrail] = useState<string[]>([])
  const [revealNos, setRevealNos] = useState<number[]>([])
  const lastTouchedEl = useRef<TouchedEl>("none") 

  // hanziPinyinArrayWord, textToType #:Once every new word
  const [hanziPinyinArrayWord, 
         textToType, 
         textToTypeSyl_Array] = useMemo(() => 
    {
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
  let inputSylArray = useMemo(() => {
    return sylibalizeInput(hanziPinyinArrayWord, inputKeys)
  }, [inputKeys, mode])
  console.log(inputSylArray)

  // Is Spelling over & Dynamic Index
  const isSpellingOver = inputKeys.length === textToType.length
  const isSpellingOverAndExtraKey = inputKeys.length > textToType.length
  const normalIndex = inputSylArray.length - 1
  const dynamicIndex = getDynamicIndex(inputSylArray, textToTypeSyl_Array)
  const isPatternStop = inputKeys.length > textToType.length - mistakeCountTolerance - 1
  const correctMap = inputKeys.map(sk => sk.inputKey[0] === sk.correctKey)
  const isReveal = !!revealNos.length && (!showAns || !hideChars)
  // ##  End of dependent variables  ## //

  // Reset State
  const resetState = useCallback((newWord: boolean = false) => {
    setInputKeys([])
    setRevealNos([])
    setMistakeTrail([])
    if (newWord) {
      let randomHSK = getRandomHSK(hskVocabularies[settings.hskLevel])
      while (randomHSK.metadata.id === hskWord.metadata.id) {
        randomHSK = getRandomHSK(hskVocabularies[settings.hskLevel])
      }
      setHskWord(randomHSK)
    }
  }, [settings.hskLevel])

  // Add input key functionality
  const addInputKey = useCallback(
    (key: string, mistakeTrail: string[]) => {
      playKeypressFX()
      const correctKey = key
      const inputTail = isReveal ? ['-', correctKey] : [correctKey]
      setInputKeys(currentSpelledKeys => 
        [...currentSpelledKeys,  
        { inputKey: [...mistakeTrail, ...inputTail],         // else set as missing-mistake
      correctKey: key
        }])
      setMistakeTrail([])
    },
    [inputKeys, mistakeTrail, revealNos, mode]
  )

  // Pattern detector
  useEffect(() => {
    const isAbsentPatternDisabled = mistakeTrail.length === mistakeCountTolerance && mode === "onlyTones"
    if (isAbsentPatternDisabled || isPatternStop || !mistakeCountTolerance) {
      return
    }
    const index = inputKeys.length
    // Define trail patterns
    const mistakesFromAbsent = mistakeTrail.slice(0, mistakeCountTolerance)
    const mistakesFromMistype = mistakeTrail.slice(1, mistakeCountTolerance + 1)

    // Get correct text ahead
    const textAhead = textToType.slice(index+1, index+1 + mistakeCountTolerance)
    const remainingInputKeys: SpelledKey[] = textAhead.map(
      (correctKey, i) => {
        return {inputKey: [correctKey], correctKey: correctKey}
      })
    
    // Compare text ahead with trail patterns
    let inputKey = [mistakeTrail[0]]
    let patternFound = false
      // case: Absent key
    if (JSON.stringify(mistakesFromAbsent) === JSON.stringify(textAhead) && mode !== "onlyTones") {
      inputKey = ["-"]
      patternFound = true
    }
      // case: Mistyped key
    if (JSON.stringify(mistakesFromMistype) === JSON.stringify(textAhead)) {
      inputKey = [mistakeTrail[0], "-"]
      patternFound = true
    }
    // Display correct text ahead if pattern is found in mistake trail
    if (patternFound) {
      playKeypressFX()
      const wrongInputKey: SpelledKey = {inputKey: inputKey, correctKey: textToType[index]}
      setInputKeys(currentSpelledKeys => [...currentSpelledKeys,
                                          wrongInputKey,
                                          ...remainingInputKeys])
      setMistakeTrail([])
      }
    }, 
  [mistakeTrail.length > mistakeCountTolerance, 
   mistakeTrail.length === mistakeCountTolerance, 
   isPatternStop, mode])

  // Handle 'Keypress' & router
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z0-9]$/)) return
      e.preventDefault

      // Handle Correct keypress
      if (key === textToType[inputKeys.length]) {
        addInputKey(key, mistakeTrail) } 
      else {
      // Handle Incorrect keypress
        playMistakeFX()
        if (isReveal) return
        setMistakeTrail(oldMistakeTrail => [...oldMistakeTrail, key])
        console.log(mistakeTrail.length)
      }
    }
    document.addEventListener("keypress", handler)
    return () => { 
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys, mistakeTrail, revealNos, mode, mistakeCountTolerance])

  // Handle extra keypress
  useEffect(() => {
    if (isSpellingOver && mistakeTrail.length && mode !== "onlyTones") {
      setInputKeys(oldInputKeys => [...oldInputKeys, {inputKey: [mistakeTrail[0]], correctKey: "..."}])
    }
  }, [isSpellingOver, mistakeTrail, mode])

  // Turn off reveal when jump to other character
  useEffect(() => {
    setRevealNos([])
  }, [dynamicIndex])

  // Handle 'Enter' keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key != "Enter") return
      e.preventDefault

      // Start new word if game is over
      if (isSpellingOver || isSpellingOverAndExtraKey) {
        lastTouchedEl.current = "none"
        playWinFX()
        resetState(true)
      } 
      else { 
      // ((mistakeTrail.length > 0 || dynamicIndex === normalIndex && !showAns) || (hideChars && showAns)) && !(showAns && !hideChars )
      const isAnyKeypress = mistakeTrail.length > 0 || dynamicIndex === normalIndex
      const justFlip = (hideChars && showAns)
      // 
        if (isAnyKeypress && !showAns || justFlip) {
          playMistakeFX()
          setRevealNos(oldRevealNos => [...oldRevealNos, dynamicIndex])
        }
      }
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [dynamicIndex, mistakeTrail.length, isSpellingOver, isSpellingOverAndExtraKey, normalIndex, hideChars, showAns])


  return (
    <div>
      <Settings resetState={resetState}
                setSettings={setSettings}
                settings={settings}
                lastTouchedEl={lastTouchedEl}
      />

      <StatusBar  
        vocabularySetId={settings.hskLevel}
        wordId={hskWord.metadata.id}
        inputKeys={inputKeys}
        correctMap={correctMap}
        mistakeTrail={mistakeTrail}
        inputSylArray={inputSylArray}
        isSpellingOver={isSpellingOver}
        isSpellingOverAndExtraKey={isSpellingOverAndExtraKey}
        lastTouchedEl={lastTouchedEl}
      />
      
      <Buddy 
        mistakeTrail={mistakeTrail} 
        revealNos={revealNos} 
        inputKeys={inputKeys} 
        correctMap={correctMap}
        showAns={showAns} 
        isSpellingOver={isSpellingOver}
        isSpellingOverAndExtraKey={isSpellingOverAndExtraKey} 
        lastTouchedEl={lastTouchedEl}
        resetState={resetState}
      />

      <ChineseWord
        hanziPinyinArrayWord={hanziPinyinArrayWord} 
        inputSylArray={inputSylArray}
        dynamicIndex={dynamicIndex}
        textToTypeSyl_Array={textToTypeSyl_Array}
        setRevealNos={setRevealNos}
        revealNos={revealNos}
        mistakeTrail={mistakeTrail}
        traditional={traditional}
        showAns={showAns}
        hideChars={hideChars}
        animations={animations}
      />
      
      {settings.showEnglish && <Translation translationData={hskWord["translation-data"].english} />}

    </div>
    
  )
}

export default App
