import React from 'react'
import { SpelledKey } from './types'

type ExactInputProps = {
    hanziKey?: string
    spelledKeys: SpelledKey[]
}

export default function ExactInput({hanziKey, spelledKeys}: ExactInputProps) {
    return (
        <div className='exact-input'>
            {spelledKeys.map((sk, i) => 
                <span key={hanziKey+"-exin-"+i}>
                    {sk.inputKey}
                </span> 
            )}
        </div>
    )
}
