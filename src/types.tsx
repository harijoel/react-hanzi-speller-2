export type SpelledKey = {
    inputKey: string
    correctKey: string
  }

export type HanziPinyin = {
    hanzi_SimpTrad: [string, string]
    pinyinNo: string
    pinyinAcc: string
    textToType_Syl: string
  }

export type Setting = {
  mode: string
  mistakeCountTolerance: number
  traditional: boolean
  easyMode: boolean
}