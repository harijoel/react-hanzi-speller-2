import { useCallback, useEffect, useMemo, useState } from "react"
import hsk3 from './hsk-3.json'
import ChineseWord from "./ChineseWord"
import { SpelledKey } from "./types"
import { getDynamicIndex, getWordArray, sylibalizeInput } from "./util"


function getRandomHSK() {
  const random_HSK_vocab_id = Math.floor(Math.random() * hsk3.words.length)
  return hsk3.words[random_HSK_vocab_id]
}

function App() {
  const [randomHSK, setRandomHSK] = useState(getRandomHSK)
  const [inputKeys, setInputKeys] = useState<SpelledKey[]>([])
  const [mistakes, setMistakes] = useState<string[]>([])
  const [revealNos, setRevealNos] = useState<number[]>([])
  // Settings
  const mistakeCountTolerance = 2
  const mode = "noTones"
  const traditional = true
  // hanziPinyinArrayWord, textToType // Once every new word
  const [hanziPinyinArrayWord, textToType, textToTypeSyl_Array] = useMemo(() => {
    const word = randomHSK["translation-data"]
    const hanziPinyinArrayWord = getWordArray(
                                    [word.simplified, word.traditional],
                                    word.pinyin,
                                    word["pinyin-numbered"],
                                    mode)
    const textToTypeSyl_Array = hanziPinyinArrayWord.map(syl => syl.textToType_Syl)
    const textToType = textToTypeSyl_Array.join("").split("")
    return [hanziPinyinArrayWord, textToType, textToTypeSyl_Array]
  }, [randomHSK])

  // Pinyinize input
  const inputSylArray = useMemo(() => {
    return sylibalizeInput(hanziPinyinArrayWord, inputKeys)
  }, [inputKeys])
  console.log(inputSylArray)

  const spellingOver = inputKeys.length === textToType.length
  const dynamicIndex = getDynamicIndex(inputSylArray, textToTypeSyl_Array)

  // ##  End of dependent variables  ## //

  const addInputKey = useCallback(
    (key: string) => {
      setInputKeys(currentSpelledKeys => 
        [...currentSpelledKeys,  
        { inputKey: 
          !revealNos.length // if not reveal mode
            ? (mistakes.length // if there is mistake
              ? mistakes[0]    // dispaly that mistake
              : key)           // else diaplay correct
            : "missing",    // display missing mistake
        correctKey: key //textToType[currentSpelledKeys.length]
        }
        // why currentKey can't just be key
        ]
                  )
      setMistakes([])

    },
    [inputKeys, mistakes, revealNos]
  )

  useEffect(() => {
    // # Move this oustide
    if (mistakes.length >= mistakeCountTolerance) {
      const index = inputKeys.length
      const textAhead = textToType.slice(index+1, index+1 + mistakeCountTolerance)
      const mistakesFromAbsent = mistakes.slice(0, mistakeCountTolerance)
      const mistakesFromMistype = mistakes.slice(1, mistakeCountTolerance + 1)
      const remainingInputKeys: SpelledKey[] = textAhead.map(
        (correctKey, i) => {
          return {inputKey: correctKey, correctKey: correctKey}
        })

      let inputKey = mistakes[0]
      let pattern = false
      // Case where key was absent
      if (JSON.stringify(mistakesFromAbsent) === JSON.stringify(textAhead)) {
        inputKey = "missing"
        pattern = true
      }
      // Case where key was  mistyped
      if (JSON.stringify(mistakesFromMistype) === JSON.stringify(textAhead)) {
        inputKey = mistakes[0]
        pattern = true
      }
      if (pattern) {
        const wrongInputKey: SpelledKey = {inputKey: inputKey, correctKey: textToType[index]}
        setInputKeys(currentSpelledKeys => [...currentSpelledKeys,
                                            wrongInputKey,
                                            ...remainingInputKeys]
                                            )
        setMistakes([])
        }
    }
    // # End Move this oustide
  }, [mistakes])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z0-9]$/)) return

      e.preventDefault
      if (key === textToType[inputKeys.length]) {
        addInputKey(key)
      } 
      else {
        setMistakes(oldMistakes => [...oldMistakes, key])
        console.log(mistakes.length)
      }
      
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys, mistakes, revealNos])

  // Handle hitting Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {

      if (e.key != "Enter") return
      e.preventDefault

      // Start new word if game is over
      if (spellingOver) {
        setInputKeys([])
        setRandomHSK(getRandomHSK())
        setRevealNos([])
      } else {
        if (mistakes.length > 0 || dynamicIndex === inputSylArray.length - 1) {
          setRevealNos([dynamicIndex])
        }
        
      }
      
    }

    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }

  }, [inputKeys, mistakes])

  return (
    <div>
      <h1>
        {inputKeys.map((c, i) => {
          const color = c.correctKey == c.inputKey ? "blue" : "red"
          return (
            <span key={"header-"+i} style={{color: color}}>{c.correctKey}</span>
              )})
        }
      </h1>
      <ChineseWord 
        hanziPinyinArrayWord={hanziPinyinArrayWord} 
        inputSylArray={inputSylArray}
        traditional={traditional}
        textToTypeSyl_Array={textToTypeSyl_Array}
        revealNos={revealNos}
        mode={mode}
      />
    </div>
    
  )
}

export default App
