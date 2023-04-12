import { useCallback, useEffect, useState } from "react"

function getText() {
  return "abcdefghijklmnopqrstuvwxyz".split("")
}

type SpelledKey = {
  inputKey: string
  correctKey: string
}

function App() {
  const [textToType, setTextToType] = useState(getText)
  const [inputKeys, setInputKeys] = useState<SpelledKey[]>([])
  const [mistakes, setMistakes] = useState<string[]>([])
  const mistakeCountTolerance = 3
  console.log(mistakes)

  const addInputKey = useCallback(
    (key: string) => {
      

      // # Move this oustide
      console.log(mistakes.length)
      if (mistakes.length === mistakeCountTolerance || mistakes.length === mistakeCountTolerance + 1) {
        console.log("hihii")
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

      // # Add key or mistake
      if (key === textToType[inputKeys.length]) {
        setInputKeys(currentSpelledKeys => [...currentSpelledKeys, 
                                            {inputKey: mistakes.length ? mistakes[0] : key,
                                            correctKey: textToType[currentSpelledKeys.length]}
                                            // why correntKey can't just be key
                                           ]
                    )
        setMistakes([])
      } else {
        setMistakes(oldMistakes => [...oldMistakes, key])
      }
      // # End add key or mistake

    },
    [inputKeys, mistakes]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z0-9]$/)) return

      e.preventDefault
      addInputKey(key)
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
    </div>
    
  )
}

export default App
