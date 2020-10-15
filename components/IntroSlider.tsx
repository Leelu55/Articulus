import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import UIStore from '../stores/UIStore';
import {useContext} from 'react';

import Svg1 from './intro/Slide1SVG';
import Svg2 from './intro/Slide2SVG';
import Svg3 from './intro/Slide3SVG';

const slides = [
  {
    key: '1',
    title: 'Lerne deutsche Artikel',
    text: 'Verwende Der, Die, Das korrekt und sicher',
    svg: Svg1,
    backgroundColor: 'pink',
  },
  {
    key: '2',
    title: 'Lerne mit Sprachsteuerung',
    text: 'Sprich einfach den Artikel für jedes Wort und lerne freihändig',
    svg: Svg2,
    backgroundColor: 'mediumaquamarine',
  },
  {
    key: '3',
    title: 'Deutsch wie ein Profi',
    text:
      'Mit der Zeit perfektionierst du den Gebrauch von Artikeln und kannst immer mehr Wörter sicher benutzen',
    svg: Svg3,
    backgroundColor: 'lightblue',
  },
];

const renderItem = ({item}) => {
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 500,
      marginBottom: 20,
      marginTop: 20,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 10,
      textAlign: 'center',
    },
    descriptionText: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });

  return (
    <View style={[styles.wrapper, {backgroundColor: item.backgroundColor}]}>
      <Text style={styles.titleText}>{item.title}</Text>
      {item.svg()}
      <Text style={styles.descriptionText}>{item.text}</Text>
    </View>
  );
};

function IntroSlider() {
  const uiStore = useContext(UIStore);

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={uiStore.hideIntro}
    />
  );
}

export default observer(IntroSlider);
