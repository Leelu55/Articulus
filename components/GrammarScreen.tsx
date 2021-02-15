import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
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
  const styles = StyleSheet.create({
    header: {
      paddingBottom: 20,
      marginTop: 10,
      paddingTop: StatusBar.currentHeight,
    },
  });
  return (
    <ScrollView
      ref={ref}
      onScroll={(e) => {
        // Math.floor() to use height and offsetY as integers for exact comparability
        const height = Math.floor(e.nativeEvent.contentSize.height);
        const offsetY = Math.floor(e.nativeEvent.contentOffset.y);
        let paddingToBottom = Math.floor(
          e.nativeEvent.layoutMeasurement.height,
        );
        const heightWithoutPaddingToBottom = height - paddingToBottom;
        setTabsAttachedToTop(offsetY >= heightWithoutPaddingToBottom);
      }}>
      <View style={[sharedStyles.screen, styles.header]}>
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
