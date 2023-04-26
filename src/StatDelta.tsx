import React from 'react'

type StatDeltaProps = {
    statDelta: number
    invert?: boolean
}

export default function StatDelta({statDelta, invert=false}: StatDeltaProps) {
    const noSignStrNum = Math.abs(statDelta).toFixed(1)
    const isPositive = statDelta >= 0
    const isAproxZero = noSignStrNum === "0.0"
    const colorCondition = invert ? !isPositive : isPositive
    const sign = isAproxZero 
                    ? "~" 
                    : isPositive 
                        ? "+" 
                        : "-"
    return (
        <span style={{color: colorCondition ? "green" : "red"}}>
            {sign}{noSignStrNum}
        </span>
    )
}
