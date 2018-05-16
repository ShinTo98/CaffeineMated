import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Title,
  Item,
  Input,
  View,
  StyleSheet,
  Form,
  Textarea
} from 'native-base';
import {styles} from "../CSS/Customization.js";
import {displayItem} from "../database";


export class Customization extends Component {

  static navigationOptions = {
    header: null
  };


  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.navigation.getParam('itemId')
    };


  }

  async componentWillMount(){
    var currenItem = await displayItem("Hot Coffees", "HC01");
    var datas = [];
    for( let data in currenItem){
       datas.push(currenItem[data]);
    }
    console.log(currenItem);
    console.log(datas);

    var prices = [];
    for( let price in datas[3]){
      prices.push(price);
    }
    this.setState({itemName: datas[2], size:prices, discription: datas[0], img: datas[1]});
  }




  render() {

    var result = this.state.item;
    //console.log("What are you at this moment?" + result[0]);
    return (
      <Container style={styles.biggestContainer}>      


        <Header style={styles.header}>            
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={styles.icon_BackArrow}/>
            </Button>
          </Left>
        </Header>


        <Container
          style={styles.coffeeTitleUnderlinedContainer}> 
          <Content>
            <Text style={styles.coffeeTitle}>
              {this.state.itemName}
            </Text>
            <Text>{this.state.discription}</Text>
          </Content>
        </Container>



      </Container>    /* biggest container */
    );

  }
}
