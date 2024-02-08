import { StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  navigatorContainer: {
    marginLeft: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  navigatorIcon: {
    backgroundColor: COLOR_CODE.PRIMARY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  navigatorArrow: {
    height: 20,
    width: 20,
    tintColor: COLOR_CODE.BACKGROUND_COLOR,
    objectFit: 'contain',
  },
  navigatorText: {
    color: COLOR_CODE.PRIMARY,
    fontSize: 13,
  },
});

export default styles;
