export type SpelledKey = {
    inputKey: string[]
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
  showAns: boolean
  hideChars: boolean
  showEnglish: boolean
  animations: boolean
  hskLevel?: number 
  [key: string]: any
}

export type HSKword = {
  metadata: {
      id: string | number;
      learned?: boolean;
      description?: string;
  };
  "translation-data": {
      english: string;
      "pinyin-numbered": string;
      pinyin: string;
      simplified: string;
      traditional: string;
  };
}

export type TouchedEl = "none" | "emoji" | "new-word-btn"