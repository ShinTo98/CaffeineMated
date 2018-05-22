import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  content: {
    marginLeft: '5%',
    marginRight: '5%',
  },

  header: {
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0,
  },
  icon: {
    color: '#FF9052',
  },
  search: {
    color: '#8190a5',
  },
  coffeeNameUnderline: {
    borderBottomColor: '#FF9052',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '10%',
    marginBottom: '5%'
  },
  menu: {
    color: '#47525E',
    fontSize: 30,
    //left: '5%',
  },
  box: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    //alignItems: 'center',
    //width: '100%',
    height: '100%',
  },


  image: {
    width: Dimensions.get('window').width*0.36,
    height: Dimensions.get('window').width*0.36,
    top: '3%',
    borderRadius: Dimensions.get('window').width*0.18,
    /*borderWidth: 2,
    borderColor:'#000',*/

    //shadowColor:'#000',
    //shadowOffset:{width:0,height:142},
    //shadowOpacity:0.8,
    //shadowRadius:2,

  },
  list: {
    //bottom: 140,
  },
  item: {
    //width: '100%',
    height: 150,
    //alignItems: 'center',
  },
  text: {
    color: '#ff9052',
    fontSize: 18,
    paddingTop: '2%',
    top: '2%',
    marginBottom:'2%'
  },
});
