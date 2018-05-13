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
import {userSignup, displayMenu, viewPendingOrders} from '../database.js';
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
} from 'native-base';

export class MenuView extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      menu: 'Menu',
      items: [],
    };

    // Bind login related functions
   // this.getMenu = this.getMenu.bind(this);
  }

  async getMenu() {
    this.setState({items: await displayMenu()});
  }

  async componentWillMount() {
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

        <Container style={styles.box}>
        {/*
          result.map(function(item, i){
            return(
              <Container>
                <TouchableWithoutFeedback onPress={() => {
                  this.props.navigation.navigate('submenu', {
                    type: item[1][1],
                  });
                }}>
                <container>
                  <Image
                    style={styles.image}
                    source={{url: item[0]}}
                  />
                  <Text style={styles.text}>{item[1]}</Text>
                  </container>
                </TouchableWithoutFeedback>
              </Container>
            );
          })
       */}

       <List
       style={styles.list}
       dataArray={this.state.items}
       renderRow={data =>
          <ListItem style={styles.item}>
                <Button transparent onPress={() => {
                  this.props.navigation.navigate('submenu', {
                    type: data[1],
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{url: data[0]}}
                  />
                  <Text style={styles.text}>{data[1]}</Text>
                  </Button>
            </ListItem>
       }
       />
        </Container>
      </Container>
    );
  }
}
export default MenuView;
