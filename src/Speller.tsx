import React from 'react'
import { SpelledKey } from './types'

type SpellerProps = {
    hanziKey?: string
    spelledKeys: SpelledKey[]
    textToType: string
    pinyinAcc: string
    pinyinRoman: string
    correctMap: boolean[]
    showAns: boolean
    isReveal: boolean
    isFlip: boolean
    active: boolean
    isWarning: boolean
}

export default function Speller({
    hanziKey="",
    spelledKeys, 
    textToType, 
    pinyinAcc, 
    pinyinRoman, 
    correctMap, 
    showAns,
    isReveal, 
    isFlip,
    active,
    isWarning }: SpellerProps) {
    
    const isFinish = spelledKeys.length >= textToType?.length 
    const charColors = correctMap.map(isCorrect => isCorrect ? "blue" : "red" )
    const isOnlyTones = !isNaN(parseInt(textToType))

    const showSpace = !spelledKeys.length && !showAns && !isReveal && !isOnlyTones // review this for learning

    const revealedTextArr = textToType.split('').slice(spelledKeys.length, textToType.length)
    const cursorBackgroundColor = (isWarning || isReveal && !showAns) ? "#ffe9e9" : "#eae9ff" // red : blue aliceblue

    return (
        <div className={`speller ${isFlip ? "#back" : ""}`}>

            {(!isFinish && isOnlyTones) && <span>{ pinyinRoman.replace(/v/g, 'ü') }</span> }
            
            {spelledKeys.map((sKey, i) => {
                return (
                    <span key={hanziKey+"-s-"+i} style={{color: charColors[i]}} className='speller-spelling' title={sKey.inputKey}>
                        <>
                            {isFinish // If sylable is done typing
                                ? (!isOnlyTones 
                                    ? pinyinAcc[i] 
                                    : pinyinAcc ) 
                                : sKey.correctKey}
                        </>
                        {!isNaN(parseInt(sKey.correctKey)) && !correctMap[i] && // Show last key (number) if wrong
                            <>{sKey.correctKey}</>}
                    </span>
                )
            })}

            {(showAns || isReveal) && 
                <span className={`reveal-text ${active ? "active" : ""}`} >
                    {revealedTextArr.map((char, i) => 
                        <span 
                            key={"rt-"+i} 
                            style={{backgroundColor: (i===0 && active )? cursorBackgroundColor : "", color: (i===0 && active )? "gray" : "" }}
                        >
                            {char}
                        </span>)}
                </span> }

            {showSpace && <div className="temporal-space reveal-text">??</div>}
           
        </div>
    )
}
