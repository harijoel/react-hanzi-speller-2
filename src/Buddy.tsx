import React from 'react'
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
    let lastInput = inputKeys[(inputKeys?.length-1)]
    const mistakeStreakEmoticons = ["😐", "🙁", "😥", "😰", "😨"]
    const correctStreakEmoticons = ["😀", "😆"]
    const correctMap = inputKeys.map(k => k?.inputKey === k?.correctKey)
    const correctStreak = countConsecutiveLastTrueValues(correctMap)
    const incorrectStreak = countConsecutiveLastTrueValues(correctMap.map(c => !c))
    const mistakeStreak = mistakeTrail.length
    const isPerfectSpelling = isSpellingOver && !correctMap.includes(false)
    const isDisasterSpelling = isSpellingOver && !correctMap.includes(true)
    
    if (correctStreak) {
        emoticon = correctStreakEmoticons[correctStreak - 1] ?? "😎"
    }

    if (mistakeStreak) {
        emoticon = mistakeStreakEmoticons[mistakeStreak - 1] ?? "🙃"
    }

    if (mistakeStreak === 42) {
        emoticon = "👽" // Ayy LMAO
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

    return (
        <div className="buddy-container">
            <div className="buddy-emotion"  >
                <span className='emoji' onClick={() => console.log("BUDDY WAS CLICKED")}>{emoticon}</span> 
                <div className='buddy-message'>Click to activate!</div>  
            </div>
            {/* <div>{correctMap.map(c => c ? "o" : "x")}</div> */}
        </div>
    )
}
