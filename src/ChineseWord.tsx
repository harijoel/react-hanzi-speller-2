import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Hanzi from './Hanzi'
import { getDynamicIndex } from './util'

type ChineseWordProps = {
    hanziPinyinArrayWord: HanziPinyin[]
    inputSylArray: []
    traditional: boolean
    textToTypeSyl_Array: string[]
    mode: string
}

export default function ChineseWord({hanziPinyinArrayWord, inputSylArray, traditional, textToTypeSyl_Array, mode}: ChineseWordProps) {
    
    let activeCardIndex = inputSylArray.length - 1
    // const isCurrentSylComplete = inputSylArray.slice(-1).length === hanziPinyinArrayWord[activeCardIndex].textToType_Syl.length
    // if (isCurrentSylComplete) {
    //     console.log("current syl is complete &&&&&&")
    // } 

    const dynamicIndex = getDynamicIndex(inputSylArray, textToTypeSyl_Array)

    return (
        <div>
            {hanziPinyinArrayWord.map((syl, i) => 
                <Hanzi 
                    key={i}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={dynamicIndex === i}
                    mode={mode}
                />
                )
            }
        </div>
    )
}
