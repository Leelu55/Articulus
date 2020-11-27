import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import AnimatedNumber from '../AnimatedNumber';
import ChatBubble from '../ChatBubble';

export default function CatChatBubble({
  animCatChatBubble,
  doAnim,
  currentLesson,
}) {
  const wordsPlayed =
    currentLesson.countWrongAnswers + currentLesson.countCorrectAnswers;
  const sucessRate =
    wordsPlayed > 0
      ? Math.ceil((currentLesson.countCorrectAnswers / wordsPlayed) * 100)
      : 0;
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: animCatChatBubble.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            }),
          },
        ],
      }}>
      <ChatBubble>
        <View style={styles.chatBubbleInner}>
          <View style={styles.chatBubbleRow}>
            <Text style={styles.chatBubbleLabel}>Richtig</Text>
            <AnimatedNumber
              to={currentLesson.countCorrectAnswers}
              height={30}
              delay={0}
              duration={2000}
              color="green"
              doStart={doAnim}
            />
          </View>
          <View style={styles.chatBubbleRow}>
            <Text style={styles.chatBubbleLabel}>Falsch</Text>
            <AnimatedNumber
              to={currentLesson.countWrongAnswers}
              height={30}
              delay={0}
              duration={2000}
              color="red"
              doStart={doAnim}
            />
          </View>
          <View style={styles.chatBubbleRow}>
            <Text style={styles.chatBubbleLabel}>Wörter gespielt</Text>
            <AnimatedNumber
              to={wordsPlayed}
              height={30}
              delay={0}
              duration={2000}
              color="black"
              doStart={doAnim}
            />
          </View>
          <View style={styles.chatBubbleRow}>
            <Text style={styles.chatBubbleLabel}>Erfolgsrate</Text>
            <AnimatedNumber
              to={sucessRate}
              height={30}
              delay={0}
              duration={2000}
              color="black"
              doStart={doAnim}
            />
            <Text style={styles.chatBubbleValue}>%</Text>
          </View>
          <View style={styles.chatBubbleRow}>
            <Text style={styles.chatBubbleLabel}>Lauf</Text>
            <AnimatedNumber
              to={calculateStreak(currentLesson)}
              height={30}
              delay={0}
              duration={2000}
              color="black"
              doStart={doAnim}
            />
          </View>
        </View>
      </ChatBubble>
    </Animated.View>
  );
}

function calculateStreak(currentLesson) {
  let streak = 0;
  let runningStreak = 0;
  for (let word in currentLesson.words) {
    const clw = currentLesson.words[word];
    if (clw.isAnswerCorrect) {
      runningStreak++;
    } else {
      runningStreak = 0;
    }
    if (runningStreak > streak) {
      streak = runningStreak;
    }
  }
  return streak;
}
const styles = StyleSheet.create({
  chatBubbleInner: {
    flexDirection: 'column',
  },
  chatBubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.75,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
  chatBubbleLabel: {flex: 1, fontSize: 20, color: 'black'},
  chatBubbleValue: {fontWeight: 'bold', fontSize: 20, marginLeft: 2},
});
