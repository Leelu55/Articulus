# DerDieDas

### Roadmap

- [x] Build script to add article data
- [x] Set up continous integration (possibly Circle CI)
- [x] prevent unallowed state transitions by using a map of allowedStateTransitions when setting state
- [x] Deployments to PlayStore
  - [ ] set the correct deployment version in bitrise workflow
- [ ] Specify and implement statistics screen features
- [ ] Specify and implement FAQ tab screen
- [ ] Grammar hints ("Words ending on 'schaft' are feminin")
- [ ] Content creation for about page, imprint, etc.
- [ ] speed up animations and transitions
- [ ] More code testing
- [ ] implement back button
- [ ] Refactor Code
- [ ] Refactor Design (Colors, Fonts, UX, responsive)
- [ ] Create a good README
- [ ] Streaks ("X correct answers in a row")
- [ ] Badges
  - [ ] "Lesson passed without mistakes"
  - [ ] "Finalized learning X Words"
  - [ ] "Record streak"
  - [ ] Show badges on statistics page
- [ ] App hints ("Use DDD in a quiet surrounding for better results")
- [ ] setup CDN and cloud storage for images (BunnyCDN)

### Bugs

- [x] pressing articleButton between speaking and listening in autoMode doesn't logIn the answer. app continues listening instead of showing next word
- [x] if no words in lessonWords clicking on start lesson shoudn't generate a new lessonHistory
- [x] on articleButton pressed, answer is counted, but wordIndex not incremented. If pressed again, answer is counted twice, then the wordIndex is incremented.
- [ ] cancel after clicking article SelectorButton, then returning to lesson and clicking SelectorButton again -> answer is being counted twice
- [x] clicking startLesson() on FinishedScreen with no more words with dueDate==today or new words leads to a crash because emptyLesson() is called and the PlayerScreen component being still
      mounted in the background (React.navigation!) is rerendered with empty lessonWords.
