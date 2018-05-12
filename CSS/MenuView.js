import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  top_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FAFAFA',
  },
  icon: {
    color: '#FF9052',
  },
  banner: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    bottom: 10,
  },
  coffeeNameUnderline: {
    borderBottomColor: '#FF9052',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //borderBottomStyle: 'dotted',
  },
  menu: {
    color: '#47525E',
    fontSize: 30,
    //top: 5,
    left: 25,
    //padding: 8,
    //borderBottomColor: '#ff9052',
    //borderBottomWidth: 1,
  },
  box: {
    margin: 5,
    width: Dimensions.get('window').width / 2, //Device width divided in almost a half
    justifyContent: 'center',
    flexDirection:'column'
  },
  new:{
    flexDirection:'row'
  },

  back: {
    flex: 10,
    flexDirection: 'row',
    height:'100%',
    width:'100%'
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    left: 10,
    top: 20,
  },
  text: {
    color: '#ff9052',
    fontSize: 20,

  },
});
