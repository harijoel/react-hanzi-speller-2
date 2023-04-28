import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SpelledKey, TouchedEl } from './types'
import StatDelta from './StatDelta'

type StatusBarProps = {
    vocabularySetId: string
    wordId: string | number
    inputKeys: SpelledKey[]
    correctMap: boolean[]
    mistakeTrail: string[]
    inputSylArray: SpelledKey[][]
    isSpellingOver: boolean
    isSpellingOverAndExtraKey: boolean
    lastTouchedEl: React.MutableRefObject<TouchedEl>
}

export default function StatusBar({
    vocabularySetId, 
    wordId, 
    inputKeys, 
    correctMap, 
    mistakeTrail, 
    inputSylArray, 
    isSpellingOver,
    isSpellingOverAndExtraKey,
    lastTouchedEl}: StatusBarProps) {

    const isSpellingStarted = !!mistakeTrail.length || !!correctMap.length

    const spellingOverImg = useRef({
        spelledKeysCount: Infinity, 
        correctKeysCount: 0,
        spelledHanziCount: Infinity, 
        correctSpelledHanziCount: 0
    })

    useEffect(() => {
        if (isSpellingOver || isSpellingOverAndExtraKey) {
            spellingOverImg.current = {
                spelledKeysCount: correctMap.length, 
                correctKeysCount: correctMap.filter(correctKey => correctKey).length,
                spelledHanziCount: inputSylArray.length, 
                correctSpelledHanziCount: inputSylArray.filter(sylArr => { 
                    const sylArrMapped = sylArr.map(sk => sk?.inputKey[0] === sk?.correctKey)
                    return !sylArrMapped.includes(false)
                    }).length
            }
        }
    }, [isSpellingOver, isSpellingOverAndExtraKey])


    const t1 = useRef(0)

    const [timeVars, setTimeVars] = useState({
        newWordTime: t1.current,

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
        console.log(lastTouchedEl.current, " was touched!")
        t1.current = performance.now()
        if (lastTouchedEl.current !== "none") {
            spellingOverImg.current = {
                spelledKeysCount: Infinity, 
                correctKeysCount: 0,
                spelledHanziCount: Infinity, 
                correctSpelledHanziCount: 0
            }
            setTimeVars(oldState => { return {
                ...oldState,
                newWordTime: t1.current,

                timeDif: 0, 
                keySpeed: 0, 
                keySpeedDif: 0, 
                avgHanziTime: 0,
                avgHanziTimeDif: 0,

                keyAccuracy: 0,
                keyAccuracyDif: 0,
                hanziAccuracy: 0,
                hanziAccuracyDif: 0
            }})
        }
    }, [lastTouchedEl.current, wordId])


    useEffect(() => {

        
        if (lastTouchedEl.current !== "none") {
            return
        }
        //t1.current = performance.now()
        setTimeVars(oldState => { 
            const newWordTime = t1.current
            const timeDif = (newWordTime - oldState.newWordTime) / 1000
            const keySpeed = spellingOverImg.current.spelledKeysCount === Infinity ? 0 : (spellingOverImg.current.spelledKeysCount / timeDif)
            const avgHanziTime = (timeDif / spellingOverImg.current.spelledHanziCount)
            const keyAccuracy = (spellingOverImg.current.correctKeysCount / spellingOverImg.current.spelledKeysCount) * 100
            const hanziAccuracy = ((spellingOverImg.current.correctSpelledHanziCount / spellingOverImg.current.spelledHanziCount) * 100)
            return {...oldState, 
                newWordTime: newWordTime,
                timeDif: timeDif, 
                keySpeed: keySpeed,
                keySpeedDif: keySpeed - oldState.keySpeed,
                avgHanziTime: timeDif / spellingOverImg.current.spelledHanziCount,
                avgHanziTimeDif: avgHanziTime - oldState.avgHanziTime,

                keyAccuracy: keyAccuracy,
                keyAccuracyDif: keyAccuracy - oldState.keyAccuracy,
                hanziAccuracy: hanziAccuracy,
                hanziAccuracyDif: hanziAccuracy - oldState.hanziAccuracy
            }
        })
    }, [wordId])



    return (
        <div className="status-bar">
            <div className="stat speed-stat" style={{width: "12em"}}>
                <span className='stat-label'>Speed: </span>

                {timeVars.keySpeed.toFixed(2)} key/s 
                {" ("}<StatDelta statDelta={timeVars.keySpeedDif} />{")"}
            </div>


            <div className="stat time-stat" style={{width: "7em"}}>
                <span className='stat-label'>Time: </span>
                {timeVars.timeDif > 99 ? "99+" : timeVars.timeDif.toFixed(1)} s
            </div>


            <div className="stat hanzi-time-stat" style={{width: "12em"}}>
                <span className='stat-label'>Hanzi avg: </span>

                {timeVars.avgHanziTime > 99 ? "99+" : timeVars.avgHanziTime.toFixed(2)} s 
                (<StatDelta statDelta={timeVars.avgHanziTimeDif} invert={true} />)
            </div>


            <div className="stat acc-stat" style={{width: "15em"}}>
                <span className='stat-label'>Key accuracy: </span>

                {timeVars.keyAccuracy.toFixed(2)}% 
                (<StatDelta statDelta={timeVars.keyAccuracyDif} />)
            </div>


            <div className="stat hanzi-acc-stat" style={{width: "15.5em"}}>
                <span className='stat-label'>Hanzi accuracy: </span>

                {timeVars.hanziAccuracy.toFixed(2)}% 
                (<StatDelta statDelta={timeVars.hanziAccuracyDif} />)
            </div>

            <h3 className="input-visual">

                {vocabularySetId}:#{wordId}
                :$
                {inputKeys.map((c, i) => {
                    const isCorrect = c.correctKey == c.inputKey[0]
                    const color = isCorrect ? "#aaa" : "red"
                    return (
                        <span key={"header-"+i} >
                            { !isCorrect && <span style={{color: "black"}}>,{c.inputKey}:</span> }
                            <span style={{color: color, fontWeight: !isCorrect ? "bold" : ""}}>{c.correctKey}</span> 
                        </span>
                    )
                })}

                |{mistakeTrail.map((mk, i) => <span key={"mk-"+i} style={{color: "black"}}>{mk}</span> )}

            </h3>
        </div>
    )
}
