import React from 'react'
import { HanziPinyin, SpelledKey } from './types'
import Hanzi from './Hanzi'

type ChineseWordProps = {
    hanziPinyinArrayWord: HanziPinyin[]
    inputKeys: SpelledKey[]
    traditional: boolean
    mode: string
}

export default function ChineseWord({hanziPinyinArrayWord, inputKeys, traditional, mode}: ChineseWordProps) {
    //Sylibalize input
    const sylNo = hanziPinyinArrayWord.length
    const textToTypeArr = hanziPinyinArrayWord.map(syl => syl.textToType_Syl)
    let index_start = 0
    // const inputKeys_input = inputKeys.map(spell => spell.inputKey)
    let inputSylArray: any = [] // try Define as array of array of strings
    for (let index = 0; index < sylNo; index++) {
        let sylSlice = inputKeys.slice(
                index_start,
                index_start + textToTypeArr[index].length
        )
        if (!sylSlice.length) { break; }
        inputSylArray = [...inputSylArray, sylSlice] // Result: array of arrays
        index_start = index_start + textToTypeArr[index].length
    }

    return (
        <div>
            {hanziPinyinArrayWord.map((syl, i) => 
                <Hanzi 
                    key={i}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={false}
                    mode={mode}
                />
                )
            }
        </div>
    )
}
