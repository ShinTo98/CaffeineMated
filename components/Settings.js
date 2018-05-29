import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  List,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Item,
  Input,
  Form,
  Label,
  View,
  ListItem,
  ActionSheet
} from 'native-base';
//import {
  //Picker,
//} from 'react-native';
import {styles} from '../CSS/Settings.js';
import {logout, changeDefaultMode, getProfileById, getCurrentUserUID} from './../database.js';
import { StackActions, NavigationActions } from 'react-navigation';

var BUTTONS = ["Buyer", "Carrier", "Cancel"];
var CANCEL_INDEX = 2;
export class Settings extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultMode: "",
      user_id: "",
    };

    //this.logOut = this.logOut.bind(this);
  }


  async onValueChange(value: string) {
    console.log(value);
    if (value != 'Cancel') {
      this.setState({
        defaultMode: value
      },
      () => {
        // here is our callback that will be fired after state change.
        console.log(this.state.defaultMode);
        await changeDefaultMode(this.state.user_id, this.state.defaultMode);
        alert("Change Successful!");
      }
      );
    }
    //console.log(this.state.defaultMode);
  }

  async getProfile() {
    this.setState({user_id: await getCurrentUserUID()});
    this.setState({profileData: await getProfileById(this.state.user_id)});
    this.setState({
      defaultMode: this.state.profileData["default_mode"],
    })
    //console.log(this.state.profileData);
  }

  async componentDidMount() {
    await this.getProfile();
  }

  async logOut() {
    var result = await logout();
    if(result === 0) {
      alert("Log Out Successful!");
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'start' })],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      alert(result);
    }
  }

  render() {
    return (
      <Container style={styles.color_theme}>
        <Header hasSegment="hasSegment">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('main', {
               update: false,
          })}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Body>

            <Title>Settings</Title>

          </Body>
          <Right></Right>
        </Header>


          <Container>
            <List>
              <ListItem>
                <Left>
                  <Text>Current Default Mode: {this.state.defaultMode}</Text>
                </Left>

                <Right>
                  <Button
                    style={{backgroundColor: "#FF9052"}}
                    onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Option"
                      },
                      buttonIndex => {
                        this.onValueChange(BUTTONS[buttonIndex]);
                      }
                    )}
                  >
                    <Text>Edit</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem onPress={() => this.props.navigation.navigate('feedback')}>
                <Left>
                  <Text>Feedback</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>About</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </List>

          </Container>
        <Footer>
          <FooterTab>
            <Button full style={styles.signOut}
              onPress={() => this.logOut()}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default Settings;
