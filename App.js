import React from 'react';
import {StyleSheet, Text, Animated, Easing, View, Image} from 'react-native';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import {Start} from './components/Start.js';
import {Main} from './components/Main.js';
import {SideBar} from './components/SideBar.js';
import {Customization} from './components/Customization.js';
import {MenuView} from './components/MenuView.js';
import {SubMenuView} from './components/SubMenuView.js';
import {Settings} from './components/Settings.js';
import {Profile} from './components/Profile.js';
import {Feedback} from './components/Feedback.js';


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
      //<Root>
      // <PrimaryNav />
      <ZmqPageTest />
      //</Root>
    );
  }
}

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const SettingsStack = StackNavigator(
  {

    settings: {
      screen: Settings,
    },
    feedback: {
      screen: Feedback,
    },
  },
  {

    initialRouteName: 'settings',
    headerMode: 'none',
  }
);


const Drawer = DrawerNavigator(
  {
    main: {screen: Main},
    menu: { screen: MenuView },
    submenu: { screen: SubMenuView },
    customization: {screen: Customization},
    settings: {screen: SettingsStack},
    profile: {screen: Profile},

    //menu: {screen: MenuView},
  },
  {
    initialRouteName: 'main',

    navigationOptions: {
      headerTintColor: 'red',
    },

    //modify here to change the inital screen

    contentComponent: props => <SideBar {...props} />
  }
);

const LoginScreen = StackNavigator(
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
  },
  {
    initialRouteName: 'start',
    headerMode: 'none',
  }
)

const RootStack = StackNavigator(
  {

    main: {
      screen: Main,
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

    initialRouteName: 'drawer',
    headerMode: 'none',
    //transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: 'red',
    }
  }
);

const ZmqPageTest = StackNavigator(
  {
    main: {
      screen: Main,
    },
    start:{
      screen: Start,
    },
    login: {
      screen: Login,
    },
    signup: {
      screen: Signup,
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
    drawer: {
      screen: Drawer,
    },
  },
  {
    initialRouteName: 'customization',
    headerMode: 'none',
  }
)


const PrimaryNav = StackNavigator({
  start: {
    screen: LoginScreen,
  },
  root: {
    screen: RootStack,
  }
},
  {
    initialRouteName: 'root',
    headerMode: 'none',
    transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: 'red',
    }
  }

)
