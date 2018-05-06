import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  coffeeTitle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    marginLeft: 30,
    marginRight: 30,

  },
  bgColor: {
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FAFAFA',
  },
  icon: {
    color: '#FF9052',
  },
  coffeeName: {
    fontSize: 30,
  },
  coffeeNameUnderline: {
    borderBottomColor: '#FF9052',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //borderBottomStyle: 'dotted',
  },
  coffeeSizeContainer: {
    marginLeft: 30,
    marginRight: 30,

    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  IECcontainer: {
    marginLeft: 30,
    marginRight: 30,

    flex: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  buttons: {
    backgroundColor: 'transparent',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    //fontSize: 30,
    width: 300,
    padding: 0,
    marginLeft: 10,
    marginRight: 15,
  },

  buttonStyle: {
    margin: 3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius:1,
    borderWidth: 1,
    //borderColor: '#FF9052',
    width: 80,
    height: 40,
  },


  confirmButtom: {
    margin: 3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth: 1,
    //borderColor: '#FF9052',
    width: 80,
    height: 40,
  },

  button_text: {
    color: '#FF9052',
    fontSize: 20,
  }
});
