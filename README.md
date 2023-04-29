# react-hanzi-speller-2
Keybr.com inspired typing algorithm adapted into Chinese characters. Spell Chinese characters with a typing algorithm that has tolerance for mistyped and absent letters.
https://harijoel.github.io/react-hanzi-speller-2/

![image](https://user-images.githubusercontent.com/38334911/235287783-2c6a73b4-b2bc-43bc-b6d3-6d870a47af14.png)

## Why
- Strengthen your Chinese knowledge
- Reinforce the correct pronunciation of Chinese vocabulary
- Improve your speed and accuracy when typing Chinese

## How to play
1.  Before any typing, it's recomended to click on the emoji to focus all keyboard input into the speller and prevent prevent unintended actions.
2.  Type in the pinyin pronunciation of the Chinese-character selected in blue. The blue selector will move automatically after the spelling of the selected character is complete.
3.  When the spelling of each of the displayed characters has been fully completed, press <kbd>Enter</kbd> to get a new word.

## Don’t know the spelling of a character?
- Press <kbd>Enter</kbd> to reveal the answer. However, it will only work if any spelling attempt has already been made on that character. As consequence however, the spellings of the revealed text-to-type will all be marked as mistakes.
- Check **Show Answer** on the settings bar to display the text to be spelled. This setting does not influence the display of the correctness of your spelling (check this if you do not know Chinese).

## The Speller algorithm
The algorithm will forgive the wrong-spelling or absence of one key from the spelling if the consecutive following n-number of inputed-keys are correct. This number is set to 2 by default but it can be changed on the settings bar. 

For example, if the word to type is 'zhongwen' and the letter 'z' is miss-spelled for a 'c', the spelling will continue if its following correct spelling,'h' and 'o', are input right after that mistake. The spelling at that point will be displayed as "**z**ho" with the miss-spelled letter 'z' colored in red.

Or in the case of an absent key, if the letter 'g' is not input but its two following correct keys 'w' and 'e' are, then the spelling will resume and be displayed as "zhon**g**we" with a red-colored 'g'.

## Settings
- **Show answer** displays the text to be spelled on all characters at once. It is ideal for those who want to try the app but don’t know Chinese or those who want to cheat!
- **Traditional** displays the presented word in traditional Chinese characters when it is checked, and simplified Chinese characters when it is unchecked.
- **Tolerance** is the consecutive number of correct input keys after the wrong-spelling or absence of one key required to resume the spelling at that point.
- **Hide Characters**, as the name indicates, hides the characters for an extra challenge, and provides the translation of the word. Characters reveal themselves when their spelling is complete or when their answer is revealed through an <kbd>Enter</kbd> press.
- **Flip animation** allows the flip animation effect to be turned on or off when playing with ‘Hide Characters’ on. This effect triggers when a character is revealed.
- **Mode** changes the type of spelling required for characters. There are 3 modes:
  - **noTones** requires the user to type the pinyin pronunciation using only letters from the English alphabet. The pinyin vowel of ‘ü’ is input as ‘v’. For example, the spelling for 女人 "nǚrén" should be input as "nvren".
  - **withTones** is similar to ‘noTones’ but it also requires the tones to be specified. Tones are represented with numbers from 1 to 5 and are typed at the end of each character spelling. For example, 女人 "nǚrén" should be input as "nv3ren2".
    - Tone **1** represents a high and flat tone (ā)
    - Tone **2** represents a rising tone (á)
    - Tone **3** represents a dipping tone (ǎ)
    - Tone **4** represents a falling tone (à)
    - Tone **5** represents a neutral tone (a)
  - **onlyTones** only requires the tones of each character to be input using the numbered notation described above. For example, 女人 "nǚrén" should be input as "32".
- **HSK Vocabulary** changes the vocabulary pool from a selection of different HSK levels.
- **New Word** displays a random word from the selected HSK Vocabulary level.

## More
- Click and hold on a card to see a more detailed map of the spelling input
- Double click the emoji to reset the spelling progress of the current word
- When Show Answer and Hide Characters are both checked on settings, you can press <kbd>Enter</kbd> at any time to reveal the selected hidden character.
