/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import sharedStyles from '../styles/sharedStyles';
import settings from '../libs/settings.json';
import GrammarItems from './GrammarItems';
import {ScrollView} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGripLines} from '@fortawesome/free-solid-svg-icons';
import {useScreenToTop} from './hooks/useScreenToTop';

const initialLayout = {width: Dimensions.get('window').width};

function GrammarTabs({
  tabsAttachedToTop = true,
  screenToTop,
}: {
  tabsAttachedToTop: boolean;
  screenToTop: Function;
}) {
  // tab index
  const [index, setIndex] = React.useState(0);
  const windowHeight = useWindowDimensions().height;
  const refDer = React.useRef<ScrollView>(null);
  const refDie = React.useRef<ScrollView>(null);
  const refDas = React.useRef<ScrollView>(null);

  useScreenToTop(refDer);
  useScreenToTop(refDie);
  useScreenToTop(refDas);

  const styles = StyleSheet.create({
    scene: {flex: 1},
    wrapper: {
      height: windowHeight - settings.bottomNavigationTabBarHeight,
      overflow: 'hidden',

      backgroundColor: 'white',
    },
  });

  const renderTabBar = (props) => (
    <View
      style={{
        backgroundColor: 'white',
        elevation: tabsAttachedToTop ? 5 : 0,
        paddingHorizontal: 30,
        paddingTop: 30,
        margin: 0,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Pressable
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingVertical: 5,
        }}
        onPress={() => screenToTop()}>
        <FontAwesomeIcon
          icon={faGripLines}
          size={30}
          style={{
            alignSelf: 'center',
            opacity: tabsAttachedToTop ? 1 : 0,
          }}
          color="lightgrey"
        />
      </Pressable>
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: settings.colors.secondary.normal,
          top: 10,
          height: 35,
          borderRadius: 20,
        }}
        labelStyle={{
          fontWeight: 'bold',
          fontSize: 20,
          color: settings.colors.primary.dark,
          transform: [{translateY: 0}],
        }}
        style={{backgroundColor: 'white', margin: 0, elevation: 0}}
      />
    </View>
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
          <ScrollView
            ref={refDer}
            style={[sharedStyles.scene]}
            scrollEnabled={tabsAttachedToTop}>
            <GrammarItems category={'DER'} />
          </ScrollView>
        );
      case 'die':
        return (
          <ScrollView
            ref={refDie}
            style={[sharedStyles.scene]}
            scrollEnabled={tabsAttachedToTop}>
            <GrammarItems category={'DIE'} />
          </ScrollView>
        );
      case 'das':
        return (
          <ScrollView
            ref={refDas}
            style={[sharedStyles.scene]}
            scrollEnabled={tabsAttachedToTop}>
            <GrammarItems category={'DAS'} />
          </ScrollView>
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

export default observer(GrammarTabs);
