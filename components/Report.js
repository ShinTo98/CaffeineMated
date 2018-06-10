/*
  Filename: Report.js
  Version: 0.1.0
  Description: This page contains a form that allows users to submit report
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
import {saveReport} from './../database.js';


export class Report extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      seg: 1,
      where: "",
      report: "",
    };
  }

  async submitReport() {
    if (this.state.report === '') {
      alert('Report can not be empty.')
    }
    else {
      alert("We have received your report, we will get to it ASAP");
      await saveReport(this.state.report)
      await this.setState({report: ''})
    }
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

            <Title>Report</Title>

          </Body>
          <Right></Right>
        </Header>

        {/*Text box for users to enter report*/}

        <Content >
          <Container>

            <Item regular style={styles.textBox}>
              <Input style={styles.textInput}
                multiline = {true}
                placeholder='Please include the name of the user and detail of the misconduct.'
                onChangeText={(input) => this.setState({report: input})}
                value = {this.state.report}
                />
            </Item>

          </Container>
        </Content>

        {/*Submit button*/}
        <Footer>
          <FooterTab>
            <Button full style={styles.signOut}
            onPress= {() => this.submitReport()}>
              <Text style={styles.signOutText}>Submit Report</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
export default Report;
