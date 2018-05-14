import {StyleSheet, Dimensions} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  menu_container: {
    flex: 0.075,
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
  },
  menu: {
    color: '#47525E',
    fontSize: 30,
    //left: '5%',
  },
  box: {
<<<<<<< HEAD
    margin: 5,
    width: Dimensions.get('window').width / 2, //Device width divided in almost a half
    justifyContent: 'center',
    flexDirection:'column'
  },
  new:{
    flexDirection:'row'
=======
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    //alignItems: 'center',
    //width: '100%',
    height: '100%',
>>>>>>> master
  },

  back: {
    flex: 12,
    flexDirection: 'row',
    height:'100%',
    width:'100%'
  },

  image: {
    width: 140,
    height: 140,
<<<<<<< HEAD
    borderRadius: 70,
    left: 10,
    top: 20,
=======
    top: 40,
    borderRadius: 70,
    // transform: [
    // {scaleX: 1}
    // ]
  },
  list: {
    //bottom: 140,
  },
  item: {
    //width: '100%',
    height: 150,
    //alignItems: 'center',
>>>>>>> master
  },
  text: {
    color: '#ff9052',
    fontSize: 20,
<<<<<<< HEAD

=======
    paddingTop: '2%',
    paddingBottom: '2%',
    top: 40,
>>>>>>> master
  },
});
