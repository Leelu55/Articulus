import React from 'react';
import {StatusBar, ScrollView, View, Text} from 'react-native';

import FaqUnicorn from './SVGs/FaqUnicorn';
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

  // const renderItem = ({item}) => {
  //   return (
  //     <FaqItem
  //       title={item.title}
  //       text={item.text}
  //       faIcon={item.faIcon}
  //       shortText={item.shortText}
  //     />
  //   );
  // };

  return (
    <ScrollView
      style={sharedStyles.screen}
      contentContainerStyle={{paddingTop: StatusBar.currentHeight}}
      ref={ref}>
      <View style={{paddingBottom: 20}}>
        <Text style={sharedStyles.screenTitle}>FAQ</Text>
        <Text style={sharedStyles.screenSubTitle}>Nutzungshinweise</Text>
        <View style={sharedStyles.screenHeaderIcon}>
          <FaqUnicorn width={150} />
        </View>
      </View>

      {DATA.map((item, idx) => (
        <FaqItem
          key={idx}
          title={item.title}
          text={item.text}
          faIcon={item.faIcon}
          shortText={item.shortText}
        />
      ))}
    </ScrollView>
  );
}
export default FaqScreen;
