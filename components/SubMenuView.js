import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
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
  Form,
  Item,
  Input,
  Label,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Spinner,
  Body
} from 'native-base';

export class SubMenuView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.getParam('name'),
      items: this.props.navigation.getParam('items'),
    };
    // Bind login related functions
    //this.getItem = this.getItem.bind(this);
  }

  async componentWillMount(){
    var test = await displayType(this.state.type);
    this.setState({items:test});
  }
  async testdisplayItem(e,d){
    let test = await displayItem(e,d);
    this.setState({item:test});
    console.log(test);
    return test;
}

  render () {
    var result = this.state.items;
    console.log("this is result" + result);
    return(

      <Container style={styles.container}>

        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                name='arrow-back'
                style={styles.icon }
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
        </Header>

        <Container style={styles.menu_container}>
          <Text style={styles.menu}>{this.state.type}</Text>
          <View style={styles.coffeeNameUnderline} />
        </Container>


      </Container>
    );
  }
}
export default SubMenuView;