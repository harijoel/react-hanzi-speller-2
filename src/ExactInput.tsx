import React from 'react'
import { SpelledKey } from './types'
import { fillMatrix, transposeArray } from './util'

type ExactInputProps = {
    hanziKey?: string
    spelledKeys: SpelledKey[]
    mistakeTrail: string[]
}

// const arrayOfArrays = spelledKeys.map(sk => sk.inputKey) 

export default function ExactInput({hanziKey, spelledKeys, mistakeTrail}: ExactInputProps) {
    const maxInputNoDisplay = 4
    const arrayOfArrays = spelledKeys.map(sk => { 
        const lastInput = sk.inputKey[sk.inputKey.length - 1]
        const sizedInputKeys = sk.inputKey.length > maxInputNoDisplay 
                                    ? [...sk.inputKey.slice(0, maxInputNoDisplay), "⋮", lastInput] 
                                    : sk.inputKey
        return sizedInputKeys
    })
    const inputMatrix = fillMatrix(arrayOfArrays)
    const transposedInputMatrix = transposeArray(inputMatrix)

    return (
        <div className='exact-input'>
            <table>
                <tbody>
                    {transposedInputMatrix.map((row, i) => 
                        <tr>{row.map((col, j) => 
                            <td style={{
                                color: transposedInputMatrix[i][j] == spelledKeys[j].correctKey ? "blue" : "gray"}}>
                                    {col}
                            </td> )}
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    )
}
