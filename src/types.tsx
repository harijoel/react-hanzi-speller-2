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

export type HSKword = {
  metadata: {
      id: string;
      learned: boolean;
      description: string;
  };
  "translation-data": {
      english: string;
      "pinyin-numbered": string;
      pinyin: string;
      simplified: string;
      traditional: string;
  };
}