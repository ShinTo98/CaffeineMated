import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  icon: {
    color: '#ff9052',
  },

  cardLine: {
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    width: 5*deviceWidth/6,
    marginTop: 6,
    marginLeft: 20,
  },

  Wherebutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceWidth*0.12,
    width: deviceWidth*0.75,
  },

  cardBuyerName: {
    fontSize: 24,
  },

  card_title: {
    color: '#FF9052',
    fontSize: 20,
  },

  cardLine: {
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    width: 5*deviceWidth/6,
    marginTop: 6,
    marginLeft: 20,
  },

  row_card_item: {
    flexDirection: 'row',
  },

  buttons_confirm: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    //fontSize: 30,
    width: 5*deviceWidth/6,

    borderWidth: 0.5,
    height: deviceWidth*0.12,
    borderColor: 'gray',
  },

  menuText:{
    color: '#ff9052',
    fontSize: 24,
  },

  banner: {
    height: '5%',
    alignItems: 'center',
  },

  textInput: {
    height: deviceWidth*0.15,
    //color: 'gray',
    borderColor: '#f8f8f8',
    //borderWidth: 2,
    width: deviceWidth*0.75,
  },

  Whenbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: '85%',
    width: '100%',
  },

  Whenwheretext: {
    color: '#ff9052',
    fontSize: 22,
  },

  Whenbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: '85%',
    width: '100%',
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

  orderTitle:{
    color: '#FF9052',
    fontSize: 30,
    alignItems: 'center',
  },

  requestList:{
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    width: 290,
    backgroundColor: '#FFFFFF',
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

  acceptButtonItem: {
    top: 20,
  },

  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*0.75,
    padding: 5,
    borderWidth: 2,
    height: deviceWidth*0.12,
    borderColor: '#c8c8c8',
    top: 60,
  },

  menuText:{
    color: '#ff9052',
    fontSize: 24,
  },

  menuText_disabled:{
    color: 'gray',
    fontSize: 30,
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

  DeliverStarts: {
    top: deviceWidth/15,
    left: deviceWidth/25,
    flexDirection: 'row',
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

  updateButtonItem:{
    top: deviceHeight/30,
  },

  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*0.75,
    padding: 5,
    borderWidth: 2,
    height: deviceWidth*0.12,
    borderColor: '#c8c8c8',
    top: 60,
  },

  buttons_cancel: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*0.75,
    padding: 5,
    borderWidth: 2,
    height: deviceWidth*0.12,
    borderColor: '#c8c8c8',
    top: 70,
  },

  cancelText:{
    color: 'red',
    fontSize: 24,
  },

  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*0.75,
    padding: 5,
    borderWidth: 2,
    height: deviceWidth*0.12,
    borderColor: '#c8c8c8',
    top: 60,
  },

  normalCell: {
    backgroundColor: "#ffffff",
  },
  selectedCell: {
    backgroundColor: "#ff9052"
  }



});
