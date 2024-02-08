import { StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR_CODE.BACKGROUND_COLOR,
    padding: 20,
  },
  navigatorStyle: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  homeScreenText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 30,
    color: COLOR_CODE.PRIMARY,
  },
});

export default styles;
