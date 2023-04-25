import React, { useEffect, useRef, useState } from 'react'
import { SpelledKey } from './types'
import { playTest } from './util'

type StatusBarProps = {
    vocabularySetId: string
    wordId: string | number
    inputKeys: SpelledKey[]
    correctMap: boolean[]
    mistakeTrail: string[]
    inputSylArray: SpelledKey[][]
    isSpellingOver: boolean
    resetState: (newWord?: boolean) => void
}

export default function StatusBar({
    vocabularySetId, 
    wordId, 
    inputKeys, 
    correctMap, 
    mistakeTrail, 
    inputSylArray, 
    isSpellingOver,
    resetState}: StatusBarProps) {

    const isSpellingStart = !!mistakeTrail.length || !!correctMap.length

    const spelledKeysCount = correctMap.length
    const correctKeysCount = correctMap.filter(correctKey => correctKey).length
    const keyAccuracy = ((correctKeysCount / spelledKeysCount) * 100).toFixed(2)

    const spelledHanziCount = inputSylArray.length
    const correctSpelledHanziCount = inputSylArray.filter(sylArr => { 
        const sylArrMapped = sylArr.map(sk => sk.inputKey === sk.correctKey)
        return !sylArrMapped.includes(false)
    }).length

    const hanziAccuracy = ((correctSpelledHanziCount / spelledHanziCount) * 100).toFixed(2)

    const t1 = useRef(0)
    const t2 = useRef(0)
    const [timedifVars, setTimedifVars] = useState({timeDif: 0, keySpeed: 0, avgHanziTime: 0})
    let keySpeed = "0"

    useEffect(() => {
        if (isSpellingStart && !isSpellingOver) {
            t1.current = performance.now()
        }
    
        if (isSpellingOver) {
            t2.current = performance.now()
            const timeDif = t2.current - t1.current
            setTimedifVars(curretState => { 
                return {...curretState, 
                    timeDif: timeDif, 
                    keySpeed: spelledKeysCount * 1000 / timeDif,
                    avgHanziTime: timeDif / spelledHanziCount }})
        }
    }, [isSpellingOver, isSpellingStart])



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

                {`hanziAccuracy ${hanziAccuracy}, 
                ${(timedifVars.timeDif / 1000).toFixed(2)} s |
                ${timedifVars.keySpeed.toFixed(2)} key/s |
                ${timedifVars.avgHanziTime.toFixed(1)} ms/hanzi`}

            </h3>
        </div>
    )
}
