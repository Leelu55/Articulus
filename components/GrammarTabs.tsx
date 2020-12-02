/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import GrammarItems from './GrammarItems';

const initialLayout = {width: Dimensions.get('window').width};

function GrammarTabs() {
  // tab index
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: settings.colors.secondary.normal,
        bottom: 0,
        height: 35,
        borderRadius: 20,
      }}
      labelStyle={{
        fontWeight: 'bold',
        fontSize: 20,
        color: settings.colors.primary.dark,
        transform: [{translateY: 10}],
      }}
      style={{
        backgroundColor: 'white',
        padding: 0,
        elevation: 0,
        marginBottom: 10,
        marginHorizontal: 10,
      }}
    />
  );

  const routes = [
    {key: 'der', title: 'DER'},
    {key: 'die', title: 'DIE'},
    {key: 'das', title: 'DAS'},
  ];

  // https://github.com/satya164/react-native-tab-view#optimization-tips
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'der':
        return (
          <View style={[sharedStyles.scene]}>
            <GrammarItems category={'DER'} />
          </View>
        );
      case 'die':
        return (
          <View style={[sharedStyles.scene]}>
            <GrammarItems category={'DIE'} />
          </View>
        );
      case 'das':
        return (
          <View style={[sharedStyles.scene]}>
            <GrammarItems category={'DAS'} />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.wrapper}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        tabBarPosition="top"
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  scene: {flex: 1},
  wrapper: {
    borderWidth: 5,
    overflow: 'hidden',
    marginTop: 20,
    borderColor: 'transparent',
  },
});

export default observer(GrammarTabs);
