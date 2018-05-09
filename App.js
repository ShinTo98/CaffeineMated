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
import {Settings} from './components/Settings.js'


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
        <PrimaryNav />
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


const Drawer = DrawerNavigator(
  {
<<<<<<< HEAD
    main: { screen: Main },
    login: {screen: Login},
    start: {screen: Start},
    settings: {screen: Settings}
=======
    main: {screen: Main},
    menu: { screen: SubMenuView },
    customization: {screen: Customization},

>>>>>>> eec5ef2794173c9789d2b996287d4c29c485d632
    //menu: {screen: MenuView},
  },
  {
    initialRouteName: 'main',

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
    menu: {
      screen: MenuView
    },
    settings: {
      screen: Settings
    }
  },
  {
<<<<<<< HEAD
    initialRouteName: 'settings',
=======
    initialRouteName: 'drawer',
>>>>>>> eec5ef2794173c9789d2b996287d4c29c485d632
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const PrimaryNav = StackNavigator({
  start: {
    screen: LoginScreen,
  },
  main: {
    screen: RootStack,
  }
},
  {
    initialRouteName: 'start',
    headerMode: 'none',
    transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false
    }
  }

)
