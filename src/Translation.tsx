import React from 'react'

type TranslationProps = {
    translationData: string
}

export default function Translation({translationData}: TranslationProps) {
    const translations = translationData.split("; ")
    return (
        <div className='translation'>
            <ul className="translation-list">
            {translations.map(tran => 
                <li className='translation-item'>
                    {tran.replace(/^\w/, c => c.toUpperCase())}
                </li>
            )}
            </ul>
        </div>
        
    )
}
