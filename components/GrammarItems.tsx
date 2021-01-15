import React from 'react';
import {View} from 'react-native';
import GrammarItem from './GrammarItem';
import {rules} from '../libs/rules';

function GrammarItems({category}: {category: string}) {
  return (
    <View>
      {Object.keys(rules).map((ruleId) => {
        if (rules[ruleId].category !== category) {
          return null;
        }
        return <GrammarItem ruleId={ruleId} key={ruleId} />;
      })}
    </View>
  );
}
export default GrammarItems;
