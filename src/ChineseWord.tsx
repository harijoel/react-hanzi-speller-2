import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Hanzi from './Hanzi'
import { getDynamicIndex } from './util'

type ChineseWordProps = {
    translation?: string
    hanziPinyinArrayWord: HanziPinyin[]
    inputSylArray: SpelledKey[][]
    dynamicIndex: number
    traditional: boolean
    textToTypeSyl_Array?: string[]
    revealNos: number[]
    showAns: boolean
    hideChars: boolean
    mode: string
}

export default function ChineseWord({ 
    translation,
    hanziPinyinArrayWord, 
    inputSylArray, 
    dynamicIndex, 
    traditional, 
    textToTypeSyl_Array, 
    revealNos, 
    showAns,
    hideChars,
    mode }: ChineseWordProps) {


    return (
        <div className="chineseword">
            {hanziPinyinArrayWord.map((syl, i) => 
                <Hanzi 
                    key={"hanzi-"+syl+"-"+i}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={dynamicIndex === i}
                    isReveal={revealNos.includes(i) || showAns}
                    hideChars={hideChars}
                    mode={mode}
                />
                )
            }
        </div>
    )
}
