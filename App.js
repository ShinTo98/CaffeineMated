import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import {Start} from './components/Start.js';
import {Main} from './components/Main.js';
import {MenuView} from './components/MenuView.js';
import {SubMenuView} from './components/SubMenuView.js';
import {SideBar} from './components/SideBar.js';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { Root } from "native-base";
import {Customization} from "./components/Customization";

export default class App extends React.Component {


  render() {
    return (
      // <Root>
      //   <RootStack />
      // </Root>
      <SubMenuView />
    );
  }
}

const Drawer = DrawerNavigator(
  {
    main: { screen: Main },
    login: {screen: Login},
    start: {screen: Start},
  },
  {

    //modify here to change the inital screen

    initialRouteName: "start",
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
    customization: {
      screen: Customization,
    },
    sidebar: {
      screen: SideBar,
    },
    drawer: {
      screen: Drawer,
    },
  },

  {
    initialRouteName: 'drawer',
    headerMode: 'none',
  }
);
