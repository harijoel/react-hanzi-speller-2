import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'

type HanziProps = {
    hanziPinyinChar: HanziPinyin
    spelledKeys?: SpelledKey[]
    traditional: boolean
    active: boolean
    isReveal: boolean
    hideChars: boolean
    mode: string
}

export default function Hanzi({
    hanziPinyinChar, spelledKeys=[], 
    traditional, active=false, 
    isReveal, hideChars, 
    mode}: HanziProps) {

    const character = hanziPinyinChar.hanzi_SimpTrad[traditional ? 1 : 0]
    const textToType = hanziPinyinChar.textToType_Syl //|| "Error"
    const correctMap = spelledKeys.map((sKey, i) => sKey.inputKey === sKey.correctKey)
    const isThereAnyMistake= correctMap.some(correct => !correct)
    const pinyinRoman = hanziPinyinChar.pinyinNo

    const isFinish = spelledKeys.length >= textToType.length
    const isVisible = isFinish || !hideChars || isReveal // isReveal added recently
    //style={{visibility: isVisible? "visible" : "hidden"}}
    return (
        <div>
            <div className={`hanzi ${!isVisible ? "flip" : ""}`} >
                <div>{active ? "(*)" : "( )" }</div>
                <div style={{
                        color: isThereAnyMistake ? "red" : "black", 
                        visibility: isVisible? "visible" : "hidden"}} 
                     className={"character"} 
                >
                    {character}
                </div>
                <div className='speller temporal-space'>#</div>
            </div>
            <Speller spelledKeys={spelledKeys} 
                        textToType={textToType} 
                        pinyinAcc={hanziPinyinChar.pinyinAcc} 
                        pinyinRoman={pinyinRoman}
                        correctMap={correctMap}
                        isReveal={isReveal}
                        isFlip={!isVisible}
                        mode={mode} 
            />
        </div>
        
    )
}
