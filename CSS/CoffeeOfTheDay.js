import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    //height: '100%',
    //width: '100%',
    // alignItems: 'center',
    alignContent: 'center',
    //flexDirection: 'column',
    //padding: '30%'
    flex: 1
  },


  titleRow: {
    height: '10%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },

  titleTex: {
    fontSize: 21,
    //textAlign: 'center',
    alignSelf: 'center'
  },

  imageRow: {
    height: '50%',
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  itemImage:{
    width:Dimensions.get('window').width*0.28,
    height: Dimensions.get('window').width*0.28,
    borderRadius: Dimensions.get('window').width*0.14,
  },

  itemName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10
  }
});
