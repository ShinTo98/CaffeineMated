import React, {Component} from 'react';
//import {
//  Button,
//  StyleSheet,
//  View,
//  Text,
//  Image,
//  TextInput,
//  KeyboardAvoidingView,
//  TouchableWithoutFeedback
//} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View } from 'native-base';
import {styles} from '../CSS/Main.js';

export class Main extends Component {

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
        <Header hasSegment>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>

            //TODO: fix tint color 
            <Segment style={styles.segment}>
              <Button

                active={this.state.seg === 1 ? true : false}
                first
                onPress={() => this.setState({ seg: 1 })}
              >
                <Text>Buyer</Text>
              </Button>
              <Button
                last
                active={this.state.seg === 2 ? true : false}
                onPress={() => this.setState({ seg: 2 })}
              >
                <Text>Carrier</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content padder>
          {this.state.seg === 1 && 
            
            <Container style = {styles.Container}>
            <View style= {styles.banner}>
            <Item regular style={styles.textInput}>
              <Input placeholder='Where...' style={styles.subText} onChangeText={(text) => this.setState({where: text})}
              />
              <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="clock" />
              </Button>
            </Item >
            <View style={styles.buttonItem}>
            <Button
              style={styles.buttons_menu}
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}
            > <Text style={styles.menuText}> Menu </Text>
            </Button>
            </View>

            <Item regular style={styles.orderItem}>

              <Label style = {styles.orderTitle}>
                Orders
              </Label>
              
            </Item>

            <View style={styles.buttonItem}>
            <Button
              style={styles.buttons_submit}
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}
            > <Text style={styles.menuText}> Submit </Text>
            </Button>
            </View>

            </View>
            
            </Container>
          }

          {
            this.state.seg === 2 && <Container style = {styles.Container}>
            <View style= {styles.banner}>
            <Item regular style={styles.textInput}>
              <Input placeholder='Where...' style={styles.subText} onChangeText={(text) => this.setState({where: text})}
              />
              <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="clock" />
              </Button>
            </Item >
            

            <Item regular style={styles.requestItem}>

              <Label style = {styles.orderTitle}>
                Requests
              </Label>
              
            </Item>

            <View style={styles.buttonItem}>
            <Button
              style={styles.buttons_accept}
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}
            > <Text style={styles.menuText}> Accept </Text>
            </Button>
            </View>

            </View>
            
            </Container>
          }

        </Content>
      </Container>
    );
  }
}
export default Main;
