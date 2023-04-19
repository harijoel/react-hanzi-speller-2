import React from 'react'
import { SpelledKey } from './types'

type SpellerProps = {
    spelledKeys: SpelledKey[]
    textToType: string
    pinyinAcc: string
    pinyinRoman: string
    correctMap: boolean[]
    isReveal: boolean
    isFlip: boolean
    mode: string
}

export default function Speller({spelledKeys, textToType, pinyinAcc, pinyinRoman, correctMap, isReveal, isFlip, mode}: SpellerProps) {
    const isFinish = spelledKeys.length >= textToType.length // When spelledKeys === textoToType (because it already contains mode)
    //const charColors = spelledKeys.map((sKey, i) => sKey.inputKey === sKey.correctKey ? "blue" : "red" )
    const charColors = correctMap.map(isCorrect => isCorrect ? "blue" : "red" )
    const isThereNumber = mode === "withTones" || mode === "onlyTones"
    const isOnlyTones = mode === "onlyTones"


    return (
        <div className={`speller ${isFlip ? "#back" : ""}`}>
            

            {!isFinish && isOnlyTones && <span>{pinyinRoman}</span> }
            
            {spelledKeys.map((sKey, i) => {
                return (
                    <>
                        <span key={pinyinAcc+i} style={{color: charColors[i]}} >
                            {isFinish // If sylable is done typing
                                ? (!isOnlyTones ? pinyinAcc[i] : pinyinAcc )  // then show pinyinAcc, else toType
                                : sKey.correctKey}
                        </span>

                        {   // Show last key (number) if wrong && last key && isNumber
                            (i === textToType.length -1) && (charColors[i] === "red") && isThereNumber &&
                                <span key={pinyinAcc+"-last-"+i} style={{color: "red"}}>{sKey.correctKey}</span>
                        }
                    </>
                )
            })}
            {isReveal && <span style={{color: "GrayText"}}>{textToType.slice(spelledKeys.length, textToType.length)}</span> }
           
           {!spelledKeys.length && !isReveal && <div className="temporal-space">#</div>}

        </div>
    )
}
