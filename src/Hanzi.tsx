import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Speller from './Speller'

type HanziProps = {
    hanziPinyinChar: HanziPinyin
    spelledKeys: SpelledKey[]
    traditional: boolean
    active: boolean
    mode: string
}

export default function Hanzi({hanziPinyinChar, spelledKeys, traditional, active, mode}: HanziProps) {
    const character = hanziPinyinChar.hanzi_SimpTrad[traditional ? 1 : 0]
    return (
        <div>
            <div>
                {character}
            </div>
            <Speller spelledKeys={spelledKeys} />
        </div>
    )
}
