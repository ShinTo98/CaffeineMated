import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({

  container: {
    height: Dimensions.get('window').height*0.5,
    width: Dimensions.get('window').width*0.5,
    // alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },

  titleRow: {
    height: Dimensions.get('window').height*0.1,
    alignItems: 'center'
  },

  imageRow: {
    height: Dimensions.get('window').height*0.1,
    alignItems: 'center'
  },

  itemImage:{
    width:Dimensions.get('window').width*0.32,
    height: Dimensions.get('window').width*0.32,
    borderRadius: Dimensions.get('window').width*0.16,
  },

  btn: {
    marginTop: -80
  }
});
