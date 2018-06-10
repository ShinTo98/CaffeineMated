/*
  Filename: SubMenuView.js
  Version: 0.1.0
  Description: This page contains UI elements for the submenu page to display types.
*/

import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
  LinearLayout,
  Dimensions,
} from 'react-native';
import {styles} from '../CSS/MenuView.js';
import {userSignup, displayMenu, viewPendingOrders, displayType} from '../database.js';
import {
  Container,
  Header,
  Content,
  Button,
  Toast,
  Text,
  Left,
  Right,
  Form,
  Item,
  Input,
  Label,
  Icon,
  List,
  ListItem,
  Card,
  CardItem,
  Grid,
  Col,
  Row,
  Body
} from 'native-base';

export class SubMenuView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.getParam('name'),
      items: [],
      data: this.props.navigation.getParam('data'),
      location: this.props.navigation.getParam('location'),
      time: this.props.navigation.getParam('time'),
      saveInfo: this.props.navigation.getParam('saveInfo')
    };
    // Bind login related functions
    this.getType = this.getType.bind(this);
  }

  // Function to find all what are in each type
  async getType(){
    var test = await displayType(this.state.type);
    this.setState({items: test});
  }

  async componentWillMount(){
    await this.getType();
  }


  render () {
    var result = this.state.items;
    return(

      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                name='arrow-back'
                style={styles.icon }
                onPress={() => this.props.navigation.navigate('menu',{
                  saveInfo: this.state.saveInfo,
                  data: this.state.data
                })}
              />
            </Button>
          </Left>
        </Header>

        <Container style={styles.content}>
          <Text style={styles.menu}>{this.state.type}</Text>
          <View style={styles.coffeeNameUnderline} />


        <ScrollView showsVerticalScrollIndicator={false}>
          <Grid style={{flexWrap: 'wrap'}}>
          {
            {/* This will go through each element in the array*/}
            result.map((type, key) =>
            <Col key={key} style={{ width:'50%', alignItems: 'center'}}>

              {/* This row displays the image of the item*/}
              <Row>
              <TouchableWithoutFeedback onPress ={ () => {
                this.props.navigation.navigate('customization', {
                   itemType: this.state.type,
                   itemId: type[1],
                   data: this.state.data,
                   saveInfo: this.state.saveInfo
                 })}}>
                 <Image style={styles.image} source={{uri: type[0]}}/>
              </TouchableWithoutFeedback>
              </Row>

              {/* This row displays the name of item*/}
              <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('customization', {
                   itemType: this.state.type,
                   itemId: type[1],
                   data: this.state.data,
                   saveInfo: this.state.saveInfo
              })}}>
                <Text style={styles.text}>{type[2]}</Text>
              </TouchableWithoutFeedback>
              </Row>
            </Col>
            )
          }
          </Grid>
          <Container style={styles.filler}></Container>
        </ScrollView>
        </Container>
      </Container>
    );
  }
}
export default SubMenuView;
