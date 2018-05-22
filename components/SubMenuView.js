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
import {userSignup, displayMenu, viewPendingOrders, displayType, displayItem} from '../database.js';
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
    };
    // Bind login related functions
    this.getType = this.getType.bind(this);
    this.testdisplayItem = this.testdisplayItem.bind(this);
    console.log('in constructor: ' + this.state.items);
  }
  async getType(){
    //console.log(e);
    var test = await displayType(this.state.type);
    console.log(test);
    this.setState({items: test});
    console.log(this.state.items);
  }

  async componentWillMount(){
    await this.getType();
  }

  async testdisplayItem(e,d){
    let test = await displayItem(e,d);
    return test;
}

  render () {
    var result = this.state.items;
    //console.log("this is result in items: " + result);
    return(

      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                name='arrow-back'
                style={styles.icon }
                onPress={() => this.props.navigation.navigate('menu')}
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
            result.map((type, key) =>
            <Col key={key} style={{ width:'50%', alignItems: 'center'}}>
              <Row>
              <TouchableWithoutFeedback onPress ={ () => {
                this.props.navigation.navigate('customization', {
                   itemType: this.state.type,
                   itemId: type[1],
                   data: this.state.data,
                 })}}>
                 <Image style={styles.image} source={{uri: type[0]}}/>
              </TouchableWithoutFeedback>
              </Row>
              <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('customization', {
                   itemType: this.state.type,
                   itemId: type[1],
                   data: this.state.data,
              })}}>
                <Text style={styles.text}>{type[2]}</Text>
              </TouchableWithoutFeedback>
              </Row>
            </Col>
            )
          }
          </Grid>
        </ScrollView>
        </Container>
      </Container>
    );
  }
}
export default SubMenuView;
