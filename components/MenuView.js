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

export class MenuView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('data'),
      menu: 'Menu',
      items: [],
    };

    // Bind login related functions
    this.getMenu = this.getMenu.bind(this);
   this.getType = this.getType.bind(this);
  }

  async getMenu() {
    this.setState({items: await displayMenu()});
    console.log(this.state.items);
  }

  async getType(e){
    //console.log(e);
    var test = await displayType(e);
    console.log(test);
    return test;
  }

  async componentWillMount() {
    await this.getMenu();
  }

  render () {
    var result = this.state.items;
    console.log("this is result in items: " + result);
    return(
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('main', {
               update: false,
          })}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>


        </Header>

        <Container style={styles.content}>
          <Text style={styles.menu}>{this.state.menu}</Text>
          <View style={styles.coffeeNameUnderline} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Grid style={{flexWrap: 'wrap'}}>
        {
           result.map((type, key) =>
             <Col key={key} style={{height:'35%', width:'50%', alignItems: "center"}}>
             <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('submenu', {

                    name: type[1],
                    items: this.getType(type[1]),
                    data: this.state.data,

                  })}}>
                <Image style={styles.image}
                        source={{uri: type[0]}} />

              </TouchableWithoutFeedback>
              </Row>
              <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('submenu', {
                   name: type[1],
                   items: this.getType(type[1]),
                   data: this.state.data,
              })}}>
                <Text style={styles.text}>{type[1]}</Text>
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
export default MenuView;
