import { StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  nameIconContainer: {
    backgroundColor: COLOR_CODE.COMPLEMENTARY,
    borderRadius: 5,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: COLOR_CODE.PRIMARY,
    fontSize: 18,
  },
  detailsContainer: {
    gap: 2,
  },
  userName: {
    fontSize: 15,
    color: COLOR_CODE.BLACK,
  },
  userRole: {
    fontSize: 13,
    color: COLOR_CODE.GRAY_1,
  },
});

export default styles;
