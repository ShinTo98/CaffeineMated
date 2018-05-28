import React, {Component} from 'react';
import { Image } from "react-native";

import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, List, ListItem, Badge } from 'native-base';
import {styles} from '../CSS/SideBar.js';
import { StackActions, NavigationActions } from 'react-navigation';

//const drawerCover = require("../resources/newlogo.png");
//const drawerImage = require("../resources/newlogo.png");

//TDDO: find icon names

const datas = [
  {
    name: "View history",
    route: "menu",
    icon: 'menu',
  },
  {
    name: "Payment",
    route: "customization",
    icon: 'card',
  },
  {
    name: "Profile",
    route: "profile",
    icon: 'menu',
  },
  /*
  {
    name: "Help",
    route: "help",
    icon: 'help-circle',
  },
  {
    name: "Report",
    route: "report",
    icon: 'menu',
  },
*/
  {
    name: "Settings",
    route: "settings",
    icon: 'menu',
  },

];

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  settings() {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'settings' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <Content
          scrollEnabled={false}
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image
              style={styles.drawerCover}
              //source={require('../resources/wei_logo.png')}
          />
          <Image
              style={styles.drawerImage}
              source={require('../resources/batman.jpg')}
          />


          <List
            scrollEnabled={false}
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          {/*
          <List>
            <ListItem button
            noBorder
            onPress={() => this.settings()}>
            <Left>
              <Icon
                active
                name='menu'
                style={{ color: "#777", fontSize: 26, width: 30 }}
              />
              <Text style={styles.text}>
                Settings
              </Text>
            </Left>
            </ListItem>
          </List>
          */}
        </Content>
      </Container>
    );
  }
}

export default SideBar;
