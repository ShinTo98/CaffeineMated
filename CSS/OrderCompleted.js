import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({

    popupBox: {
      backgroundColor: '#FAFAFA', 
      flex: 4, 
      borderRadius: 10, 
      height: Dimensions.get('window').height*0.7, 
      width: Dimensions.get('window').width * 0.86, 
      marginRight: '7%', 
      marginLeft: '7%', 
      marginTop: '15%'
    }, 

    title: {
        color: '#FF9052', 
        fontSize: 20, 
        textAlign: 'center', 
        marginTop: '2%', 
        marginBottom: 0
    }, 

    titleContainer: {
        flex: 2, 
        marginTop: '5%', 
    }, 

    avatarContainer: {
        flex: 3, 
        marginTop: '10%'
    }, 

    avatar: {
        width: Dimensions.get('window').width*0.4, 
        height: Dimensions.get('window').width*0.4, 
        borderRadius: Dimensions.get('window').width*0.2, 
        alignSelf: 'center'
    }, 

    userID: {
        textAlign: 'center', 
        fontSize: 25, 
        color: '#47525E'
    }, 

    starsContainer: {
        flex: 2, 
        width: '60%', 
        marginTop: '25%', 
        marginLeft: '20%', 
        marginRight: '20%'
    }, 

    buttonContainer: {
        flex: 2, 
        justifyContent: 'center'
    }, 

    buttons_submit: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        //fontSize: 30,
        width: 260,
        borderWidth: 1.2,
        height:50,
        borderColor: '#8190A5', 
        borderRadius: 10, 
        marginLeft: 30, 
        marginRight: 30
        
    },

    buttonText: {
        color: '#FF9052', 
        fontSize: 22
    }
  
  });
  