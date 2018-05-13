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
import {userSignup, displayMenu, viewPendingOrders, displayType} from '../database.js';
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
  Left,
  Right,
} from 'native-base';

export class SubMenuView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'Coffee',
      items: [],
    };

    // Bind login related functions
    this.getDrink = this.getDrink.bind(this);
  }

  async getDrink() {
    var type = this.props.navigation.getParam('type');
    var drinks = await displayType(type);
    this.setState({items: drinks});
  }

  async componentDidMount() {
    await this.getDrink();
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
                onPress={() => this.props.navigation.goBack()}
              />
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
          result.map(function(item, i) {
            return (
              <Container>
                <TouchableWithoutFeedback onPress={() =>{
                  this.props.navigation.navigate('customization', {
                    name: this.props.navigation.getParam('type'),
                    id: item.id
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{uri: item.image}}
                  />
                  <Text style={styles.text}>{item.name}</Text>
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
export default SubMenuView;
