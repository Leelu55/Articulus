# Articulus

### Roadmap

- [ ] set the correct deployment version in bitrise workflow
- [ ] Design ConfigScreen
- [ ] Specify and implement FAQ tab screen
- [ ] Grammar hints ("Words ending on 'schaft' are feminin")
- [ ] Content creation for about page, imprint, etc.
- [ ] More code testing
- [ ] implement savedLessons as dropdown list with dropdown items to show in StatisticsScreen
- [ ] Move sparkle feedback (correct&wrong) animation starting point from ProgressBar to SelectorViews (aka article buttons)
- [ ] include labels to ControlBar and LessonStateIndicator and manage disabled/enabled status of ControlButtons according to LessonState
- [ ] Refactor Design (Colors, Fonts, UX, responsive)
- [ ] redesign StartScreenAnimation
- [ ] change android StatusBar appearence according to our colors
- [ ] Refactor Code
- [ ] Create a good README
- [ ] FinishedScreen Articulus display SpeechBubbles with messages for the user ('well done', 'try again', 'good progress' etc)
- [ ] Streaks ("X correct answers in a row")
- [ ] Badges
  - [ ] "Lesson passed without mistakes"
  - [ ] "Finalized learning X Words"
  - [ ] "Record streak"
  - [ ] Show badges on statistics page
- [ ] App Use hints ("Use DDD in a quiet surrounding for better results")
- [ ] don't show StartScreen when there are no words with dueDate == today or new words but StatisticsScreen or GetNewWordPackageScreen (to be implemented)
- [ ] delete badly pronounced words and add more words

- [x] Build script to add article data
      call this script in your shell by executing the command below:
      \$ node modelTransformer.ts > ../model/model.json
- [x] Set up continous integration (possibly Circle CI)
- [x] prevent unallowed state transitions by using a map of allowedStateTransitions when setting state
- [x] Deployments to PlayStore
- [x] Specify and implement statistics screen features
- [x] speed up animations and transitions
- [x] implement goBack with BackButton in StartModal, disable BackButton on FinishedScreen
- [x] https://github.com/ak1394/react-native-tts#no-text-to-speech-engine-installed-on-android
- [x] setup CDN and cloud storage for images with Statically as CDN and GitHub for storage

### Bugs

- [x] pressing articleButton between speaking and listening in autoMode doesn't logIn the answer. app continues listening instead of showing next word
- [x] if no words in lessonWords clicking on start lesson shoudn't generate a new lessonHistory
- [x] on articleButton pressed, answer is counted, but wordIndex not incremented. If pressed again, answer is counted twice, then the wordIndex is incremented.
- [ ] cancel after clicking article SelectorButton, then returning to lesson and clicking SelectorButton again -> answer is being counted twice
- [x] clicking startLesson() on FinishedScreen with no more words with dueDate==today or new words leads to a crash because emptyLesson() is called and the PlayerScreen component being still
      mounted in the background (React.navigation!) is rerendered with empty lessonWords.
- [x] FinishedScreen: number text in AnimatedNumber counter not centered with number >=10
- [ ] IntroSlider show up briefly when opening the app (after initial use)
- [ ] navigating with Buttons (StartScreen and PlayerScreen) takes way too long
