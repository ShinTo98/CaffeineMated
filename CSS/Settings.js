import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  color_theme: {
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  icon: {
    color: '#FF9052',
  },
  white_banner: {
    flex: 0.15,
    backgroundColor: '#ffffff',
  },
  banner: {
    flex: 1,
    alignItems: 'center',
  },
  buttons_top: {
    //activeColor: '#FF9052',
  },
  buttons_menu: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 280,
    padding: 5,
    borderWidth: 0.5,
    height:45,
    borderColor: 'gray',
  },
  buttons_submit: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 280,
    padding: 5,
    borderWidth: 0.5,
    height:45,
    borderColor: 'gray',
    top: 80,
  },
  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 280,
    padding: 5,
    borderWidth: 0.5,
    height:45,
    borderColor: 'gray',
    top: 60,
  },
  buttons: {
    backgroundColor: '#47525e',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    padding: 5,
    top: 100,

  },
  buttonItem:{
    top: 70,
  },
  textSection: {
    flex: 3,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 45,
    //color: 'gray',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: 280,
    top: 50,
  },
  orderItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    top: 90,
    height: 350,
  },
  requestItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    top: 70,
    height: 415,
  },

  textView: {
    top: 110,
    alignItems: 'center',
  },
  menuText:{
    color: '#FF9052',
    fontSize: 30,
  },
  subText: {
    color: 'gray',
    fontSize: 30,
  },
  orderTitle:{
    color: '#FF9052',
    fontSize: 30,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: '300',
    color: 'white',
    top: 55,
  },
  signOut: {
    backgroundColor: '#47525e',
  },
  signOutText: {
    color: "#ffffff",
  },
});
