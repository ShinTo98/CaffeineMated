import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  login_form: {
    width: '80%',
    top: 380,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  white_banner: {
    flex: 0.15,
    backgroundColor: '#ffffff',
  },
  banner: {
    flex: 1.8,
    backgroundColor: '#ff9052',
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: '#47525e',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 280,
    padding: 5,
    top: 420,
    left: 50,
  },
  textSection: {
    //flex: 3,
    //backgroundColor: '#E3E3E3',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  textInput: {
    height: 40,
    color: 'gray',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: 250,
    top: 80,
  },
  textView: {
    top: 135,
    alignItems: 'center',
  },
  subText: {
    color: 'gray',
    fontSize: 12,
  },
  titleText: {
    fontSize: 35,
    fontWeight: '300',
    color: 'white',
    top: 55,
  },
  logo: {
    width: 100,
    height: 100,
    top: 70,
  },
});
