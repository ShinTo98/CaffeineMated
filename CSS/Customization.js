import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    containerTopBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-between',

    },
    name: {
        fontSize: 40,
        color: '#FF9052',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
    buttons: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderRadius:1,
        borderWidth: 1,
        borderColor: 'transparent',
        //fontSize: 30,
        width: 300,
        padding: 0,
        marginLeft: 10,
        marginRight: 15,
    },
    bottom:{
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        //alignSelf: 'flex-end'
    },
    button_text: {
        color: '#ffffff',
    }
});
