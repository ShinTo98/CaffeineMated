import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from '../CSS/SubMenuView.js';
import {userSignup, displayMenu, viewPendingOrders} from '../database.js'
import { Container, Header, Content, Button, Toast, Text, Form, Item, Input, Label, Icon } from 'native-base';

export class SubMenuView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'Coffee',
      c1: 'Americano',
      c2: 'Mocha',
      c3: 'Latte',
      c4: 'Cappuccino',
      c5: 'Macchiato',
      c6: 'Espresso',
    };
  }

  render () {
    return(
      <Container style={styles.container}>
        <Container style={styles.top_bar}>
          <Button iconLeft light>
            <Icon name='arrow-back' />
          </Button>

          <Item>
               <Icon name="ios-search" />
          </Item>

        </Container>

        <Container style={styles.banner}>
          <Text style={styles.menu}>{this.state.menu}</Text>
        </Container>

        <Container style={styles.back}>

          <Container style={styles.box}>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c1}</Text>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c3}</Text>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c5}</Text>
          </Container>
          <Container style={styles.box}>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c2}</Text>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c4}</Text>
          <Image
            style={styles.image}
            source={require('../resources/logo.png')}
          />
          <Text style={styles.text}>{this.state.c6}</Text>
          </Container>
        </Container>
      </Container>
    );
  }
}
export default SubMenuView;
