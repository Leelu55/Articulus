import React from 'react';
import {View} from 'react-native';
import GrammarItem from './GrammarItem';
import {rules} from '../libs/Rules';

function FaqItems() {
  return (
    <View>
      {Object.keys(rules).map((ruleId) => (
        <GrammarItem ruleId={ruleId} key={ruleId} />
      ))}
    </View>
  );
}
export default FaqItems;
