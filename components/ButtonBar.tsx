import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function ButtonBar({
  children,
  text = '',
}: {
  children: React.ReactNode;
  text?: string;
}) {
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: 'plum',
      padding: 20,

      flexDirection: 'column',
    },
    wrapperInner: {
      flexDirection: 'row',
      overflow: 'hidden',
      justifyContent: 'space-between',
    },
    modalText: {
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.wrapper}>
      {text !== '' && <Text style={styles.modalText}>{text}</Text>}
      <View style={styles.wrapperInner}>{children}</View>
    </View>
  );
}

export default ButtonBar;
