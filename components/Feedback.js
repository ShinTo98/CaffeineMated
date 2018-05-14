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

export class Feedback extends Component {

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

            <Title>Feedback</Title>

          </Body>
          <Right></Right>
        </Header>

        <Content >
          <Container>

            <Item regular style={styles.textBox}>
              <Input style={styles.textInput}
                multiline = {true} placeholder='Enter your Feedback...' />
            </Item>
            <Button block style={styles.signOut}>
              <Text style={styles.signOutText}>Submit Feedback</Text>
            </Button>

          </Container>
        </Content>
        <Footer>
          <FooterTab>

          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
export default Feedback;
