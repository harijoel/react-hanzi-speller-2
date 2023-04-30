import React, { useRef, useState } from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'
import ExactInput from './ExactInput'
import { useClickHoldState } from './customHooks'

type HanziProps = {
    hanziKey: string
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
    
    const correctMap = spelledKeys.map((sKey, i) => sKey.inputKey[0] === sKey.correctKey)
    const isAnyMistakes = correctMap.some(correct => !correct)

    const isFinish = spelledKeys.length >= textToType?.length
    const isCharVisible = isFinish || !hideChars || isReveal
    const animationClass = (animations && !isCharVisible) ? "flipped" : ""

    const isWarning = !!mistakeTrail?.length && active
    const borderColor = isWarning ? "red" : "blue"

    const hanziCharEl = useRef<HTMLDivElement>(null)
    const [isCharClickHold] = useClickHoldState(hanziCharEl)
    const isExactInputDisplayed = isCharClickHold
    
    return (
        <div className="hanzi-speller-container" style={{justifyContent: "center"}} ref={hanziCharEl}>
            <div className={"hanzi " + animationClass} style={{borderColor: active ? borderColor : ""}}>
                
                <div style={{
                        color: isAnyMistakes ? "red" : (isFinish ? "black" : "rgb(90, 90, 90)"), 
                        visibility: isCharVisible? "visible" : "hidden"}} 
                     className={"character"} 
                     id={hanziKey}
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
                        active={active}
                        isWarning={isWarning}
            />
            {isExactInputDisplayed && <ExactInput hanziKey={hanziKey} spelledKeys={spelledKeys} mistakeTrail={mistakeTrail} /> }
        </div>
        
    )
}
