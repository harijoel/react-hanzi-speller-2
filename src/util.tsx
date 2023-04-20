import { HanziPinyin, SpelledKey } from "./types";
import keypressSound from "./assets/typewriterkeypress.wav"
import typewriterSound from "./assets/nicetypewriterkeypress.wav"
import mistakeSound from "./assets/mistake.wav"
import winSound from "./assets/correctpass.wav"
import oldKeyboardSound from "./assets/oldkeyboardpress.wav"
import hardtyewriterhitSound from "./assets/hardtypewriterhit.wav"

export function getWordArray(
    wordHanzi: [string, string], 
    wordPinyinAccented: string, 
    wordPinyinNumbered: string, 
    mode: string)
        : HanziPinyin[] {
    // Cleaning process: remove spaces, remove " ' " mark, everything to lowercase
    const wordPinyinNo_clean = wordPinyinNumbered.replace(/ü/g, 'v').replace(/[\s']/g, "").toLowerCase()
    const wordPinyinAcc_clean = wordPinyinAccented.replace(/[\s']/g, "").toLowerCase()

    // Separate string by number. Ex: "zhong1wen2" => ["zhong", "wen"]
    const wordPinyinRomanArray: string[] | null = wordPinyinNo_clean.split(/\d+/).filter(Boolean)

    // Use previous no number array sylable lenghts to separate accented string
    // Ex. "zhōngwén" => ["zhōng", "wén"]
    const wordSylableNo = wordHanzi[0].length
    let index_start = 0
    let wordPinyinAccArray: string[] = []
    for (let index = 0; index < wordSylableNo; index++) {
        wordPinyinAccArray = [...wordPinyinAccArray, 
                                wordPinyinAcc_clean.slice(index_start, 
                                index_start + wordPinyinRomanArray[index].length)
                          ]
        index_start = index_start + wordPinyinRomanArray[index].length
    }

    // Separate string by number. Ex: "zhong1wen2" => ["zhong1", "wen2"]
    // Had to define wordPinyinRomanArray as type any because match could throw...
    // ...null if nothing matches, so []

    let textToType_SylArray = wordPinyinRomanArray // Default mode "noTones"

    if (mode === "withTones") {
        textToType_SylArray = wordPinyinNo_clean.match(/[a-zA-Z]+\d+/g)
                              || [wordPinyinNo_clean]
    }
    if (mode === "onlyTones") {
        textToType_SylArray = wordPinyinNo_clean.match(/\d+/g)
                                || [wordPinyinNo_clean]
      }

    // Make each of the elements in the 3 arrays into objects
    // Array of objects
    let objectArray: HanziPinyin[] = []
    for (let index = 0; index < wordSylableNo; index++) {
        objectArray = [...objectArray, {hanzi_SimpTrad: [wordHanzi[0][index], wordHanzi[1][index]], 
                                        pinyinNo: wordPinyinRomanArray[index], 
                                        pinyinAcc: wordPinyinAccArray[index],
                                        textToType_Syl: textToType_SylArray[index]
                                        }
                      ]
    }

    return objectArray
}

export function getTextToType_SylArray(wordArray: HanziPinyin[], mode: string) {
    
}

export function sylibalizeInput(hanziPinyinArrayWord: HanziPinyin[], inputKeys: SpelledKey[]) {
    //Sylibalize input
    const sylNo = hanziPinyinArrayWord.length
    const textToTypeArr = hanziPinyinArrayWord.map(syl => syl.textToType_Syl)
    let index_start = 0
    
    // const inputKeys_input = inputKeys.map(spell => spell.inputKey)
    let inputSylArray: SpelledKey[][] = [] 
    for (let index = 0; index < sylNo; index++) {
        let extraKey = index === sylNo - 1 ? 1 : 0 // if last syl
        let sylSlice = inputKeys.slice(
                index_start,
                index_start + textToTypeArr[index].length + extraKey
        )
        if (!sylSlice.length) {
            break; }
        inputSylArray = [...inputSylArray, sylSlice] // Result: array of arrays
        index_start = index_start + textToTypeArr[index].length
    }
    return inputSylArray // [ [z, h, o, n, g], [g, u, o: SpelledKey], [] ] "中国人"
}

export function getDynamicIndex(inputSylArray: any[], textToTypeSyl_Array: string[]): number {
    let normalIndex = inputSylArray.length - 1
    let dynamicIndex = normalIndex
    if (inputSylArray.length === 0) {
        return 0
    } 
    // Length of current sylable being typed === length of complete sylable at that index
    const isSylableComplete = inputSylArray[normalIndex].length === textToTypeSyl_Array[normalIndex].length

    // When the whole word has been typed
    if (isSylableComplete && inputSylArray.length === textToTypeSyl_Array.length) {
        return normalIndex
    }
    
    // When sylable has been typed but not the whole word
    if (isSylableComplete) {
        return normalIndex + 1
    }

    // When sylable has not been yet typed completely
    return normalIndex
}

export function playSound(sound: string) {
    new Audio(sound).play()
}

export function playKeypressFX() {
    new Audio(hardtyewriterhitSound).play()
}

export function playMistakeFX() {
    new Audio(mistakeSound).play()
}

export function playWinFX() {
    const sound = new Audio(winSound)
    sound.volume = 0.3
    sound.play()
}