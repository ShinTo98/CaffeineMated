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
import {OrderCompleted} from './components/OrderCompleted.js';
import {TestPage} from './components/TestPage.js';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { Root } from "native-base";
import {BuyerMain} from './components/BuyerMain.js';
import {CarrierMain} from './components/CarrierMain.js';
import { PlaceChoose } from './components/PlaceChoose.js';
import { ViewHis } from './components/ViewHis.js';
import { SubmitOrder } from './components/SubmitOrder.js';
import {About} from './components/About.js';

import { OrderDetailInHistory} from './components/OrderDetailInHistory.js';
console.disableYellowBox = true;

export default class App extends React.Component {


  render() {
    return (

      <Root>
        <PrimaryNav />
      </Root>
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
    disableOpenGesture: true,
    initialRouteName: 'start',
    headerMode: 'none',
  }
);

const SettingsStack = StackNavigator(
  {

    settings: {
      screen: Settings,
    },
    feedback: {
      screen: Feedback,
    },
    about: {
      screen: About,
    },
    start: {
      screen: LoginScreen,
    }
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
    buyermain: {screen: BuyerMain},
    carrierMain: {screen: CarrierMain},
    placeChoose: {screen: PlaceChoose},
    submitOrder: {screen: SubmitOrder},
    viewHis: {screen: ViewHis},
    orderDetailInHistory: {screen: OrderDetailInHistory}
    //menu: {screen: MenuView},
  },
  {
    initialRouteName: 'main',

    navigationOptions: {
      disableOpenGesture: true,
      drawerLockMode: 'locked-closed',
    },

    //modify here to change the inital screen

    contentComponent: props => <SideBar {...props} />
  }
);

const PrimaryNav = StackNavigator({
  start: {
    screen: LoginScreen,
  },
  main: {
    screen: Drawer,
  },
  testPage: {
    screen: TestPage,
  }
},
  {
    initialRouteName: 'start',
    headerMode: 'none',
    transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: 'red',
    }
  }
);

// temp
const HistoryNav = StackNavigator({
        viewHis: {
            screen: ViewHis,
        },

        orderDetailInHistory: {
            screen: OrderDetailInHistory,
        }
    },
    {
        initialRouteName: 'viewHis',
        headerMode: 'none',

    }
)
