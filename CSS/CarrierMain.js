import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const deviceWidthScale = 0.80;
const deviceHeightScale = 0.07;

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
    height: '30%',
    width: '100%',

    alignItems: 'center',
    alignSelf:'center',
    //fontSize: 30,
    width: 5*deviceWidth/6,

    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: '#FF9052',
  },

  menuTextConfrim:{
    color: '#FFFFFF',
    fontSize: 16,
    padding: '20%',
    alignSelf: 'center'
  },

  banner: {
    height: '5%',
    alignItems: 'center',
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
    justifyContent : 'center',
    alignItems : 'center',
    //marginLeft: '-2%',
    //height: deviceHeight * 0.40
    //marginLeft: '-5.3%',
    //padding: 0,
    //width : deviceWidth * 0.82,
    //backgroundColor: '#080808',
    //height: deviceHeight * 0.49,
    //marginTop : '1%'

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
    marginTop: '6%',
  },

  buttons_accept: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceHeight*deviceHeightScale,
    borderColor: '#ff9052',
    alignSelf: 'center',
  },
  buttons_accept_disabled: {
    //backgroundColor: 'transparent',
    //flexDirection: 'row',
    //justifyContent: 'center',
    //fontSize: 30,
    //width: deviceWidth*0.75,
    //padding: 5,
    //borderWidth: 2,
    //height: deviceWidth*0.12,
    //borderColor: '#c8c8c8',
    //top: 60,
    backgroundColor: '#',
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceHeight*deviceHeightScale,
    borderColor: '#d8d8d8',
    backgroundColor: '#d8d8d8',
    alignSelf: 'center',
  },

 menuText:{
   color: '#000000',
   marginBottom: '50%'

 },

 menuTextSelected:{
   color: '#ff9052',
   fontSize: 20,
 },


  menuText_disabled:{
    color: 'gray',
    fontSize: 20,
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

  normalCell: {
    alignSelf : 'center',
    alignItems : 'center',
    width: '100%',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    justifyContent: 'center',
    width : deviceWidth*deviceWidthScale,
    //backgroundColor: "#ffffff",
  },
  selectedCell: {
    alignSelf : 'center',
    alignItems : 'center',
    width: '100%',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    justifyContent: 'center',
    width : deviceWidth*deviceWidthScale,
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
    marginBottom: '3%'
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
  requestTitleText:{
    //color: '#ff9052',
    //fontSize: 24,
    //alignSelf : 'center',
    //marginTop: '1%',
    alignSelf: 'center',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    marginTop: '2%',
    //marginBottom: '2%',
    width: '100%'
  },
  requestText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ff9052',
    marginBottom: '2%',
  },
  requestItem:{
    //marginTop: '3%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    //alignItems: 'center',
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    width: deviceWidth*deviceWidthScale,
    height: deviceHeight*0.56,
    backgroundColor: '#FFFFFF',
    //padding: 0
  },
  itemImage : {
    marginTop: 8,
    marginBottom: 8,
    left: 10
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
  list: {
    height: deviceHeight*0.50,
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
  },

  container:{
    borderColor: '#c8c8c8',
    borderWidth: 2,
    borderRadius: 6,
    flex: 0.7,
    width: 4*deviceWidth/5,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  progressBarView:{
    borderColor: '#c8c8c8',
    borderWidth: 2,
    borderRadius: 6,
    flex: 0.08,
    width: 4*deviceWidth/5,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  progressText: {
    fontSize: 12,
    fontWeight: '300',
    alignSelf: 'center',
    //marginTop: 10,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 150/2,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#D8D8D8'
  },
  circleFilled: {
    width: 16,
    height: 16,
    borderRadius: 150/2,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#FF9052'
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: 20,
    marginBottom: 8,
  },
  carrierView: {
    flexDirection: 'row',
    marginTop: 10
  },
  carrierText: {
    flex: 0.65
  },
  carrierPic: {
    flex: 0.35,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  carrierStars: {
    justifyContent: 'center',
    flexDirection: 'row'
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
    marginTop: 10,
    alignSelf: 'center',
  },
  carrierTitle:{
    color: '#FF9052',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 5
  },

  orderTitle:{
    color: '#FF9052',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 20,
  },
  progressSpinLabel: {
    fontSize: 16,
    color: '#8E8E93',
    alignSelf: 'center',
  },
  progressSpin: {
    transform: [{ scale: 0.5 }],
    alignSelf: 'flex-start',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelTextFirst: {
    fontSize: 12,
    fontWeight: '300',
    left: 5
  },
  labelContent: {
    fontSize: 18,
    left: 30
  },
  labelTextItems: {
    fontSize: 12,
    fontWeight: '300',
    left: 5,
    marginTop: 10,
  },
  orderCard: {
    height: '30%',
    width: 6*deviceWidth/7,
    marginLeft: '5.5%'
  },
  cardTextView:{
    right: 7,
    justifyContent: 'center',
  },
  cardPrimaryText: {
    alignSelf: 'flex-start',
    textAlign: 'right',
    fontSize: 14,
  },
  cardSecondaryText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    alignSelf: 'flex-end'
  },


  cardColLeft: {
    alignItems: 'center',
    width: '12%'
  },

  windowsContainer:{
    height: deviceHeight,
  },
  bottom:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    //alignSelf: 'flex-end'
  },

  bigContainer:{
    marginTop: '-10%',
    height: deviceHeight
  },

   footerStyle:{
    height: deviceHeight * 0.12, 
    width: '100%', 
    marginBottom: deviceHeight * 0.1 
   },

   confirmButton:{
    flex: 1,
    backgroundColor:'#FF9052', 
    justifyContent:'center', 
    alignItems:'center'
  }
}
)
