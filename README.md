# DerDieDas

### Roadmap

- [x] Build script to add article data
- [x] Set up continous integration (possibly Circle CI)
- [x] prevent unallowed state transitions by using a map of allowedStateTransitions when setting state
- [x] Deployments to PlayStore
  - [ ] set the correct deployment version in bitrise workflow
- [x] Specify and implement statistics screen features
- [ ] Design ConfigScreen
- [ ] Specify and implement FAQ tab screen
- [ ] Grammar hints ("Words ending on 'schaft' are feminin")
- [ ] Content creation for about page, imprint, etc.
- [x] speed up animations and transitions
- [ ] More code testing
- [x] implement goBack with BackButton in StartModal, disable BackButton on FinishedScreen
- [ ] implement savedLessons as dropdown list with dropdow
      items to show in StatisticsScreen
- [ ] Refactor Code
- [x] https://github.com/ak1394/react-native-tts#no-text-to-speech-engine-installed-on-android
- [ ] Refactor Design (Colors, Fonts, UX, responsive)
- [ ] Create a good README
- [ ] Streaks ("X correct answers in a row")
- [ ] Badges
  - [ ] "Lesson passed without mistakes"
  - [ ] "Finalized learning X Words"
  - [ ] "Record streak"
  - [ ] Show badges on statistics page
- [ ] App Use hints ("Use DDD in a quiet surrounding for better results")
- [ ] setup CDN and cloud storage for images (BunnyCDN)
- [ ] don't show StartScreen when there are no words with dueDate == today or new words but StatisticsScreen or GetNewWordPackageScreen (to be implemented)
- [ ] delete badly pronounced words and add more words

### Bugs

- [x] pressing articleButton between speaking and listening in autoMode doesn't logIn the answer. app continues listening instead of showing next word
- [x] if no words in lessonWords clicking on start lesson shoudn't generate a new lessonHistory
- [x] on articleButton pressed, answer is counted, but wordIndex not incremented. If pressed again, answer is counted twice, then the wordIndex is incremented.
- [ ] cancel after clicking article SelectorButton, then returning to lesson and clicking SelectorButton again -> answer is being counted twice
- [x] clicking startLesson() on FinishedScreen with no more words with dueDate==today or new words leads to a crash because emptyLesson() is called and the PlayerScreen component being still
      mounted in the background (React.navigation!) is rerendered with empty lessonWords.
- [x] FinishedScreen: number text in AnimatedNumber counter not centered with number >=10
- [ ] IntroSlider show up briefly when opening the app (after initial use)
