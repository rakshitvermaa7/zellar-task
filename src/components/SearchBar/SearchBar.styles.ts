import { Platform, StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_CODE.GRAY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  searchInput: {
    padding: Platform.OS === 'android' ? 0 : 6,
    flex: 1,
    marginRight: 5,
  },
  image: {
    height: 20,
    width: 20,
    tintColor: COLOR_CODE.GRAY_1,
  },
});

export default styles;
