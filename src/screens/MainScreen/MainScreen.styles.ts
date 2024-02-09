import { StyleSheet } from 'react-native';
import { COLOR_CODE } from 'src/types/enums';

const styles = StyleSheet.create({
  headerTitle: {
    color: COLOR_CODE.PRIMARY,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR_CODE.BACKGROUND_COLOR,
    padding: 20,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    color: COLOR_CODE.BLACK,
    fontWeight: '500',
  },
  userTypeCard: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  userTypeText: {
    color: COLOR_CODE.BLACK,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  divider: {
    marginTop: 20,
  },
  noResults: {
    fontSize: 15,
    color: COLOR_CODE.PRIMARY,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    marginBottom: 30,
  },
});

export default styles;
