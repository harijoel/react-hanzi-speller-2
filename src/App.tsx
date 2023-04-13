import { useCallback, useEffect, useMemo, useState } from "react"
import hsk3 from './hsk-3.json'
import ChineseWord from "./ChineseWord"
import { SpelledKey } from "./types"
import { getWordArray } from "./util"


function getRandomHSK() {
  const random_HSK_vocab_id = Math.floor(Math.random() * hsk3.words.length)
  return hsk3.words[random_HSK_vocab_id]
}

function App() {
  //const [randomHSK, setRandomHSK] = useState(getRandomHSK)
  const randomHSK = {
    "metadata": {
        "id": "009",
        "learned": false,
        "description": ""
    },
    "translation-data": {
        "english": "office",
        "pinyin-numbered": "ban4gong1shi4",
        "pinyin": "bàngōngshì",
        "simplified": "办公室",
        "traditional": "辦公室"
    }
}
  const [inputKeys, setInputKeys] = useState<SpelledKey[]>([])
  const [mistakes, setMistakes] = useState<string[]>([])
  
  const mistakeCountTolerance = 3
  const mode = "noTones"
  const traditional = false

  const [hanziPinyinArrayWord, textToType] = useMemo(() => {
    const word = randomHSK["translation-data"]
    const hanziPinyinArrayWord = getWordArray(
                                    [word.simplified, word.traditional],
                                    word.pinyin,
                                    word["pinyin-numbered"],
                                    mode)
    const textToType = hanziPinyinArrayWord.map(syl => syl.textToType_Syl).join("").split("")

    return [hanziPinyinArrayWord, textToType]
  }, [randomHSK])

  console.log("## randomHSK ##")
  console.log(randomHSK)
  console.log("## hanzi pinyin array word ##")
  console.log(hanziPinyinArrayWord)


  const addInputKey = useCallback(
    (key: string) => {
      setInputKeys(currentSpelledKeys => [...currentSpelledKeys, 
                                          {inputKey: mistakes.length ? mistakes[0] : key,
                                          correctKey: textToType[currentSpelledKeys.length]}
                                          // why correntKey can't just be key
                                          ]
                  )
      setMistakes([])

    },
    [inputKeys, mistakes]
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
  }, [inputKeys, mistakes])

  return (
    <div>
      <h1>
        {inputKeys.map((c, i) => {
          const color = c.correctKey == c.inputKey ? "blue" : "red"
          return (
            <span key={i} style={{color: color}}>{c.correctKey}</span>
              )})
        }
      </h1>
      <ChineseWord 
        hanziPinyinArrayWord={hanziPinyinArrayWord} 
        inputKeys={inputKeys}
        traditional={traditional}
        mode={mode}
      />
    </div>
    
  )
}

export default App
