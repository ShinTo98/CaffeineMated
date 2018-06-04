const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create ({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
    backgroundColor: '#FF9052',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerImage: {
    position: "absolute",
    width: Platform.OS === "android" ? deviceWidth / 4 : deviceWidth / 3,
    height: Platform.OS === "android" ? deviceWidth / 4 : deviceWidth / 3,
    resizeMode: "cover",
    borderRadius: Platform.OS === "android" ? deviceWidth / 8 : deviceWidth / 6,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
});