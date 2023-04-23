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
    setRevealNos: React.Dispatch<React.SetStateAction<number[]>>
    revealNos: number[]
    mistakeTrail: string[]
    showAns: boolean
    hideChars: boolean
    animations: boolean
}

export default function ChineseWord({ 
    translation,
    hanziPinyinArrayWord, 
    inputSylArray, 
    dynamicIndex, 
    traditional, 
    textToTypeSyl_Array, 
    setRevealNos,
    revealNos, 
    mistakeTrail,
    showAns,
    hideChars,
    animations}: ChineseWordProps) {


    return (
        <div className="chineseword">
            {hanziPinyinArrayWord.map((syl, i) => {
                const hanziKey = "hz-"+i
                return(
                <Hanzi 
                    key={hanziKey}
                    hanziKey={hanziKey}
                    hanziPinyinChar={syl}
                    spelledKeys={inputSylArray[i]}
                    traditional={traditional}
                    active={dynamicIndex === i}
                    mistakeTrail={mistakeTrail}
                    showAns={showAns}
                    isReveal={revealNos.includes(i)}
                    hideChars={hideChars}
                    animations={animations}
                />)}
                )
            }
        </div>
    )
}
