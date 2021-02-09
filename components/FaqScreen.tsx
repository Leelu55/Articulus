import React from 'react';
import {View, Text, SafeAreaView, FlatList, StatusBar} from 'react-native';

import FaqUnicorn from './SVGs/FaqUnicorn';
import {ScrollView} from 'react-native-gesture-handler';
import {useScreenToTop} from './hooks/useScreenToTop';
import sharedStyles from '../styles/sharedStyles';
import {faqs} from '../libs/faqs';
import FaqItem from './FaqItem';

function FaqScreen() {
  const ref = React.useRef<ScrollView>(null);
  useScreenToTop(ref);

  const DATA = Object.keys(faqs).map((faq) => ({
    title: faqs[faq].label,
    text: faqs[faq].text,
    shortText: faqs[faq].shortText,
    faIcon: faqs[faq].faIcon,
  }));

  const renderItem = ({item}) => {
    return (
      <FaqItem
        title={item.title}
        text={item.text}
        faIcon={item.faIcon}
        shortText={item.shortText}
      />
    );
  };

  return (
    <SafeAreaView style={sharedStyles.screen}>
      <FlatList
        contentContainerStyle={{paddingTop: StatusBar.currentHeight}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, idx) => 'key' + idx}
        ListHeaderComponent={
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{paddingBottom: 20}}>
            <Text style={sharedStyles.screenTitle}>FAQ</Text>
            <Text style={sharedStyles.screenSubTitle}>Nutzungshinweise</Text>
            <View style={sharedStyles.screenHeaderIcon}>
              <FaqUnicorn width={150} />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
export default FaqScreen;
