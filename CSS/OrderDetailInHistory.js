import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    title: {
        color: '#FF9052',
        fontSize: 20,
        textAlign: 'left',
        //marginTop: '2%',
        marginBottom: 0
    },

    subTitle: {
        color: '#FF9052',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '2%',
        marginBottom: 0,
        textAlign: 'left',
    },

    userContainer: {
        height: Dimensions.get('window').width*0.35,
        marginTop: '5%',
        marginHorizontal:'3.5%',
    },

    orderContainer: {
        height:'10%',
        marginTop: '5%',
        marginHorizontal:'3.5%',
    },

    infoContainer:{
        flexDirection: 'column',
        marginTop:'2%'
    },

    content:{
        fontSize: 18,
        textAlign: 'right'
    },

    image:{
        marginTop: '8%',
        marginBottom: '8%',
        left: '10%',
        width: Dimensions.get('window').width*0.25,
        height: Dimensions.get('window').width*0.25,
        borderRadius: Dimensions.get('window').width*0.125 
    },

    horizontalRule:{
        borderBottomColor: '#FF9052',
        borderBottomWidth: 2,
        marginVertical: '2%'
    }
});
