# "風に", a Japanese practice website

## Major Points:

### Main Ideas
 - Parallax (SCRAPPED)
 - Background changes based on the local time of day. (DONE)
 - Random kanji float past in the background. (Uses [KanjiApi](https://kanjiapi.dev)) (DONE)
 - Kanji are slightly transparent, on hover they grow slightly and become slightly more opaque. (SCRAPPED)
 - On hover, shows the meaning and reading of the Kanji. (SCRAPPED)
 - On click, bring kanji to the forground, show meaning. (DONE)
 - A logged-in user can:
    - Favorite certain kanji when they float past
    - Make a post with up to three kanji, to which other users can reply with sentences containing that kanji.
        - User may reply to their own post as well, if they so wish.
    

### Importance
The purpose of this website is to serve as a fun way to practice Japanese, while still provinding an interesting experience. 

### Security (CSRF, Injection, Data Leaks)