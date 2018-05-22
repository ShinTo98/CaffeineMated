import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  card_title: {
    color: '#FF9052',
    fontSize: 20,
  },
  card: {
    width: 5*deviceWidth/6,
    height: 4*deviceHeight/6,

  },
  row_card_item: {
    flexDirection: 'row',
  },
  color_theme: {
    // TODO: correct color code
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text_on:{
    color: '#ffffff',
  },
  text_off:{
    color: '#FF9052',
  },

  button_header_on: {
    borderColor: '#FF9052',
    backgroundColor: '#FF9052',

  },
  button_header_off: {
    borderColor: '#FF9052',
    backgroundColor: '#ffffff',
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
    top: 60,
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
  buttons_confirm: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    //fontSize: 30,
    width: 3*deviceWidth/4,

    borderWidth: 0.5,
    height:45,
    borderColor: 'gray',
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
    //top: deviceHeight/60,
    top: 70,
  },
  updateButtonItem:{
    top: deviceHeight/20,
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
    height: 280,
  },

  requestTitleItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    top: 70,
    height: 40,
  },
  DiliverTitleItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 3*deviceWidth/4,
    top: deviceHeight/15,
    height: deviceHeight/20,
  },
  DiliverItem: {
    alignItems: 'flex-start',
    borderColor: 'gray',
    flexDirection: 'row',
    borderWidth: 1,
    width: 3*deviceWidth/4,
    top: deviceHeight/15,
    height: 5.5 * deviceHeight/11,
  },
  DiliverProcess: {
    alignItems: 'flex-start',
    borderColor: 'gray',
    flexDirection: 'row',
    borderWidth: 1,
    width: 3*deviceWidth/4,
    top: deviceHeight/15,
    height: deviceHeight/15,
  },
  orderTitleItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    top: 90,
    height: 40,
  },
  requestItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    top: 70,
    height: 375,
  },

  textView: {
    top: 110,
    alignItems: 'center',
  },
  menuText:{
    color: '#FF9052',
    fontSize: 30,
  },
  menuText_disabled:{
    color: 'gray',
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
  logo: {
    width: 100,
    height: 100,
    top: 70,
  },
  buyerStarSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  list_left_container: {
    flex: 0.5,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 35
  },
  list_body_container: {
    flex: 2,
    alignItems: 'flex-end',
  },
  list_text: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  floatView: {
    flex: 2,
    position: 'absolute',
    width: 230,
    //height: 0,
    top: 0,
    left: 0,
    backgroundColor: '#DDDDDD',
  },
  timeButton: {
    position: 'absolute',
    top: 6,
    left: 240,
    width: 30,
  },
  nothingText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#8190A5',
    fontSize: 12,
  },
  deliverProfile: {
    top: deviceWidth/15,
    left: deviceWidth/20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  DeliverProfileText: {
    top: deviceWidth/20,
    left: deviceWidth/20,
  },
  DeliverStarts: {
    top: deviceWidth/15,
    left: deviceWidth/25,
    flexDirection: 'row',
  },

  deliverItems: {
    top: deviceWidth/8,
    left: deviceWidth/20,
    //flexDirection: 'row',

  },
  deliverItem: {
    marginBottom: deviceWidth/20,
  },
  deliverLocation: {
    justifyContent: 'flex-end',
  },
  process: {
    //alignSelf: 'flex-end',
    top: deviceWidth/30,
    width: 3*deviceWidth/4,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: deviceWidth/80,
  },


});
