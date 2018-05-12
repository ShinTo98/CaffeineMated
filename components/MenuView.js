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
      cold_coffee: 'Cold Coffee',
      cold_tea: 'Cold Tea',
      hot_coffee: 'Hot Coffee',
      hot_tea: 'Hot Tea',
      frappuccino: 'Frappuccino',
      drinks: 'Drinks',
    };
  }

  render () {
    return(
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='search'/>
            </Button>
          </Right>
        </Header>

        <Content>
            <Text style={styles.menu}>{this.state.menu}</Text>
        </Content>

        <View style={styles.coffeeNameUnderline}>
        </View>

        <Container style={styles.back}>

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