# DerDieDas

## Lerne deutsche Artikel überall 

<div hidden>

```
@startuml
[*] --> IsInitial
IsInitial --> IsSpeaking : [wordIndex = 0]

IsSpeaking --> IsListening :["tts-finish"]
IsSpeaking --> IsSpeaking : ["forward" wordIndex++]
IsSpeaking --> IsPaused : ["pause"]

IsListening --> IsEvaluating : ["onSpeechResult"]
IsListening --> IsRepeating : ["onSpeechError"]
IsListening --> IsSpeaking : ["forward" wordIndex++]
IsListening --> IsPaused : ["pause"]

IsPaused --> IsSpeaking : ["play"]
IsPaused --> IsSpeaking : ["forward" wordIndex++]

IsRepeating --> IsListening : ["Wiederhole den Artikel"]
IsRepeating --> IsSpeaking : ["forward" wordIndex++]
IsRepeating --> IsPaused : ["pause"]

IsEvaluating --> IsSpeaking: ["articleFound" wordIndex++]
IsEvaluating --> IsSpeaking : ["forward" wordIndex++]
IsEvaluating --> IsPaused : ["pause"]
IsEvaluating --> [*]: IsFinished
@enduml

```
</div>

![](plantUml.svg)
