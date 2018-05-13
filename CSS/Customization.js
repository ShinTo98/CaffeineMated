import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  biggestContainer: {
    backgroundColor: '#FAFAFA',
  },


  header: {
    backgroundColor: '#FAFAFA',
    borderBottomWidth:0,
  },
  icon_BackArrow: {
    color: '#FF9052',
  },
  icon_Search: {
    color: '#47525E',
  },


  coffeeTitleUnderlinedContainer: {
    borderBottomColor: '#FF9052',
    borderBottomWidth: 0.5,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coffeeTitle: {
    flex: 1.5,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    fontSize: 30,
    color:'#47525E',
  },


  coffeeSizeContainer: {
    marginLeft: 30,
    marginRight: 30,
    flex: 3,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },


  iecContainer: {
    marginLeft: 30,
    marginRight: 30,
    flex: 12,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  iecSubContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  customizationTextboxContainer: {
    flex: 1,

  },

  textInput: {
    height: 100,
    backgroundColor: '#FFFFFF',
    borderColor: '#8190A5',
    borderWidth: 0.5,
    width: 350,
  },


  button_text: {
    color: '#FF9052',
    fontSize: 15,
    alignSelf: 'flex-start',
  },

  buttonStyle: {
    margin: 3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius:1,
    borderWidth: 1,
    //borderColor: '#FF9052',
    alignSelf: 'flex-start',
  },

  selected_button_text: {
    color: '#FFFFFF',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  selectedButtonStyle: {
    margin: 3,
    backgroundColor: '#FF9052',
    justifyContent: 'center',
    borderRadius:1,
    borderWidth: 1,
    //borderColor: '#FF9052',
    alignSelf: 'flex-start',
  },


  submitButtonContainer: {
    marginLeft: 30,
    marginRight: 30,
    flex: 3,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  comfirmButton: {
    margin: 3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth: 1,
    //borderColor: '#FF9052',
    width: 80,
    height: 40,
  },


});
