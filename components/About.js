/*
  Filename: About.js
  Version: 0.1.0
  Description: A page that contains basic information about the app
*/
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
  ListItem
} from 'native-base';
import {
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from '../CSS/Settings.js';

export class About extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      seg: 1,
      where: ""
    };
  }

  render() {
    return (
      <Container style={styles.color_theme}>
        <Header hasSegment="hasSegment">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Body>

            <Title>About</Title>

          </Body>
          <Right></Right>
        </Header>

        <Content >
          <Container>

            <Text style={{alignSelf: 'center'}}>Made by team ReCaf, CSE110 Spring 2018</Text>

          </Container>
        </Content>
        <Footer>
        </Footer>

      </Container>
    );
  }
}
export default About;
