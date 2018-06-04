import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const deviceWidthScale = 0.80;
const deviceHeightScale = 0.07;

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
    paddingVertical: "1%"
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
    justifyContent: 'center',
  },
  banner: {
    height: '5%',
    alignItems: 'center',
  },
  buttons_menu: {
    backgroundColor: '#FFFFFF',
    //flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth*deviceWidthScale,
    borderWidth: 2,
    height:deviceHeight*deviceHeightScale,
    borderColor: '#c8c8c8'
  },
  buttons_submit: {
    backgroundColor: '#ff9052',
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceHeight*deviceHeightScale,
    borderColor: '#ff9052',
    alignSelf: 'center',
  },
  buttons_accept: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceHeight*deviceHeightScale,
    borderColor: '#c8c8c8',
    top: 60,
  },
  buttons_cancel: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: deviceWidth*deviceWidthScale,
    padding: 5,
    borderWidth: 2,
    height: deviceHeight*deviceHeightScale,
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
    height: deviceWidth*0.12,
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
  buttonItem: {
    marginTop: '4%',
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
    height: deviceHeight*deviceHeightScale,
    borderColor: '#f8f8f8',
    width: deviceWidth*deviceWidthScale,
    marginBottom: '3%'
  },
  textInput_menu: {
    height: deviceHeight*deviceHeightScale,
    borderColor: '#f8f8f8',
    width: deviceWidth*deviceWidthScale,
    marginBottom: '6%'
  },
  textInput_price: {
    height: deviceHeight*deviceHeightScale,
    borderColor: '#f8f8f8',
    width: deviceWidth*deviceWidthScale,
    marginBottom: '1%'
  },
  orderItem:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: '#c8c8c8',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 6,
    width: deviceWidth*deviceWidthScale,
    height: deviceHeight*0.45
  },

  orderDetailText:{
    alignSelf: 'center',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    marginTop: '2%',
    //marginBottom: '2%',
    width: '100%'
  },
  orderText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ff9052',
    marginBottom: '2%',
  },
  submitText:{
    color: '#ffffff',
    fontSize: 24,
  },
  Whenbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceHeight*deviceHeightScale,
    width: deviceWidth*deviceWidthScale
  },
  Wherebutton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#c8c8c8',
    height: deviceHeight*deviceHeightScale,
    width: deviceWidth*deviceWidthScale
  },
  placeAutocomplete: {
    top: deviceHeight * 0.1,
  },
  Whenwheretext: {
    color: '#ff9052',
    fontSize: 22,
  },
  priceText: {
    marginTop: '2%',
    color: '#ff9052',
    fontSize: 18,
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
    marginLeft: '4%',
    alignSelf: 'center',
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
  },
  placeCancelText: {
    fontSize: 16,
  },
  placeCancelButton: {
    borderWidth: 2,
    borderColor: '#c8c8c8',
    backgroundColor: '#c8c8c8',
  },
  itemList : {
    justifyContent : 'center',
    alignItems : 'center'
  },
  listItems : {
    alignSelf : 'center',
    alignItems : 'center',
    width: '100%',
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 2,
    justifyContent: 'center',
    width : deviceWidth*deviceWidthScale
  },
  itemImage : {
    marginTop: 8,
    marginBottom: 8,
    left: 10
  },
  normalCell: {
    backgroundColor: "#ffffff",
  },
  selectedCell: {
    backgroundColor: "#ff9052"
  },
  list: {
    height: deviceHeight*0.50,
  }
});
