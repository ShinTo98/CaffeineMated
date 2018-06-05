import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({

  container: {
    marginTop: '2%',
    //height: '100%',
    //width: '100%',
    // alignItems: 'center',
    alignContent: 'center',
    //flexDirection: 'column',
    //padding: '30%'
    flex: 1
  },


  titleRow: {
    marginTop: '-10%',
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
    marginTop: '-16%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  itemImage:{
    width:Dimensions.get('window').width*0.28,
    height: Dimensions.get('window').width*0.28,
    borderRadius: Dimensions.get('window').width*0.14,
  },

  lineRow: {
    height: '5%',
    marginTop: '-25%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  line:{
    borderBottomColor: '#FF9052',
    borderBottomWidth: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '70%',
    marginBottom: '5%'
  },

  nameRow: {
    marginTop: '5%',
    height: '10%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },

  itemName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10
  }
});