import React, { SetStateAction, useEffect, useRef } from 'react'
import { HSKword, Setting, SpelledKey } from './types'

type SettingsProps = {
    setInputKeys: (value: SpelledKey[]) => void //React.Dispatch<React.SetStateAction<SpelledKey[]>>
    setHskWord: (value: HSKword) => void
    getRandomHSK: (value: void) => HSKword
    setRevealNos: (value: number[]) => void
    setSettings: (value: SetStateAction<Setting>) => void
}

export default function Settings({setInputKeys, setHskWord, getRandomHSK, setRevealNos, setSettings}: SettingsProps) {
    const modeEl = useRef<HTMLSelectElement>(null)
    const toleranceEl = useRef<HTMLInputElement>(null)

    function handleSubmit(e: any) {
        e.preventDefault()
        console.log("$$$ prevented default $$$")
        setInputKeys([])
        setHskWord(getRandomHSK())
        setRevealNos([])
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            mode: modeEl.current!.value, 
            mistakeCountTolerance: parseInt(toleranceEl.current!.value)}})
    }

    function handleTradClick() {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            traditional: !oldSettings.traditional }})
    }

    function handleEasyModeClick() {
        setSettings((oldSettings: Setting) => { return {
            ...oldSettings,
            easyMode: !oldSettings.easyMode }})
    }


    return (
        <div className="settings" >
            <div className="form-group">
                <label htmlFor="trad">Traditional</label>
                <input id="trad" type="checkbox" onClick={handleTradClick} />
            </div>

            <div className="form-group">
                <label htmlFor="easy">Easy mode</label>
                <input id="easy" type="checkbox" onClick={handleEasyModeClick} />
            </div>

            <div className="form-group">
                <label htmlFor="tol">Tolerance</label>
                <input id="tol" type="number" min={0} step={1} defaultValue={2} ref={toleranceEl} />
            </div>

            <div className="form-group">
                <label htmlFor="mode">Mode: </label>
                <select name="mode" id="mode" ref={modeEl} >
                    <option value="noTones">No tones</option>
                    <option value="withTones">With tones</option>
                    <option value="onlyTones">Only tones</option>
                </select>
            </div>

            <div className="form-group">
                <button  className="btn" onClick={handleSubmit}>Start</button>
            </div>
            
        </div>
    )
}
