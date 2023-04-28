import React, { useRef, useState } from 'react'
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
    const isExtraKey = spelledKeys.length > textToType?.length 
    const charColors = correctMap.map(isCorrect => isCorrect ? "blue" : "red" )
    const isOnlyTones = !isNaN(parseInt(textToType))

    const showSpace = !spelledKeys.length && !showAns && !isReveal && !isOnlyTones // review this for learning

    const revealedTextArr = textToType.split('').slice(spelledKeys.length, textToType.length)
    const cursorBackgroundColor = (isWarning || isReveal && !showAns) ? "#ffe9e9" : "#eae9ff" // red : blue aliceblue

    // const hiddenEl = useRef<HTMLDivElement>(null)
    // const [isMouseDown, setIsMouseDown] = useState(false)

    // function unhidef() {
        
    // }

    return (
        <div className={`speller ${isFlip ? "#back" : ""}`}>
                
                {(!isFinish && isOnlyTones) && <span>{ pinyinRoman.replace(/v/g, 'ü') }</span> }

            <div className='spelled-key-container' style={{display:"inline"}} >  
                {spelledKeys.map((sKey, i) => {
                    return (
                        <span className='speller-spelling' style={{color: charColors[i]}} title={sKey.inputKey} key={hanziKey+"-s-"+i}>
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

                {isExtraKey && 
                    <span className='speller-spelling extra-key' style={{color: charColors[charColors.length-1]}}>
                        {"*"}
                    </span> }
            </div>

            {(showAns || isReveal) && 
                <div className={`reveal-text ${active ? "active" : ""}`} >
                    {revealedTextArr.map((char, i) => 
                        <span 
                            key={"rt-"+i} 
                            style={{
                                borderRadius: "4px",
                                backgroundColor: (i===0 && active )? cursorBackgroundColor : "", 
                                color: (i===0 && active )? "gray" : "" }}
                        >
                            {char}
                        </span>)}
                </div> }


            {showSpace && <div className="temporal-space reveal-text">??</div>}
           
        </div>
    )
}
