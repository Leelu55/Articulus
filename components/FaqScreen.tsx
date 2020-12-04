import React from 'react';
import {View, Text} from 'react-native';
import sharedStyles from '../styles/sharedStyles';

import FaqUnicorn from './SVGs/FaqUnicorn';
import FaqItems from './FaqItems';
import {ScrollView} from 'react-native-gesture-handler';
import {useScreenToTop} from './hooks/useScreenToTop';

function FaqScreen() {
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

  return (
    <ScrollView ref={ref}>
      <View style={sharedStyles.screen}>
        <Text style={sharedStyles.screenTitle}>FAQ</Text>
        <Text style={sharedStyles.screenSubTitle}>Nutzungshinweise</Text>

        <View style={sharedStyles.screenHeaderIcon}>
          <FaqUnicorn width={150} />
        </View>

        <View style={[sharedStyles.screenContent, {margin: 20}]}>
          <FaqItems />
        </View>
      </View>
    </ScrollView>
  );
}
export default FaqScreen;
