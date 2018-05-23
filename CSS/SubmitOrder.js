import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container:{
    borderColor: 'gray',
    borderWidth: 1,
    flex: 0.7,
    width: 4*deviceWidth/5,
    alignSelf: 'center',
    top: 10,
  },
  buttons_submit: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 280,
    padding: 5,
    borderWidth: 0.5,
    height:45,
    borderColor: 'gray',
    top: 60,
    alignSelf: 'center',
  },
  menuText:{
    color: '#FF9052',
    fontSize: 30,
  },
  orderTitle:{
    color: '#FF9052',
    fontSize: 24,
    alignSelf: 'center',
  },
  progressSpinLabel: {
    fontSize: 16,
    color: '#8E8E93',
    alignSelf: 'center',
  },
  progressSpin: {
    transform: [{ scale: 0.5 }],
    alignSelf: 'flex-start',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelTextFirst: {
    fontSize: 12,
    fontWeight: '300',
    left: 5
  },
  labelContent: {
    fontSize: 18,
    left: 30
  },
  labelTextItems: {
    fontSize: 12,
    fontWeight: '300',
    left: 5,
    marginTop: 10,
  },
  orderCard: {
    height: 90,
  },
  cardTextView:{
    right: 7,
    justifyContent: 'center',
  },
  cardPrimaryText: {
    textAlign: 'right',
    fontSize: 14,
    alignSelf: 'flex-end'
  },
  cardSecondaryText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    alignSelf: 'flex-end'
  }

});
