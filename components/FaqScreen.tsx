import React from 'react';
import {View, Text} from 'react-native';
import sharedStyles from '../styles/sharedStyles';

import FaqUnicorn from './SVGs/FaqUnicorn';
import FaqItems from './FaqItems';
import {ScrollView} from 'react-native-gesture-handler';

function FaqScreen() {
  return (
    <ScrollView>
      <View style={sharedStyles.screen}>
        <Text style={sharedStyles.screenTitle}>FAQ</Text>
        <Text style={sharedStyles.screenSubTitle}>FAQ</Text>

        <View style={sharedStyles.screenHeaderIcon}>
          <FaqUnicorn width={150} />
        </View>

        <View style={sharedStyles.screenContent}>
          <FaqItems />
        </View>
      </View>
    </ScrollView>
  );
}
export default FaqScreen;
