/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';

import UnicornCat from './SVGs/UnicornCat';
import FaqItems from './FaqItems';
import {ScrollView} from 'react-native-gesture-handler';

function FaqScreen() {
  return (
    <ScrollView>
      <View style={[sharedStyles.screen, styles.wrapper]}>
        <Text style={styles.title}>FAQ</Text>

        <View style={styles.catWrapper}>
          <UnicornCat width={150} />
        </View>
        <View style={[sharedStyles.viewVertical, {padding: 0, margin: 10}]}>
          <FaqItems />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  catWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    backgroundColor: settings.colors.primary.background,
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default FaqScreen;
