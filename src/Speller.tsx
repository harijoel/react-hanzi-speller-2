import React from 'react'
import { SpelledKey } from './types'

type SpellerProps = {
    spelledKeys: SpelledKey[]
    textToType: string
    pinyinAcc: string
    pinyinRoman: string
    correctMap: boolean[]
    showAns: boolean
    isReveal: boolean
    isFlip: boolean
}

export default function Speller({
    spelledKeys, 
    textToType, 
    pinyinAcc, 
    pinyinRoman, 
    correctMap, 
    showAns,
    isReveal, 
    isFlip}: SpellerProps) {

    const isFinish = spelledKeys.length >= textToType?.length 
    const charColors = correctMap.map(isCorrect => isCorrect ? "blue" : "red" )
    const isOnlyTones = !isNaN(parseInt(textToType))

    const showSpace = !spelledKeys.length && !showAns && !isReveal && !isOnlyTones // review this for learning

    return (
        <div className={`speller ${isFlip ? "#back" : ""}`}>

            {(!isFinish && isOnlyTones) && <span>{pinyinRoman.replace(/v/g, 'ü')}</span> }
            
            {spelledKeys.map((sKey, i) => {
                return (
                    <>
                        <span key={pinyinAcc+i} style={{color: charColors[i]}} >
                            {isFinish // If sylable is done typing
                                ? (!isOnlyTones ? pinyinAcc[i] : pinyinAcc )  // then show pinyinAcc, else toType
                                : sKey.correctKey}
                        </span>

                        {   // Show last key (number) if wrong && last key && isNumber
                            !isNaN(parseInt(sKey.correctKey)) && !correctMap[i] &&
                                <span key={pinyinAcc+"-last-"+i} style={{color: "red"}}>{sKey.correctKey}</span>
                        }
                    </>
                )
            })}
            {(showAns || isReveal) && <span className="reveal-text">
                {textToType.slice(spelledKeys.length, textToType.length)}
            </span>}

            {showSpace && <div className="temporal-space reveal-text">??</div>}
           
        </div>
    )
}
