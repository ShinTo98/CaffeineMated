import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  page:{
      backgroundColor: '#FAFAFA'
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


  content: {
    marginLeft: '5%',
    marginRight: '5%',
  },

  itemName:{
    color: '#47525E',
    fontSize: 30,
  },

  imageCol:{
    width: Dimensions.get('window').width*0.4,
    margin:0,
    padding: 0
  },

  discriptionCol:{
    width: Dimensions.get('window').width*0.6,
    marginLeft: '-8%',
    padding: 0
  },


  itemImage:{
    width:Dimensions.get('window').width*0.32,
    height: Dimensions.get('window').width*0.32,
    borderRadius: Dimensions.get('window').width*0.16,
    marginBottom: '4%'
  },


  grid:{
    flexWrap: 'wrap',
  },

  discription:{
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: 'Hiragino Sans',
  },

  line:{
    borderBottomColor: '#FF9052',
    borderBottomWidth: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '10%',
    marginBottom: '5%'
  },

  subHeadersCol:{
    width: Dimensions.get('window').width * 0.15,
    alignItems: 'center'
  },

  subHeaders:{
    fontSize: 20,
    color: '#47525E',
  },

  buttonCol:{
     width: Dimensions.get('window').width * 0.10,
     marginRight: '1%'
  },

  buttonChoices:{
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: '#FF9052',
    width: '100%',
    //borderRadius: 0,
    alignItems: 'center',
  },

  buttonChoiceSelect:{
    backgroundColor: '#FF9052',
    width: '100%',
    //borderRadius: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },

  scrollView:{
    //marginBottom: '10%'
  },

  padding:{
    height: Dimensions.get('window').height * 0.08
  },

  buttonText:{
   color: '#47525E',
   fontSize: 16,
   width: '150%',
   alignSelf: 'center'
  },

  buttonTextSelect:{
    color: '#FAFAFA',
    fontSize: 16,
    width: '150%',
  },

  submitButton:{
    backgroundColor: '#FF9052',
    //borderWidth: 0.5,
    //borderColor: '#FF9052',
    //width: Dimensions.get('window').width,
    //borderRadius: 0,
    alignItems: 'center',
    //flexDirection: 'row',
    //height: '8%',
  },

  submitText:{
    color: '#FAFAFA',
    fontSize: 20,
    //marginLeft: '36%',
    //alignSelf
    //marginTop: '2%',
    //height: "100%",
    padding: '4%'
  },

  choicesContainer:{
    height: '100%'
  },


  row:{
    alignItems: 'center',
    marginBottom: '2%',
  },

  textInput: {
    height: Dimensions.get('window').height * 0.25,
    backgroundColor: '#FAFAFA',
    borderColor: '#FF9052',
    borderWidth: 1.5,
    width: '100%',
    marginBottom: '3%',
    fontSize: 18,
    color: '#8190A5',

  },



});
