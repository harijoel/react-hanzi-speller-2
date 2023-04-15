import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Hanzi from './Hanzi'
import { getDynamicIndex } from './util'

type ChineseWordProps = {
    hanziPinyinArrayWord: HanziPinyin[]
    inputSylArray: []
    traditional: boolean
    textToTypeSyl_Array: string[]
    revealNos: number[]
    mode: string
}

export default function ChineseWord({ 
    hanziPinyinArrayWord, 
    inputSylArray, 
    traditional, 
    textToTypeSyl_Array, 
    revealNos, 
    mode }: ChineseWordProps) {

    const dynamicIndex = getDynamicIndex(inputSylArray, textToTypeSyl_Array)

    return (
        <div>
            {hanziPinyinArrayWord.map((syl, i) => 
                <Hanzi 
                    key={"hanzi-"+i}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={dynamicIndex === i}
                    isReveal={revealNos.includes(i)}
                    mode={mode}
                />
                )
            }
        </div>
    )
}
