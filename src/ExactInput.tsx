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
    let maxInputNoDisplay = 6
    const arrayOfArrays = spelledKeys.map(sk => { 
        const lastInput = sk.inputKey[sk.inputKey.length - 1]
        const oneBefLast = sk.inputKey[sk.inputKey.length - 2]
        const isInputOversized = sk.inputKey.length > maxInputNoDisplay
        // if (oneBefLast === "-" && isInputOversized) {
        //     maxInputNoDisplay = maxInputNoDisplay - 1
        // }
        // let inputTail = oneBefLast === "-" ? [oneBefLast, lastInput] : [lastInput]
        // inputTail = isInputOversized ? ["⋮", ...inputTail] : inputTail
        const inputTail = !isInputOversized 
                            ? [] 
                            : oneBefLast === "-" 
                                ? ["⋮", oneBefLast, lastInput] 
                                : ["⋮", lastInput]
        const sizedInputKeys = [...sk.inputKey.slice(0, maxInputNoDisplay - inputTail.length), ...inputTail] 
        return sizedInputKeys
    })
    const inputMatrix = fillMatrix(arrayOfArrays)
    const transposedInputMatrix = transposeArray(inputMatrix)

    if (!spelledKeys.length) {
        return (
            <div className='exact-input'>
                ...
            </div>
        )
    }

    return (
        <div className='exact-input'>
            <table>
                <tbody>
                    {transposedInputMatrix.map((row, i) => 
                        <tr key={`${hanziKey}-eitr-${i}`} >{row.map((col, j) => 
                            <td key={`${hanziKey}-eitd-${i}-${j}`} style={{
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
