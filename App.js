import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import {Start} from './components/Start.js';
import {Main} from './components/Main.js';
import {SideBar} from './components/SideBar.js';
import {Customization} from './components/Customization.js';
import {MenuView} from './components/MenuView.js';
import {SubMenuView} from './components/SubMenuView.js';

import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { Root } from "native-base";

export default class App extends React.Component {


  render() {
    return (
      // <View style={styles.container}>
      //   <Image
      //     style={styles.logo}
      //     source={require('./resources/wei_logo.png')}
      //   />
      //   <Text style={styles.name}>
      //     CaffeineMated
      //   </Text>
      // </View>
      <Root>
        <RootStack />
      </Root>
    );
  }
}

const Drawer = DrawerNavigator(
  {
    main: { screen: Main },
    login: {screen: Login},
    start: {screen: Start},
    customization: {screen: Customization},
    subMenuView: {screen: SubMenuView},
    menu: {screen: MenuView},
  },
  {

    //modify here to change the inital screen

    initialRouteName: "main",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const RootStack = StackNavigator(
  {
    start:{
      screen: Start,
    },
    login: {
      screen: Login,
    },
    signup: {
      screen: Signup,
    },
    main: {
      screen: Main,
    },
    sidebar: {
      screen: SideBar,
    },
    drawer: {
      screen: Drawer,
    },
    customization: {
      screen: Customization,
    },
    subMenuView: {
      screen: SubMenuView
    },
    menu: {
      screen: MenuView
    },
  },
  {
    initialRouteName: 'menu',
    headerMode: 'none',
  }
);
