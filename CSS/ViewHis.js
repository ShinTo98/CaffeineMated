import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    color_theme: {
        backgroundColor: '#FAFAFA',
    },
    icon: {
        color: '#FF9052',
    },
    leftBox: {
        marginLeft: '3%',
        flex: 1, 
    }, 
    rightBox: {
        flex: 1
    },
    leftView: {
        justifyContent: 'center', 
        alignItems: 'center' 
    }, 
    leftText: {
        width: Dimensions.get('window').width * 0.45,
        fontWeight: '100', 
        marginLeft: '3%', 
        marginTop: '4%'
    }, 
    leftText2: { 
        width: Dimensions.get('window').width * 0.45,
        fontSize: 15, 
        marginLeft: '3%', 
        marginTop: '4%'
    }, 
    rightText: { 
        width: Dimensions.get('window').width * 0.3, 
        fontWeight: '100', 
        marginRight: "-2%"
    }, 

}); 