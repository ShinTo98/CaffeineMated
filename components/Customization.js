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
import {userLogin, userSignup, displayItem} from "../database";


/* Class of Buttons */
class SizeButtons extends Component {
  loopingFunction() {
    const fields = [];
    for (let i = 0; i < this.props.size.length; i++) {
      fields.push(
        <Button bordered disabled={this.props.hasSize ? true : false}
                style={styles.buttonStyle}>
          <Text style={styles.button_text}>{this.props.size[i]}</Text>
        </Button>
      );
    }
    return fields;
  }

  async populatesizeButtons() {

    var coffeeObj = await displayItem("Cold Coffees", "CC01");


    console.log(coffeeObj);
    return coffeeObj;
    }

  render() {
    var coffeeObj = this.populatesizeButtons();
    let sizeButtons = [];

    for (let cat in coffeeObj.price) {
      // for each different type, get the value
      sizeButtons.push(
        <Button bordered style={styles.buttonStyle}>
          <Text style={styles.button_text}>{cat}</Text>
        </Button>
      );
    }

    return sizeButtons;
  }
}


class IECButtons extends Component {
  loopingFunction() {
    const fields = [];

    for (let key in this.props.choices) {
      fields.push(
        <Button bordered style={styles.buttonStyle} key={this.props.choices[key]}>
          <Text style={styles.button_text}>{this.props.choices[key]}</Text>
        </Button>
      );
    }

    return fields;
  }


  render() {
    return (
      <Container style={styles.iecSubContainer}>
        <Text style={styles.button_text}>{this.props.item}</Text>
        {this.loopingFunction()}
      </Container>

    );
  }
}


export class Customization extends Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    this.state = {
      icedState: [
        {regularIced: false},
        {lightIced: false},
        {noIced: false}
      ],
      shotState: [{shot1: false}, {shot2: false}, {shot3: false}],
      creamState: [{withCream: false}, {withoutCream: true}],
      sugarState: [{regularSugar: true}, {lightSugar: false}, {overSugar: false}],
      sizeState: [{Short: false}, {Tall: false}, {Grande: true}, {Venti: false}, {Tentra: false}],
      //TODO hard code for now
      customize: "...",

      sizeCate: [],


    };


  }



  render() {
    this.state.sizeCate.forEach(key => {
      console.log(key); // returns the keys in an object
      console.log(a[key]);  // returns the appropriate value
    });

    console.log("dsfhjfd"); //TODO


    let ice = ['Regular', 'Light', 'None'];
    let shot = ['1 Shot', '2 Shots', '3 Shots'];
    let cream = ['With', 'Without'];
    let sugar = ['Regular', 'Light', 'Over'];
    let sizes = ['Short', 'Tall', 'Grande', 'Venti', 'Tentra'];

    return (
      <Container style={styles.biggestContainer}>      /* biggest container */


        <Header style={styles.header}>            /* Header */
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('subMenuView')}>
              <Icon name='arrow-back' style={styles.icon_BackArrow}/>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='search' style={styles.icon_Search}/>
            </Button>
          </Right>
        </Header>


        <Container
          style={styles.coffeeTitleUnderlinedContainer}> /* Coffee Title */
          <Content>
            <Text style={styles.coffeeTitle}>
              Mocha
            </Text>
          </Content>
        </Container>


        <Container style={styles.coffeeSizeContainer}>  /* Coffee Size */
          <SizeButtons size={sizes}/>
        </Container>

        <Container style={styles.iecContainer}>
          <IECButtons item='Ice' choices={ice}/>
          <IECButtons item='Espresso' choices={shot}/>
          <IECButtons item='Cream' choices={cream}/>
          <IECButtons item='Sugar' choices={sugar}/>


          <Container style={styles.customizationTextboxContainer}>


            <Form style={{top: 5}}>
              <Item regular style={styles.textInput}>
                <Input onChangeText={(text) => this.setState({customize: text})}
                />
              </Item>
            </Form>

          </Container>
        </Container> /* end iecContainer */


        <Container style={styles.submitButtonContainer}>
          <Button bordered style={styles.comfirmButton}>
            <Text style={styles.button_text}>Confirm</Text>
          </Button>
        </Container>

      </Container>    /* biggest container */

    );

  }
}
