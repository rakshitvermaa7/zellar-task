import { Image, ImageSourcePropType, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import styles from './Navigator.styles';

type Props = {
  imageSource: ImageSourcePropType;
  text: string;
  onPress: () => void;
  navigatorContainerStyle?: StyleProp<ViewStyle>;
};

const Navigator = ({ imageSource, text, onPress, navigatorContainerStyle }: Props) => {
  return (
    <TouchableOpacity style={[styles.navigatorContainer, navigatorContainerStyle]} onPress={onPress}>
      <View style={styles.navigatorIcon}>
        <Image source={imageSource} style={styles.navigatorArrow} />
      </View>

      <Text style={styles.navigatorText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Navigator;
