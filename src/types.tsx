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

export type HskLevel = "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5" | "hsk6" | "hskAll"

export type Setting = {
  mode: string
  mistakeCountTolerance: number
  traditional: boolean
  showAns: boolean
  hideChars: boolean
  showEnglish: boolean
  animations: boolean
  hskLevel: string
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

