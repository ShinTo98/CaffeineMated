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
} from 'native-base';
import {
  Picker,
} from 'react-native';
import {styles} from '../CSS/Settings.js';

export class Settings extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultMode: "buyer"
    };
  }

  render() {
    return (
      <Container style={styles.color_theme}>
        <Header hasSegment="hasSegment">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('main')}>
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
                <Text>Change Default Mode</Text>
              </ListItem>
              <ListItem onPress={() => this.props.navigation.navigate('feedback')}>
                <Text>Feedback</Text>
              </ListItem>
              <ListItem>
                <Text>About</Text>
              </ListItem>
            </List>

          </Container>
        <Footer>
          <FooterTab>
            <Button full style={styles.signOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default Settings;
