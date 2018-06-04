import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const deviceWidthScale = 0.80;
const deviceHeightScale = 0.08;

export const styles = StyleSheet.create({
  icon: {
    color: '#ff9052',
  },

  cardLine: {
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    width: 5*deviceWidth/6,
    marginTop: '0.5%',
    marginLeft: '5%',
    marginBottom: '3%'
  },

  Wherebutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceHeight*deviceHeightScale,
    width: deviceWidth*deviceWidthScale
    //height: deviceWidth*0.12,
    //width: deviceWidth*0.75,
  },

  cardBuyerName: {
    fontSize: 24,
  },

  card_title: {
    color: '#FF9052',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: '8%',
    
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
    marginBottom: '3%',
  },

  Whenbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceHeight*deviceHeightScale,
    width: deviceWidth*deviceWidthScale
    //height: '85%',
    //width: '100%',
  },

  Whenwheretext: {
    color: '#ff9052',
    fontSize: 22,
  },

  // requestTitleItem: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 2,
  //   width: 300,
  //   top: 40,
  //   height: 40,
  //   borderColor: '#c8c8c8',
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 6,
  //
  // },

  orderTitle:{
    color: '#FF9052',
    fontSize: 30,
    alignItems: 'center',
  },

  requestList:{

    marginLeft: '-5.3%',
    padding: 0,
    width : deviceWidth * 0.82,
    //backgroundColor: '#080808',
    //height: deviceHeight * 0.49,
    marginTop : '1%'

  },

  list_left_container: {
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 35
  },

  list_body_container: {
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
    fontSize: 24,
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
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceWidth*0.12,
    borderColor: '#c8c8c8',
    top: '3%',
  },

  normalCell: {
    backgroundColor: "#ffffff",
  },
  selectedCell: {
    backgroundColor: "#ff9052"
  },
  Wherebutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceHeight*deviceHeightScale,
    width: deviceWidth*deviceWidthScale
  },
  textInput: {
    height: deviceHeight*deviceHeightScale,
    borderColor: '#f8f8f8',
    width: deviceWidth*deviceWidthScale,
    marginBottom: '2%'
  },
  Whenwheretext: {
    color: '#ff9052',
    fontSize: 22,
  },
  requestTitleItem: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    //fontSize: 30,
    width: deviceWidth*deviceWidthScale,
    borderWidth: 2,
    height:deviceHeight*0.06,
    borderColor: '#c8c8c8',
    borderRadius: 6,
    marginBottom: '4%',
  },
  requestItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    width: deviceWidth*deviceWidthScale,
    height: deviceHeight*0.65
  },
  requestTitleText:{
    color: '#ff9052',
    fontSize: 24,
    alignSelf : 'center',
    marginTop: '1%',
  },
  requestItem:{
    alignItems: 'center',
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    width: deviceWidth*deviceWidthScale,
    height: deviceHeight*0.50,
    backgroundColor: '#FFFFFF',
    padding: 0
  },

  orderDetailTitle:{
    fontSize: 28,
    color: '#FF9052'
  },

  order_select:{
    fontSize: 18,
    alignItems: 'flex-start'

  },

  headerContainer:{
    width: 5*deviceWidth/6,
    flexWrap: 'wrap',
  },

  icons:{
    marginLeft: '15%',
    color: '#ff9052',
    width: '10%'
  }



});
