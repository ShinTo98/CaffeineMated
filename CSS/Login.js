import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  white_banner: {
    flex: 0.15,
    backgroundColor: '#ffffff',
  },
  banner: {
    flex: 2,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#47525e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //fontSize: 30,
    width: 250,
    padding: 5,
    top: 40,
  },
  textSection: {
    flex: 2,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  textInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 2,
    width: 250,

  },
  textView: {
    top: 45,
    alignItems: 'center',
  },
  labelText: {
    color: '#8190A5',
    fontSize: 13,
    paddingLeft: 8,
  },
  subText: {
    color: '#8190A5',
    fontSize: 12,
  },
  titleText: {
    fontSize: 35,
    fontWeight: '300',
    color: 'white',
    top: 55,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
