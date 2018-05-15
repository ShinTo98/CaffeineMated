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
  List,
  ListItem,
  Left,
  Right,
  Spinner,
  Body
} from 'native-base';

export class SubMenuView extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.getParam('name'),
      items: this.props.navigation.getParam('items')
    };

    // Bind login related functions
    //this.getDrink = this.getDrink.bind(this);
  }


  render () {
    var result = this.state.type;
    console.log(result);
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

        <Container style={styles.box}>
        {/*console.log(this.state)
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
        <List>
       {
       result.map(function (data){
         return (
          <ListItem style={styles.item}>
                <Button transparent onPress={() => {
                  this.props.navigation.navigate('customization', {
                    id: data.id,
                    type: this.state.type,
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{url: data.image}}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                  </Button>
            </ListItem>
       )})}
       }
       </List>

        }*/}
        </Container>
      </Container>
    );
  }
}
export default SubMenuView;