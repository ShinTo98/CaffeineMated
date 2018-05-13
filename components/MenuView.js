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
  }

  async getMenu() {
    var drinks = displayMenu();
    this.setState({items: drinks});
  }

  render () {
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

        <Container style={styles.box}
          items_array = {this.state.items}
          items_array.map(function() {
            return (
              <Image
                style={styles.image}
                source={require('../resources/logo.png')}
              />
              <Text style={styles.text}>{this.state.cold_coffee}</Text>
            )
          })
        />

          <Container style={styles.box}>

            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.cold_coffee}</Text>
            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.hot_coffee}</Text>
            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.frappuccino}</Text>
            </Container>
            <Container style={styles.box}>
            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.cold_tea}</Text>
            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.hot_tea}</Text>
            <Image
              style={styles.image}
              source={require('../resources/logo.png')}
            />
            <Text style={styles.text}>{this.state.drinks}</Text>
          </Container>
        </Container>
      </Container>
    );
  }
}
export default MenuView;
