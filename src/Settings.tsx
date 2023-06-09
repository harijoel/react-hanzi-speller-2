import React, { ChangeEvent, SetStateAction, useEffect, useRef } from 'react'
import { HSKword, HskLevel, Setting, SpelledKey, TouchedEl } from './types'

const mitakeToleranceNos = [0, 1, 2, 3]
const modes = ["noTones", "withTones", "onlyTones"]
const hskLevels = [1, 2, 3, 4, 5, 6]

type SettingsProps = {
    resetState: (newWord: boolean) => void
    setSettings: (value: SetStateAction<Setting>) => void
    settings: Setting
    lastTouchedEl: React.MutableRefObject<TouchedEl>
}

export default function Settings({
    resetState, 
    setSettings, 
    settings,
    lastTouchedEl}: SettingsProps) {

    const hskLevelEl = useRef<HTMLSelectElement>(null)

    function handleNewWord(e: MouseEvent) {
        e.preventDefault()
        console.log("$$$ prevented default $$$")
        lastTouchedEl.current = "new-word-btn"
        resetState(true)
    }
    
    function handleHideCheck(e: ChangeEvent<HTMLInputElement>) {
        const isHideCharsChecked = e.target.checked
        setSettings((oldSettings: Setting) => { 
            return {...oldSettings, 
                showEnglish: isHideCharsChecked || oldSettings.showEnglish, 
                hideChars: isHideCharsChecked, 
                animations: isHideCharsChecked}
            })
    }

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        const property = e.target.name
        setSettings((oldSettings: Setting) => { 
            oldSettings[property] = e.target.checked
            return {...oldSettings}})
    }

    function handleModeSelect(e: ChangeEvent<HTMLSelectElement>) {
        resetState(false)
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            mode: e.target.value }})
    }

    function handleToleranceSelect(e: ChangeEvent<HTMLSelectElement>) {
        resetState(false)
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            mistakeCountTolerance: parseInt(e.target.value) }})
    }

    function handleVocabSelect(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const hskLevelNo = e.target.value
        setSettings((oldSettings: Setting) => { 
            const hskLevel = `hsk${hskLevelNo}`
            return {
            ...oldSettings,
            hskLevel: hskLevel
        }})
        
        console.log("HSK was changed to ", hskLevelNo)
    }

    useEffect(() => {
        resetState(true)
    }, [settings.hskLevel])

    return (
        <div className="settings" onClick={() => console.log("SETTINGS WAS CLICKED")}>
            <div className="form-group">
                <label htmlFor="show-ans">Show answer </label>
                <input id="show-ans" type="checkbox" name="showAns" 
                    checked={settings.showAns} 
                    onChange={handleCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="trad">Traditional </label>
                <input id="trad" type="checkbox" name="traditional"
                    checked={settings.traditional} 
                    onChange={handleCheck} />
            </div>

            <div className="form-group">
                <label htmlFor="tol">Tolerance </label>
                <select name="tol" id="tol" defaultValue={settings.mistakeCountTolerance} onChange={handleToleranceSelect}>
                    {mitakeToleranceNos.map(num => 
                        <option key={"tol-"+num} value={num}>
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
                <label htmlFor="flip">Flip animaton </label>
                <input id="flip" type="checkbox" name="animations"
                    checked={settings.animations} 
                    disabled={!settings.hideChars} 
                    onChange={handleCheck}/>
            </div>

            <div className="form-group">
                <label htmlFor="english">Show English translation </label>
                <input id="english" type="checkbox" name="showEnglish"
                    checked={settings.showEnglish} 
                    disabled={settings.hideChars} 
                    onChange={handleCheck}/>
            </div>

            <div className="form-group">
                <label htmlFor="mode">Mode: </label>
                <select name="mode" id="mode" 
                    defaultValue={settings.mode}
                    onChange={handleModeSelect} >
                        {modes.map(modeName => <option key={modeName} value={modeName}>{modeName}</option>)}
                </select>
            </div>

            <div className="form-group form-group-vocab">
                <label htmlFor="vocab">HSK Level: </label>
                <select name="vocab" id="vocab" 
                    defaultValue={settings.hskLevel[settings.hskLevel.length-1]} 
                    onChange={handleVocabSelect}>
                        {hskLevels.map(level => <option key={"hsk-"+level} value={level}>HSK-{level}</option>)}
                </select>
            </div>

            <div className="form-group">
                <span  className="btn" onClick={(e: any) => handleNewWord(e)}>New word</span>
            </div>
            
        </div>
    )
}
