import React from 'react'
import { SpelledKey } from './types'

type SpellerProps = {
    spelledKeys: SpelledKey[]
}

export default function Speller({spelledKeys}: SpellerProps) {
    return (
        <div>
            {spelledKeys.map((sKey, i) => {
                const chColor = sKey.inputKey === sKey.correctKey ? "blue" : "red" ;
                return <span key={i} style={{color: chColor}} >{ sKey.correctKey }</span>
            } )}
        </div>
    )
}
