import React, {Component} from 'react';
import { Image } from "react-native";

import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, List, ListItem, Badge, View } from 'native-base';
import {styles} from '../CSS/SideBar.js';
import { StackActions, NavigationActions } from 'react-navigation';
import {getCurrentUserUID, getProfileById} from '../database.js'

/*
 * Filename: Sidebar.js
 * Version: 0.1.0
 * Description: This component will display drawer which provide a navagation to
 *               profile, history and settings.
 */

const datas = [
  {
    name: "View history",
    route: "viewHis",
    icon: 'bookmarks',
  },

  {
    name: "Profile",
    route: "profile",
    icon: 'person',
  },

  {
    name: "Settings",
    route: "settings",
    icon: 'settings',
  },

];

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
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

  async componentWillMount() {
    user_id = await getCurrentUserUID();
    profile = await getProfileById(user_id);
    this.setState({image: profile.photo});
  }

  render() {
    return (
      <Container>
        <Content
          scrollEnabled={false}
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View style={styles.drawerCover}>

          <Image
              style={styles.drawerImage}
              source={{uri: this.state.image}}
          />
          </View>

          {/* ------------------------- button list --------------------------- */}

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
        </Content>
      </Container>
    );
  }
}

export default SideBar;
