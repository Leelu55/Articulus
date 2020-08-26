# DerDieDas

## Lerne deutsche Artikel überall 

<div hidden>

```
@startuml plantUml

[*] --> startSession
startSession --> getNextWordFromSession
getNextWordFromSession --> speakWord
getNextWordFromSession --> [*]: End Of List
speakWord --> listenWord
listenWord --> checkAnswer
checkAnswer --> repeatWord
checkAnswer --> updateTimestampForWord
state c <<choice>>
updateTimestampForWord --> c
c --> getNextWordFromSession : [correctAnswer == false]
c --> incrementSlotForWord : [correctAnswer == true]
repeatWord --> listenWord
incrementSlotForWord --> getNextWordFromSession

@enduml
```
</div>

![](plantUml.svg)
