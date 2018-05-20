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
import {
  userSignup,
  displayMenu,
  viewPendingOrders,
  displayType
} from '../database.js';
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

<<<<<<< HEAD
  async getType(e) {
    console.log(e);
=======
  async getType(e){
    //console.log(e);
>>>>>>> 574e4bc5f171e16f39e0c204ffdd6db3a96e8ac3
    var test = await displayType(e);
    console.log(test);
    return test;
  }

  async componentWillMount() {
    await this.getMenu();
  }

  render() {
    var result = this.state.items;
<<<<<<< HEAD
    return (
=======
    console.log("this is result in items: " + result);
    return(
>>>>>>> 574e4bc5f171e16f39e0c204ffdd6db3a96e8ac3
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>


        </Header>

        <Container style={styles.content}>
          <Text style={styles.menu}>{this.state.menu}</Text>
<<<<<<< HEAD
          <View style={styles.coffeeNameUnderline}/>
        </Container>
=======
          <View style={styles.coffeeNameUnderline} />
>>>>>>> 574e4bc5f171e16f39e0c204ffdd6db3a96e8ac3

        <ScrollView showsVerticalScrollIndicator={false}>
          <Grid style={{flexWrap: 'wrap'}}>
<<<<<<< HEAD
            {
              result.map((type, key) =>
                <Col key={key} style={{
                  height: '35%',
                  width: '50%',
                  alignItems: "center"
                }}>
                  <Row>
                    <TouchableWithoutFeedback onPress={() => {
                      this.props.navigation.navigate('subMenuView', {

                        name: type[1],
                        items: this.getType(type[1])

                      })
                    }}>
                      <Image style={styles.image}
                             source={{uri: type[0]}}/>

                    </TouchableWithoutFeedback>
                  </Row>
                  <Row>
                    <TouchableWithoutFeedback onPress={() => {
                      this.props.navigation.navigate('subMenuView', {
                        name: type[1],
                        items: this.getType(type[1])
                      })
                    }}>
                      <Text style={styles.text}>{type[1]}</Text>
                    </TouchableWithoutFeedback>
                  </Row>
                </Col>
              )

            }
          </Grid>
=======
        {
           result.map((type, key) =>
             <Col key={key} style={{height:'35%', width:'50%', alignItems: "center"}}>
             <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('subMenuView', {

                    name: type[1],
                    items: this.getType(type[1])

                  })}}>
                <Image style={styles.image}
                        source={{uri: type[0]}} />

              </TouchableWithoutFeedback>
              </Row>
              <Row>
              <TouchableWithoutFeedback onPress={ ()=> {
                this.props.navigation.navigate('subMenuView', {
                   name: type[1],
                   items: this.getType(type[1])
              })}}>
                <Text style={styles.text}>{type[1]}</Text>
              </TouchableWithoutFeedback>
              </Row>
            </Col>

          )

        }
        </Grid>
>>>>>>> 574e4bc5f171e16f39e0c204ffdd6db3a96e8ac3
        </ScrollView>
        </Container>
      </Container>
    );
  }
}
<<<<<<< HEAD

export default MenuView;
=======
export default MenuView;
>>>>>>> 574e4bc5f171e16f39e0c204ffdd6db3a96e8ac3
