import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';

const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  wordImage: {
    flex: 1,
    height: initialLayout.height / 3.5,
    width: initialLayout.height / 3.5,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'lightgrey',
  },
});

export function WordImage({imageUrl}: {imageUrl: string}) {
  const [isLoading, setIsLoading] = useState(true);
  console.log({isLoading});

  useEffect(() => {
    setIsLoading(true);
  }, [imageUrl]);
  return (
    <View style={styles.wrapper}>
      {isLoading && (
        <View style={styles.placeholder}>
          <ActivityIndicator color="lightgrey" size={100} />
        </View>
      )}
      <Image
        style={styles.wordImage}
        source={{uri: imageUrl}}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
}
