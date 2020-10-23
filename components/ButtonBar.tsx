import React from 'react';
import {StyleSheet, View} from 'react-native';

function ButtonBar({
  children,
  flexDirection = 'row',
}: {
  children: React.ReactNode;
  flexDirection?: any;
}) {
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 10,
      paddingBottom: 0,
      backgroundColor: 'white',
      flexDirection: flexDirection,
      overflow: 'hidden',
    },
  });

  return <View style={styles.wrapper}>{children}</View>;
}

export default ButtonBar;
