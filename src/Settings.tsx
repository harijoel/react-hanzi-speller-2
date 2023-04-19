import React, { ChangeEvent, SetStateAction, useEffect, useRef } from 'react'
import { HSKword, Setting, SpelledKey } from './types'

type SettingsProps = {
    setInputKeys: (value: SpelledKey[]) => void //React.Dispatch<React.SetStateAction<SpelledKey[]>>
    setHskWord: (value: HSKword) => void
    getRandomHSK: (value: void) => HSKword
    setRevealNos: (value: number[]) => void
    setMistakeTrail: (value: string[]) => void
    setSettings: (value: SetStateAction<Setting>) => void
    settings: Setting
}

export default function Settings({setInputKeys, setHskWord, getRandomHSK, setRevealNos, setMistakeTrail, setSettings, settings}: SettingsProps) {
    const modeEl = useRef<HTMLSelectElement>(null)
    const toleranceEl = useRef<HTMLInputElement>(null)
    const vocabEl = useRef<HTMLSelectElement>(null)

    function handleSubmit(e: MouseEvent) {
        e.preventDefault()
        console.log("$$$ prevented default $$$")
        setHskWord(getRandomHSK())
        setInputKeys([])
        setRevealNos([])
        setMistakeTrail([])
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            mistakeCountTolerance: parseInt(toleranceEl.current!.value)}})
    }

    function handleTradCheck(e: ChangeEvent<HTMLInputElement>) {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            traditional: e.target.checked }})
    }

    function handleShowAnsCheck(e: ChangeEvent<HTMLInputElement>) {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            showAns: e.target.checked }})
    }

    function handleModeSelect(e: ChangeEvent<HTMLSelectElement>) {
        setInputKeys([])
        setRevealNos([])
        setMistakeTrail([])
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            mode: e.target.value }})
    }

    function handleVocabSelect(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const hskLevel = e.target.value
        console.log(hskLevel)
    }


    return (
        <div className="settings" >
            <div className="form-group">
                <label htmlFor="trad">Traditional </label>
                <input id="trad" type="checkbox" checked={settings.traditional} onChange={handleTradCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="show-ans">Show answer </label>
                <input id="show-ans" type="checkbox" checked={settings.showAns} onChange={handleShowAnsCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="tol">Tolerance </label>
                <input id="tol" type="number" min={0} step={1} defaultValue={2} ref={toleranceEl} />
            </div>

            <div className="form-group">
                <label htmlFor="mode">Mode: </label>
                <select name="mode" id="mode" onChange={handleModeSelect} >
                    <option value="noTones">No tones</option>
                    <option value="withTones">With tones</option>
                    <option value="onlyTones">Only tones</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="vocab">HSK Vocabulary: </label>
                <select name="vocab" id="vocab" onChange={handleVocabSelect} >
                    <option value="1">HSK-1</option>
                    <option value="2">HSK-2</option>
                    <option value="3">HSK-3</option>
                    <option value="4">HSK-4</option>
                    <option value="5">HSK-5</option>
                    <option value="6">HSK-6</option>
                </select>
            </div>

            <div className="form-group">
                <span  className="btn" onClick={(e: any) => handleSubmit(e)}>New word</span>
            </div>
            
        </div>
    )
}
