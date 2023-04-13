import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Hanzi from './Hanzi'

type ChineseWordProps = {
    hanziPinyinArrayWord: HanziPinyin[]
    inputSylArray: []
    traditional: boolean
    mode: string
}

export default function ChineseWord({hanziPinyinArrayWord, inputSylArray, traditional, mode}: ChineseWordProps) {
    
    let activeCardIndex = inputSylArray.length - 1

    return (
        <div>
            {hanziPinyinArrayWord.map((syl, i) => 
                <Hanzi 
                    key={i}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={activeCardIndex === i}
                    mode={mode}
                />
                )
            }
        </div>
    )
}
