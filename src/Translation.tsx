import React from 'react'

type TranslationProps = {
    translationData: string
}

export default function Translation({translationData}: TranslationProps) {
    const translations = translationData.split("; ")
    return (
        <div className="translation-container">{translations.map(tran => <div className='translation'>{tran}</div>)}</div>
    )
}
