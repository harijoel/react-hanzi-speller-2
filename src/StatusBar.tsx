import React, { useEffect, useRef, useState } from 'react'
import { SpelledKey } from './types'
import StatDelta from './StatDelta'

type StatusBarProps = {
    vocabularySetId: string
    wordId: string | number
    inputKeys: SpelledKey[]
    correctMap: boolean[]
    mistakeTrail: string[]
    inputSylArray: SpelledKey[][]
    isSpellingOver: boolean
}

export default function StatusBar({
    vocabularySetId, 
    wordId, 
    inputKeys, 
    correctMap, 
    mistakeTrail, 
    inputSylArray, 
    isSpellingOver}: StatusBarProps) {

    const isSpellingStart = !!mistakeTrail.length || !!correctMap.length

    const spelledKeysCount = correctMap.length
    const correctKeysCount = correctMap.filter(correctKey => correctKey).length
    const keyAccuracy = ((correctKeysCount / spelledKeysCount) * 100)

    const spelledHanziCount = inputSylArray.length
    const correctSpelledHanziCount = inputSylArray.filter(sylArr => { 
        const sylArrMapped = sylArr.map(sk => sk.inputKey === sk.correctKey)
        return !sylArrMapped.includes(false)
    }).length
    const hanziAccuracy = ((correctSpelledHanziCount / spelledHanziCount) * 100)

    const t1 = useRef(0)
    const t2 = useRef(0)
    const [timeVars, setTimeVars] = useState({
        timeDif: 0, 
        keySpeed: 0, 
        keySpeedDif: 0, 
        avgHanziTime: 0,
        avgHanziTimeDif: 0,
        keyAccuracy: 0,
        keyAccuracyDif: 0,
        hanziAccuracy: 0,
        hanziAccuracyDif: 0
    })

    useEffect(() => {
        if (isSpellingStart && !isSpellingOver) {
            t1.current = performance.now()
        }
    
        if (isSpellingOver) {
            t2.current = performance.now()
            setTimeVars(oldState => { 
                const timeDif = (t2.current - t1.current) / 1000
                const keySpeed = spelledKeysCount / timeDif
                const avgHanziTime = timeDif / spelledHanziCount
                const keyAccuracy = (correctKeysCount / spelledKeysCount) * 100
                //const hanziAccuracy = hanziAccuracy
                return {...oldState, 
                    timeDif: timeDif, 
                    keySpeed: keySpeed,
                    keySpeedDif: keySpeed - oldState.keySpeed,
                    avgHanziTime: timeDif / spelledHanziCount,
                    avgHanziTimeDif: avgHanziTime - oldState.avgHanziTime,
                    keyAccuracy: keyAccuracy,
                    keyAccuracyDif: keyAccuracy - oldState.keyAccuracy,
                    hanziAccuracy: hanziAccuracy,
                    hanziAccuracyDif: hanziAccuracy - oldState.hanziAccuracy 
                }
            })
        }
    }, [isSpellingOver, isSpellingStart])



    return (
        <div className="status-bar">
            <div>
                Speed: {timeVars.keySpeed.toFixed(2)} key/s (<StatDelta statDelta={timeVars.keySpeedDif} />)
            </div>

            <div>
                Time: {timeVars.timeDif.toFixed(2)} s
            </div>

            <div>
                Hanzi avg: {timeVars.avgHanziTime.toFixed(1)} s (<StatDelta statDelta={timeVars.avgHanziTimeDif} />)
            </div>

            <div>
                Key accuracy: {timeVars.keyAccuracy.toFixed(2)}% (<StatDelta statDelta={timeVars.keyAccuracyDif} />)
            </div>

            <div>
                Hanzi accuracy: {timeVars.hanziAccuracy.toFixed(2)}% (<StatDelta statDelta={timeVars.hanziAccuracyDif} />)
            </div>

            <h3 className="input-visual">

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
