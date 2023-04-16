import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'

type HanziProps = {
    hanziPinyinChar: HanziPinyin
    spelledKeys?: SpelledKey[]
    traditional: boolean
    active: boolean
    isReveal: boolean
    mode: string
}

// const defaultSK: SpelledKey[] = 

export default function Hanzi({hanziPinyinChar, spelledKeys=[], traditional, active=false, isReveal, mode}: HanziProps) {

    const character = hanziPinyinChar.hanzi_SimpTrad[traditional ? 1 : 0]
    const textToType = hanziPinyinChar.textToType_Syl
    const correctMap = spelledKeys.map((sKey, i) => sKey.inputKey === sKey.correctKey)
    const isThereAnyMistake= correctMap.some(correct => !correct)
    const pinyinRoman = hanziPinyinChar.pinyinNo

    return (
        <div>
            <div>{active ? "A" : "o" }</div>
            <div style={{color: isThereAnyMistake ? "red" : "black"}}>
                {character}
            </div>
            <Speller spelledKeys={spelledKeys} 
                     textToType={textToType} 
                     pinyinAcc={hanziPinyinChar.pinyinAcc} 
                     pinyinRoman={pinyinRoman}
                     correctMap={correctMap}
                     isReveal={isReveal}
                     mode={mode} 
            />
        </div>
    )
}
