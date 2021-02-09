import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import sharedStyles from '../styles/sharedStyles';

import MagicBook from './SVGs/MagicBook';
import {ScrollView} from 'react-native-gesture-handler';
import GrammarTabs from './GrammarTabs';
import {useScreenToTop} from './hooks/useScreenToTop';

function GrammarScreen() {
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);
  const [tabsAttachedToTop, setTabsAttachedToTop] = React.useState(false);

  function screenToTop() {
    ref.current.scrollTo({y: 0, animated: true});
  }

  return (
    <ScrollView
      ref={ref}
      onScroll={(e) => {
        const height = e.nativeEvent.contentSize.height;
        const offsetY = e.nativeEvent.contentOffset.y;

        let paddingToBottom = e.nativeEvent.layoutMeasurement.height;
        setTabsAttachedToTop(offsetY >= height - paddingToBottom);
      }}>
      <View
        style={[sharedStyles.screen, {paddingTop: StatusBar.currentHeight}]}>
        <Text style={sharedStyles.screenTitle}>Regeln</Text>
        <Text style={sharedStyles.screenSubTitle}>Der - Die - Das</Text>

        <View style={sharedStyles.screenHeaderIcon}>
          <MagicBook width={150} />
        </View>

        <View style={sharedStyles.screenContent}>
          <GrammarTabs
            tabsAttachedToTop={tabsAttachedToTop}
            screenToTop={screenToTop}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default GrammarScreen;
