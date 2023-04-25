import React from 'react'

type StatDeltaProps = {
    statDelta: number
}

export default function StatDelta({statDelta}: StatDeltaProps) {
    const isPositive = statDelta >= 0
    return (
        <span style={{color: isPositive? "green" : "red"}}>
            {isPositive && <>+</>}{statDelta.toFixed(1)}
        </span>
    )
}
