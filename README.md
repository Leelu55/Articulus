# DerDieDas

### Roadmap

- [x] Build script to add article data
- [x] Set up continous integration (possibly Circle CI)
- [ ] Deployments to PlayStore
- [ ] Specify and implement statistics screen features
- [ ] FAQ page
- [ ] Grammar hints ("Words ending on 'schaft' are feminin")
- [ ] Content creation for about page, imprint, etc.
- [ ] More code testing
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

### Bugs

- [x] pressing articleButton between speaking and listening in autoMode doesn't logIn the answer. app continues listening instead of showing next word
- [x] if no words in lessonWords clicking on start lesson shoudn't generate a new lessonHistory
- [x] on articleButton pressed, answer is counted, but wordIndex not incremented. If pressed again, answer is counted twice, then the wordIndex is incremented.
