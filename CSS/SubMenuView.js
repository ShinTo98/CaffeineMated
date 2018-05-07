import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  top_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  banner: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    bottom: 10,
  },
  menu: {
    color: '#47525E',
    fontSize: 30,
    top: 5,
    left: 25,
    //padding: 8,
    borderBottomColor: '#ff9052',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  box: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    //justifyContent: 'center',
    //alignItems: 'center',
    bottom: 75,
    width: '50%',
  },
  back: {
    flex: 10,
    flexDirection: 'row',
  },

  image: {
    width: 135,
    height: 135,
    left: 30,
    top: 40,
  },
  text: {
    color: '#ff9052',
    fontSize: 20,
    //left: 45,
    paddingTop: 5,
    paddingBottom: 10,
    top: 40,
    left: 50,
  },
});
