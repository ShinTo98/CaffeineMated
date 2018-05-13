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
import {userSignup, displayMenu, viewPendingOrders} from '../database.js'
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
} from 'native-base';

export class MenuView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'Menu',
      items: [],
    };

    // Bind login related functions
    this.getMenu = this.getMenu.bind(this);
  }

  async getMenu() {
    var drinks = await displayMenu();
    this.setState({items: drinks});
  }

  async componentDidMount() {
    await this.getMenu();
  }

  render () {
    var result = this.state.items;
    return(
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='search' style={styles.search}/>
            </Button>
          </Right>
        </Header>

        <Container style={styles.menu_container}>
          <Text style={styles.menu}>{this.state.menu}</Text>
          <View style={styles.coffeeNameUnderline} />
        </Container>

        <Container style={styles.back}>

        <Container style={styles.box}>
          {
          result.map(function(item, i){
            return(
              <Container>
                <TouchableWithoutFeedback onPress={() => {
                  this.props.navigation.navigate('submenu', {
                    type: item[1],
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{uri: item[0]}}
                  />
                  <Text style={styles.text}>{item[1]}</Text>
                </TouchableWithoutFeedback>
              </Container>
            );
          })
        }



        </Container>
        </Container>
      </Container>
    );
  }
}
export default MenuView;
