# Articulus

## Roadmap

### Specification & Implementation FROZEN 4.12.2020 DON'T ADD MORE

- [ ] specify and implement FaqScreen (including legal notice, usage hints)
- [ ] specify & implement ConfigScreen
- [ ] specify app usage hints (ControlBar, LessonStateIndicator, AutoModeButton)
- [ ] reimplement EmptyWordsScreen
- [ ] reimplement StartScreen
- [ ] show preview or loading indicator for images while not visible

### Modifications

- [ ] change house icon on FinishedScreen
- [ ] change appearance of SplashScreen (Just Text Articulus)
- [ ] modify ForwardButton behaviour -> change position of ForwardButton to next to SelectorButton,
      change icon to "?", onClick: skip word and show the right article as if the corresponding SelectorButton was clicked (green flash, green Sparkle)
- [ ] PauseModal can be a HintModal too with closeFunction = setLessonState(LessonState.IsSpeaking)

### Content Creation

- [ ] INPROGRESS write grammar rules and grammar hint texts ("Words ending on 'schaft' are feminin")
- [ ] INPROGRESS add more words
- [ ] delete badly pronounced or ambiguous words: "Kassettenrekorder", "Erwachsene", "Formular", "Beamte", 'CD-ROM', "Bekannte"
- [ ] write manual and usage hints ("Use DDD in a quiet surrounding for better results")
- [ ] write About content (Legal Notice) for FaqScreen

### Appearance

- [ ] redesign StartScreenAnimation
- [ ] choose and use fonts
- [ ] use color palette consistently
- [ ] make all screens responsive to screen size
- [ ] check paddings, margins, positions, sizes. make sure they are used consistently on all screens
- [ ] check all buttons, links, views (functionality and usability)
- [ ] change android StatusBar appearence according to our colors
- [ ] new logo

### Documentation and Pre-Release Tasks

- [ ] set the correct deployment version in bitrise workflow
- [ ] content creation for about page, imprint, etc.
- [ ] more code testing
- [ ] refactor code
- [ ] update state diagram
- [ ] write documentation for open source code reusability (document installation process, packages, tools etc)
- [ ] create a good README

### Next Features after first Open Release

- [ ] Learning Stats Animated header for StartScreen
- [ ] FinishedScreen Articulus display SpeechBubbles with messages for the user ('well done', 'try again', 'good progress' etc)
- [ ] implement savedLessons as dropdown list with dropdown items to show in StatisticsScreen
- [ ] Streaks ("X correct answers in a row")
- [ ] Badges
  - [ ] "Lesson passed without mistakes"
  - [ ] "Finalized learning X Words"
  - [ ] "Record streak"
  - [ ] show badges on statistics page
  - [ ] specify modified StartScreen when there are no words with dueDate == today or new words
- [ ] implement GrammarHint engine to choose grammar hints according to previous behaviour (not show the same hints all the time) IDEA: Show the reminder hint of the grammar rule when the user makes the same mistake twice in one lesson

### Done

- [x] build script to add article data
      call this script in your shell by executing the command below:
      \$ node modelTransformer.ts > ../model/model.json
- [x] set up continous integration (possibly Circle CI)
- [x] prevent unallowed state transitions by using a map of allowedStateTransitions when setting state
- [x] deployments to PlayStore
- [x] specify and implement statistics screen features
- [x] speed up animations and transitions
- [x] implement goBack with BackButton in StartModal, disable BackButton on FinishedScreen
- [x] https://github.com/ak1394/react-native-tts#no-text-to-speech-engine-installed-on-android
- [x] setup CDN and cloud storage for images with Statically as CDN and GitHub for storage
- [x] move sparkle feedback (correct&wrong) animation starting point from ProgressBar to SelectorViews (aka article buttons)
- [x] include calculated success rate and streak in FinishedScreen
- [x] manage disabled/enabled status of ControlButtons according to LessonState
- [x] specify and implement GrammarHints and GrammarScreen
- [x] specify and reimplement IntroSlider Screens
- [x] implement SplashScreen to prevent flickering on App start (IntroSlider/Startscreen show condition)

### Bugs

- [ ] TTS Error: Error: Language data is missing on muted sound
- [ ] cancel after clicking article SelectorButton, then returning to lesson and clicking SelectorButton again -> answer is being counted twice
- [ ] navigating with Buttons (StartScreen and PlayerScreen) takes way too long
- [ ] nextWord is too fast if correct
- [ ] SelectorButton reaction onPress not instant
- [x] pressing articleButton between speaking and listening in autoMode doesn't logIn the answer. app continues listening instead of showing next word
- [x] if no words in lessonWords clicking on start lesson shoudn't generate a new lessonHistory
- [x] on articleButton pressed, answer is counted, but wordIndex not incremented. If pressed again, answer is counted twice, then the wordIndex is incremented.
      [x] clicking startLesson() on FinishedScreen with no more words with dueDate==today or new words leads to a crash because emptyLesson() is called and the PlayerScreen component being still
      mounted in the background (React.navigation!) is rerendered with empty lessonWords.
- [x] FinishedScreen: number text in AnimatedNumber counter not centered with number >=10
