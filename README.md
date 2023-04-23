# react-hanzi-speller-2
Keybr.com inspired typing algorithm adapted into Chinese characters. Spell Chinese characters with a typing algorithm that has tolerance for mistyped and absent letters.

![hanzispellerpreview](https://user-images.githubusercontent.com/38334911/233826938-4d22001a-79cc-4efa-b7ed-ddd6acba2a58.JPG)

## Why
- Strengthen your Chinese knowledge
- Reinforce the correct pronunciation of Chinese vocabulary
- Improve your speed and accuracy when typing Chinese

## How to play
1.  A Chinese word to be spelled is presented. Before typing, it's recomended to click on the emoji to focus all keyboard input into the speller and prevent prevent unintended actions.
2.  To start, type in the pinyin pronunciation of the Chinese-character selected in blue. The blue selector will move automatically after completing the spelling of the selected character.
3.  After the spelling of each of the displayed characters has been fully completed, press <kbd>Enter</kbd> to get a new word.

## Don’t know the spelling of a character?
- Press <kbd>Enter</kbd> to reveal the answer. However, it will only work if an attempt has already been made. The spelling of the revealed text will consequently be marked as mistakes.
- Check **Show Answer** on the settings bar to display the text to be spelled. This setting does not influence the display of the correctness of your spelling (check this if you do not know Chinese).

## The Speller algorithm
The algorithm will forgive the wrong-spelling or absence of one key from the spelling if the following n-number of inputed-keys are correct. This number is set to 2 by default but it can be changed on the settings bar. 

For example, if the word to type is 'zhongwen' and the letter 'z' is miss-spelled for a 'c', the spelling will continue if 'h' and 'o' are input right after that mistake. The spelling at that point will be displayed as "**z**ho" with the miss-spelled letter 'z' colored in red.

Or in the case of an absent key, if the letter 'g' is not input but its two following correct keys 'w' and 'e' are, then the spelling will resume and be displayed as "zhon**g**we" with a red-colored 'g'.

## Settings
- **Show answer** displays the text to be spelled. It is ideal for those who want to try the app but don’t know Chinese or those who want to cheat!
- **Traditional** displays the presented word in traditional Chinese characters when it is checked, and simplified Chinese characters when it is unchecked.
- **Tolerance** is the consecutive number of correct input keys after the wrong-spelling or absence of one key required to resume spelling at that point.
- **Hide Characters**, as the name indicates, hides the characters for an extra challenge, and also provides the translation of the word. Characters reveal themselves when their spelling is complete.
- **Flip animation** allows the flip animation effect to be turned on or off when playing with ‘Hide Characters’ on.
- **Mode** changes the type of spelling required for characters. There are 3 modes:
  - **noTones** only requires the user to type the pinyin pronunciation using letters from the English alphabet. The pinyin vowel of ‘ü’ is input as ‘v’. For example, the spelling for 女人 "nǚrén" should be input as "nvren".
  - **withTones** is similar to ‘noTones’ but it also requires the tones to be specified. Tones are represented with numbers from 1 to 5 and are typed at the end of each character spelling. For example, 女人 "nǚrén" should be input as "nv3ren2".
    - Tone **1** represents a high and flat tone (ā)
    - Tone **2** represents a rising tone (á)
    - Tone **3** represents a dipping tone (ǎ)
    - Tone **4** represents a falling tone (à)
    - Tone **5** represents a neutral tone (a)
  - **onlyTones** only requires inputting the tones of each character using the numbered notation described above. For example, 女人 "nǚrén" should be input as "32".
- **HSK Vocabulary** changes the vocabulary pool from a selection of different HSK levels. Currently, the only way to change the HSK Vocabulary is by manually changing the import JSON file on the App.tsx component source code.
- **New Word** displays a random word from the selected HSK Vocabulary level.