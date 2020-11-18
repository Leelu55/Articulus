import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import AnimatedNumber from '../AnimatedNumber';
import ChatBubble from '../ChatBubble';

export default function CatChatBubble({
  animCatChatBubble,
  doAnim,
  currentLesson,
}) {
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
              to={
                currentLesson.countWrongAnswers +
                currentLesson.countCorrectAnswers
              }
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
              to={12}
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
              to={12}
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
