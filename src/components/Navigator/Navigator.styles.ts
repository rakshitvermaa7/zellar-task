import { StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  navigatorContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  navigatorIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigatorArrow: {
    height: 20,
    width: 20,
    tintColor: COLOR_CODE.PRIMARY,
    objectFit: 'contain',
  },
  navigatorText: {
    color: COLOR_CODE.PRIMARY,
    fontSize: 13,
  },
});

export default styles;
