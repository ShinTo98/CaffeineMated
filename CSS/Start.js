import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9052',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height
  },
  name: {
    fontSize: 40,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  buttons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'white',
    //fontSize: 30,
    width: 150,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  bottom:{
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //alignSelf: 'flex-end'
  },
  button_text: {
    color: '#ffffff',
  }
});
