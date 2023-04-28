import React, { useRef } from 'react'
import { useClickHoldState } from './customHooks'

type TranslationProps = {
    translationData: string
}

export default function Translation({translationData}: TranslationProps) {
    const translations = translationData.split("; ")
    const testEl = useRef<HTMLDivElement>(null)
    const [isMouseInTest] = useClickHoldState(testEl)

    return (
        <div className='translation'>
            <div ref={testEl}>TESTING</div>
            {isMouseInTest && <h1>is IN</h1>}
            <ul className="translation-list">
            {translations.map((tran, i) => 
                <li key={i+"-"+tran} className='translation-item'>
                    {tran.replace(/^\w/, c => c.toUpperCase())}
                </li>
            )}
            </ul>
        </div>
        
    )
}
