import React, { useRef } from 'react'
import { useClickHoldState } from './customHooks'

type TranslationProps = {
    translationData: string
}

export default function Translation({translationData}: TranslationProps) {
    const translations = translationData.split("; ")

    return (
        <div className='translation'>
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
