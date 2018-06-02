import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    title: {
        color: '#FF9052',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '2%',
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

    headerContainer: {
        flex: 0.5,
        marginTop: '5%',
        justifyContent: 'center',
    },

    userContainer: {
        flex: 1,
        height:'10%',
        marginTop: '5%',
        marginHorizontal:'3.5%',
    },

    orderContainer: {
        flex: 4,
        height:'10%',
        marginTop: '5%',
        marginHorizontal:'3.5%',
    },

    infoContainer:{
        flexDirection: 'column',
        marginTop:'1%',
    },

    content:{
        fontSize: 18,
        textAlign: 'right',
    },

    image:{
        marginTop: '8%',
        marginBottom: '8%',
        left: '10%'
    }
});
