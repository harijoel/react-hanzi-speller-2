import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'

type HanziProps = {
    hanziKey?: string
    hanziPinyinChar: HanziPinyin
    spelledKeys?: SpelledKey[]
    traditional: boolean
    active: boolean
    mistakeTrail: string[]
    showAns: boolean
    isReveal: boolean
    hideChars: boolean
    animations: boolean
}

export default function Hanzi({
    hanziKey,
    hanziPinyinChar, 
    spelledKeys=[], 
    traditional, 
    active, 
    mistakeTrail,
    showAns,
    isReveal, 
    hideChars, 
    animations}: HanziProps) {

    const character = hanziPinyinChar.hanzi_SimpTrad[traditional ? 1 : 0]
    const pinyinRoman = hanziPinyinChar.pinyinNo
    const textToType = hanziPinyinChar.textToType_Syl
    
    const correctMap = spelledKeys.map((sKey, i) => sKey.inputKey === sKey.correctKey)
    const isAnyMistakes = correctMap.some(correct => !correct)

    const isFinish = spelledKeys.length >= textToType?.length
    const isCharVisible = isFinish || !hideChars || isReveal
    const animationClass = animations && !isCharVisible ? "flip" : ""

    const isWarning = mistakeTrail?.length && active
    const borderColor = isWarning ? "red" : "blue"
    
    return (
        <div className="hanzi-speller-container">
            <div className={"hanzi " + animationClass} style={{borderColor: active ? borderColor : ""}}>
                
                <div style={{
                        color: isAnyMistakes ? "red" : (isFinish ? "black" : "rgb(90, 90, 90)"), 
                        visibility: isCharVisible? "visible" : "hidden"}} 
                     className={"character"} 
                >
                    {character}
                </div>
            </div>
            <Speller    hanziKey={hanziKey} 
                        spelledKeys={spelledKeys} 
                        textToType={textToType} 
                        pinyinAcc={hanziPinyinChar.pinyinAcc} 
                        pinyinRoman={pinyinRoman}
                        correctMap={correctMap}
                        showAns={showAns}
                        isReveal={isReveal}
                        isFlip={!isCharVisible}
            />
        </div>
        
    )
}
