import React, { useEffect, useState } from 'react'
import { SpelledKey } from './types'
import { countConsecutiveLastTrueValues } from './util'

type BuddyProps = {
    mistakeTrail: string[]
    revealNos: number[]
    inputKeys: SpelledKey[]
    showAns: boolean
    isSpellingOver: boolean
    isSpellingOverAndExtraKey: boolean
}

export default function Buddy({
    mistakeTrail, 
    revealNos, 
    inputKeys, 
    showAns, 
    isSpellingOver, 
    isSpellingOverAndExtraKey}: BuddyProps) {

    let emoticon = (showAns && !inputKeys.length) ? "🧐" : "🙂" // default
    const mistakeStreakEmoticons = ["😐", "🙁", "😥", "😰", "😨"]
    const correctStreakEmoticons = ["😀", "😆"]
    const correctMap = inputKeys.map(k => k?.inputKey === k?.correctKey)
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

    if (isPerfectSpelling) {
        emoticon = "🥳"
    }

    if (isSpellingOverAndExtraKey) {
        emoticon = "🤡"
    }

    if (revealNos.length) {
        emoticon = !(incorrectStreak > 1) ? "😲" : "😳"
    }

    if (isDisasterSpelling) {
        emoticon = "😭"
    }

    if (mistakeStreak === 42) {
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
        
        if (!mistakeTrail.length && !inputKeys.length || isSpellingOver || isSpellingOverAndExtraKey) {
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
                <span className='emoji' onClick={() => setClickToggle(bool => !bool)}>{emo}</span> 
                <div className='buddy-message'>Click to activate!</div>  
            </div>
        </div>
    )
}
