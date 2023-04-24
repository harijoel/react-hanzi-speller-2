import React from 'react'
import { SpelledKey } from './types'
import { playTest } from './util'

type StatusBarProps = {
    vocabularySetId: string
    wordId: string | number
    inputKeys: SpelledKey[]
    mistakeTrail: string[]
    resetState: (newWord?: boolean) => void
}

export default function StatusBar({vocabularySetId, wordId, inputKeys, mistakeTrail, resetState}: StatusBarProps) {
    return (
        <div>
            <h3 className="input-visual">

                <button onClick={() => {
                    playTest()
                    resetState()
                }}>
                    Reset
                </button>

                {vocabularySetId}:#{wordId}
                :$
                {inputKeys.map((c, i) => {
                    const color = c.correctKey == c.inputKey ? "blue" : "red"
                    return (
                        <span key={"header-"+i} style={{color: color}}>
                            {c.correctKey}
                        </span>
                    )
                })}

                |{mistakeTrail.map((mk, i) => <span key={"mk-"+i} style={{color: "orange"}}>{mk}</span> )}
                
            </h3>
        </div>
    )
}
