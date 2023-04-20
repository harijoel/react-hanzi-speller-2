import React, { ChangeEvent, SetStateAction, useEffect, useRef } from 'react'
import { HSKword, Setting, SpelledKey } from './types'

const mitakeToleranceNos = [0, 1, 2, 3]
const modes = ["noTones", "withTones", "onlyTones"]
const hskLevels = [1, 2, 3, 4, 5, 6]

type SettingsProps = {
    setInputKeys: (value: SpelledKey[]) => void //React.Dispatch<React.SetStateAction<SpelledKey[]>>
    setHskWord: (value: HSKword) => void
    getRandomHSK: (value: void) => HSKword
    setRevealNos: (value: number[]) => void
    setMistakeTrail: (value: string[]) => void
    setSettings: (value: SetStateAction<Setting>) => void
    settings: Setting
}

export default function Settings({
    setInputKeys, 
    setHskWord, 
    getRandomHSK, 
    setRevealNos, 
    setMistakeTrail, 
    setSettings, 
    settings}: SettingsProps) {

    //const modeEl = useRef<HTMLSelectElement>(null)
    const toleranceEl = useRef<HTMLSelectElement>(null)
    //const vocabEl = useRef<HTMLSelectElement>(null)

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
    // Hide-check dependent
    function handleHideCheck(e: ChangeEvent<HTMLInputElement>) {
        setSettings((oldSettings: Setting) => { 
            const isHideCharsChecked = e.target.checked
            if (isHideCharsChecked) {
                return {
                    ...oldSettings,
                    hideChars: isHideCharsChecked,
                    showEnglish: true}
            } 
            return {
                ...oldSettings,
                    hideChars: isHideCharsChecked,
                    animations: false
            }
            
            })
    }

    function handleShowEnglishCheck(e: ChangeEvent<HTMLInputElement>) {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            showEnglish: e.target.checked }})
    }

    function handleAnimationsCheck(e: ChangeEvent<HTMLInputElement>) {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            animations: e.target.checked }})
    }

    // End hide-check dependent
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
                <input id="trad" type="checkbox" 
                    checked={settings.traditional} 
                    onChange={handleTradCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="show-ans">Show answer </label>
                <input id="show-ans" type="checkbox" 
                    checked={settings.showAns} 
                    onChange={handleShowAnsCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="tol">Tolerance </label>
                <select name="tol" id="tol" ref={toleranceEl} >
                    {mitakeToleranceNos.map(num => 
                        <option value={num} selected={settings.mistakeCountTolerance===num}>
                            {num}
                        </option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="hide">Hide Characters </label>
                <input id="hide" type="checkbox" 
                    checked={settings.hideChars} 
                    onChange={handleHideCheck}/>
            </div>

            <div className="form-group">
                <label htmlFor="english">Show English translation </label>
                <input id="english" type="checkbox" 
                    checked={settings.showEnglish} 
                    disabled={settings.hideChars} 
                    onChange={handleShowEnglishCheck}/>
            </div>

            <div className="form-group">
                <label htmlFor="hide">Flip animaton </label>
                <input id="hide" type="checkbox" 
                    checked={settings.animations} 
                    disabled={!settings.hideChars} 
                    onChange={handleAnimationsCheck}/>
            </div>

            <div className="form-group">
                <label htmlFor="mode">Mode: </label>
                <select name="mode" id="mode" 
                    onChange={handleModeSelect} >
                        {modes.map(modeName => <option value={modeName}>{modeName}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="vocab">HSK Vocabulary: </label>
                <select name="vocab" id="vocab" onChange={handleVocabSelect} >
                    {hskLevels.map(level => <option value={level}>HSK-{level}</option>)}
                </select>
            </div>

            <div className="form-group">
                <span  className="btn" onClick={(e: any) => handleSubmit(e)}>New word</span>
            </div>
            
        </div>
    )
}
