import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import React from 'react';
import styles from './HomeScreen.styles';
import { COLOR_CODE } from 'src/types/enums';
import Navigator from '@components/Navigator/Navigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/RootNavigator';
import STRINGS from 'src/types/strings';
import Imagelinks from 'src/assets/images';

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR_CODE.BACKGROUND_COLOR} />

      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Navigator imageSource={Imagelinks.arrowLeft} text={STRINGS.MAIN} onPress={() => navigation.goBack()} navigatorContainerStyle={styles.navigatorStyle} />

        <Text style={styles.homeScreenText}>{STRINGS.HOME_SCREEN}</Text>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
