import React, { useEffect, useRef, useState } from 'react'
import { SpelledKey, TouchedEl } from './types'
import { countConsecutiveLastTrueValues, playTest } from './util'

type BuddyProps = {
    mistakeTrail: string[]
    revealNos: number[]
    inputKeys?: SpelledKey[]
    correctMap: boolean[]
    showAns: boolean
    isSpellingOver: boolean
    isSpellingOverAndExtraKey: boolean
    lastTouchedEl: React.MutableRefObject<TouchedEl>
    resetState: (newWord?: boolean) => void
}

export default function Buddy({
    mistakeTrail, 
    revealNos, 
    inputKeys, 
    correctMap,
    showAns, 
    isSpellingOver, 
    isSpellingOverAndExtraKey,
    lastTouchedEl,
    resetState}: BuddyProps) {

    
    let emoticon = (showAns && !correctMap?.length) ? "🧐" : "🙂" // default
    const mistakeStreakEmoticons = ["😐", "🙁", "😥", "😰", "😨"]
    const correctStreakEmoticons = ["😀", "😆"]
    //const correctMap = correctMap
    const correctStreak = countConsecutiveLastTrueValues(correctMap)
    const incorrectStreak = countConsecutiveLastTrueValues(correctMap.map(c => !c))
    const mistakeStreak = mistakeTrail.length
    const isPerfectSpelling = isSpellingOver && !correctMap.includes(false)
    const isDisasterSpelling = isSpellingOver && !correctMap.includes(true)

    const sleepTime = 4000 //milliseconds 

    const [emo, setEmo] = useState<string>(emoticon)
    const [clickToggle, setClickToggle] = useState<boolean>(true)

    if (correctStreak) {
        emoticon = correctStreakEmoticons[correctStreak - 1] ?? "😎"
    }

    if (mistakeStreak) {
        emoticon = mistakeStreakEmoticons[mistakeStreak - 1] ?? "🙃"
    }

    if (revealNos.length) {
        emoticon =  "😲"
    }

    if (revealNos.length && incorrectStreak) {
        emoticon = "😳"
    }

    if (isSpellingOver && revealNos.length && !showAns) {
        emoticon = "😔"
    }

    if (isPerfectSpelling) {
        emoticon = "🥳"
    }

    if (isSpellingOverAndExtraKey) {
        emoticon = "🤡"
    }

    if (isDisasterSpelling) {
        emoticon = "😭"
    }

    if (mistakeStreak === 15) {
        emoticon = "👽" // Ayy LMAO
    }

    useEffect(() => {
        setEmo("😝")
        const timer0 = setTimeout(() => {
            setEmo(emoticon)
          }, 500)
        return () => clearTimeout(timer0) 
    }, [clickToggle])

    useEffect(() => {
        setEmo(emoticon)
    }, [emoticon])
    
    useEffect(() => {

        //setEmo(emoticon)
        
        if (!mistakeTrail.length && !correctMap?.length || isSpellingOver || isSpellingOverAndExtraKey) {
            return
        }

        const timer2 = setTimeout(() => {
            setEmo("🥱")
          }, sleepTime);
        const timer3 = setTimeout(() => {
            setEmo("😴")
          }, sleepTime + 500);
        return () => {
            clearTimeout(timer2) 
            clearTimeout(timer3)
        }

    }, [mistakeTrail, 
        revealNos, 
        inputKeys, 
        showAns, 
        isSpellingOver, 
        isSpellingOverAndExtraKey, clickToggle])


    return (
        <div className="buddy-container">
            <div className="buddy-emotion"  >
                <span className='emoji' onClick={() => {
                    setClickToggle(bool => !bool)
                    if (emo === "😝") {
                        lastTouchedEl.current = "emoji"
                        playTest()
                        resetState()
                    }
                    }
                }>
                    {emo}
                </span> 
                <div className='buddy-message'> </div>  
            </div>
        </div>
    )
}
