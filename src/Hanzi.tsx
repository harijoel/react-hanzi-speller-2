import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'

type HanziProps = {
    hanziPinyinChar: HanziPinyin
    spelledKeys?: SpelledKey[]
    traditional: boolean
    active: boolean
    mode: string
}

// const defaultSK: SpelledKey[] = 

export default function Hanzi({hanziPinyinChar, spelledKeys=[], traditional, active=false, mode}: HanziProps) {
    const character = hanziPinyinChar.hanzi_SimpTrad[traditional ? 1 : 0]
    return (
        <div>
            <div>{active ? "A" : "o" }</div>
            <div>
                {character}
            </div>
            <Speller spelledKeys={spelledKeys} />
        </div>
    )
}
