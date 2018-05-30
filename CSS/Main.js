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
    backgroundColor: '#f8f8f8',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text_on:{
    color: '#ffffff',
  },
  text_off:{
    color: '#ffffff',
  },
  header: {
    top: 8,
  },
  button_header_on: {
    borderColor: '#ff9052',
    backgroundColor: '#ff9052',

  },
  button_header_off: {
    borderColor: '#d8d8d8',
    backgroundColor: '#d8d8d8',
  },
  icon: {
    color: '#ff9052',
  },
  white_banner: {
    height: '5%',
    backgroundColor: '#ffffff',
  },
  banner: {
    height: '5%',
    alignItems: 'center',
  },
  buttons_top: {
    //activeColor: '#FF9052',
  },
  buttons_menu: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 300,
    padding: 5,
    borderWidth: 2,
    height:50,
    borderColor: '#c8c8c8',
  },
  buttons_submit: {
    backgroundColor: '#ff9052',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 300,
    padding: 5,
    borderWidth: 2,
    height:45,
    borderColor: '#ff9052',
    top: 60,
    alignSelf: 'center',
  },
  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 300,
    padding: 5,
    borderWidth: 2,
    height:45,
    borderColor: '#c8c8c8',
    top: 60,
  },
  buttons_cancel: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 300,
    padding: 5,
    borderWidth: 2,
    height:45,
    borderColor: '#c8c8c8',
    top: 70,
  },
  buttons_confirm: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    //fontSize: 30,
    width: 5*deviceWidth/6,

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
    top: 50,
  },
  acceptButtonItem: {
    top: 20,
  },
  updateButtonItem:{
    top: deviceHeight/30,
  },
  textSection: {
    height: '30%',
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 60,
    //color: 'gray',
    borderColor: '#f8f8f8',
    //borderWidth: 2,
    width: 300,
    top: 30,
  },
  orderItem:{
    //alignItems: 'flex-start',
    //justifyContent: 'center',
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    width: 300,
    top: 80,
    height: 200,
  },

  requestTitleItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: 300,
    top: 40,
    height: 40,
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,

  },
  DiliverTitleItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 5*deviceWidth/6,
    top: deviceHeight/15,
    height: deviceHeight/20,
  },
  DiliverItem: {
    alignItems: 'flex-start',
    borderColor: 'gray',
    flexDirection: 'row',
    borderWidth: 1,
    width: 5*deviceWidth/6,
    top: deviceHeight/15,
    height: 5.5 * deviceHeight/11,
  },
  DiliverProcess: {
    alignItems: 'flex-start',
    borderColor: 'gray',
    flexDirection: 'row',
    borderWidth: 1,
    width: 5*deviceWidth/6,
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
  requestView:{
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c8c8c8',
    borderWidth: 2,
    width: 300,
    top: 50,
    height: 375,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  requestList:{
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    width: 290,
    backgroundColor: '#FFFFFF',
  },
  requestItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: '#c8c8c8',
    width: 300,
    height: 375,
    left: -10,
    borderWidth: 0,
    borderColor: 'transparent'
  },

  textView: {
    top: 110,
    alignItems: 'center',
  },
  menuText:{
    color: '#ff9052',
    fontSize: 24,
  },
  cancelText:{
    color: 'red',
    fontSize: 24,
  },
  orderDetailText:{
    color: '#ff9052',
    fontSize: 24,
    marginTop: 8,
    marginLeft: 72,
  },
  submitText:{
    color: '#ffffff',
    fontSize: 24,
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
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  list_left_container: {
    height: '5%',
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 35
  },
  list_body_container: {
    height: '50%',
  },
  list_text: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  floatView: {
    height: '50%',
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
    color: '#a8a8a8',
    fontSize: 18.2,
    marginTop: 10,
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
    width: 5*deviceWidth/6,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: deviceWidth/80,
  },
  Whenbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: '85%',
    width: '100%',
  },
  Wherebutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: '85%',
    width: '100%',
  },
  placeAutocomplete: {
    top: 50,
  },
  Whenwheretext: {
    color: '#ff9052',
    fontSize: 22,
  },
  line: {
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    width: 260,
    marginTop: 6,
    marginLeft: 20,
  },
  cardLine: {
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    width: 5*deviceWidth/6,
    marginTop: 6,
    marginLeft: 20,
  },
  // For each card in order details
  orderCard: {
    //height: 30,
    //width: 90,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
  },
  cardTextView:{
    right: 7,
    justifyContent: 'center',
  },
  cardPrimaryText: {
    textAlign: 'right',
    fontSize: 14,
    alignSelf: 'flex-end'
  },
  cardSecondaryText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    alignSelf: 'flex-end'
  },
  bodyCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cardBuyerName: {
    fontSize: 24,
  }
});
