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


export class Customization extends Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    this.state = {
      title: "Mocha",
      customize: "...",

      personalize: [
        {
          aspect: "ice",
          choices: [
            {tag: 'Regular', status: true},
            {tag: 'Light', status: false},
            {tag: 'None', status: false}]
        },
        {
          aspect: "shot",
          choices: [
            {tag: '1 Shot', status: false},
            {tag: '2 Shots', status: false},
            {tag: '3 Shots', status: false}]
        },
        {
          aspect: "cream",
          choices: [
            {tag: 'With', status: true},
            {tag: 'Without', status: false}]
        },
        {
          aspect: "sugar",
          choices: [
            {tag: 'Regular', status: true},
            {tag: 'Light', status: false},
            {tag: 'Over', status: false}]
        },
      ],

      sizes: [
        {tag: 'Short', status: false},
        {tag: 'Tall', status: false},
        {tag: 'Grande', status: true},
        {tag: 'Venti', status: false},
        {tag: 'Tentra', status: false}],


      //TODO hard code for now

    };

    //this.populateSizeButtons = this.populateSizeButtons.bind(this);
    this.populateSizeButtonsTest = this.populateSizeButtonsTest.bind(this);
    this._onPressSingleSize = this._onPressSingleSize.bind(this);
    this.populateIEClines = this.populateIEClines.bind(this);
    this.populateIECbuttons = this.populateIECbuttons.bind(this);


  }


  async populateSizeButtons() {

    var coffeeObj = await displayItem("Cold Coffees", "CC01");

    let buttons = [];

    for (let cat in coffeeObj.price) {
      // for each different type, get the value
      buttons.push(
        <Button bordered style={styles.buttonStyle}>
          <Text style={styles.button_text}>{cat}</Text>
        </Button>
      );
    }

    console.log(sizeButtons);

    this.setState({sizeButtons: buttons});
  }

  populateSizeButtonsTest() {

    let buttons = [];

    var sizeList = this.state.sizes;

    for (let i = 0; i < sizeList.length; i++) {
      //console.log( sizeList[i].tag);
      buttons.push(
        <Button bordered style={
          this.state.sizes[i].status ? styles.selectedButtonStyle : styles.buttonStyle}
                key={sizeList[i].tag}
                onPress={() => this._onPressSingleSize(sizeList, i)}>
          <Text style={
            this.state.sizes[i].status ? styles.selected_button_text : styles.button_text}
          >{sizeList[i].tag}</Text>
        </Button>
      );
    }
    return buttons;

  }

  _onPressSingleSize(parameter, index) {
    var sizeArr = parameter;
    for (let i = 0; i < sizeArr.length; i++) {
      sizeArr[i].status = false;
    }
    sizeArr[index].status = true;
    this.setState({sizes: sizeArr});
    for (let i = 0; i < sizeArr.length; i++) {
      console.log(this.state.sizes[i].status);
    }
  }


  populateIEClines() {
    var personalization = this.state.personalize;

    let line = [];

    for (let j = 0; j < personalization.length; j++) {
      line.push(
        <Container style={styles.iecSubContainer} key={j}>
          {this.populateIECbuttons(personalization[j], j)}
        </Container>
      );
    }


    return line;

  }

  populateIECbuttons(asp, aspectIndex) {

    var choices = asp.choices;


    let thisLine = [];

    thisLine.push(
      <Button disabled bordered key={'-1'} style={styles.aspectFakeText}>
        <Text style={styles.button_text}>{asp.aspect}</Text>
      </Button>
    );

    for (let i = 0; i < choices.length; i++) {
      var k = choices[i].tag + asp.aspect;
      thisLine.push(
        <Button bordered style={this.state.personalize[aspectIndex].choices[i].status ?
          styles.selectedButtonStyle : styles.buttonStyle}
                key={k}
          onPress={() => this._onPressSinglePersonalize(aspectIndex, i)}>
          <Text style={this.state.personalize[aspectIndex].choices[i].status ?
            styles.selected_button_text : styles.button_text}>{choices[i].tag}</Text>
        </Button>
      );

    }

    return thisLine;
  }

  _onPressSinglePersonalize(ind1, ind2) {
    var pArr = this.state.personalize;

    if (pArr[ind1].choices[ind2].status === true) {
      pArr[ind1].choices[ind2].status = false;
    }
    else {
      for (let i = 0; i < pArr[ind1].choices.length; i++) {
        pArr[ind1].choices[i].status = false;
      }
      pArr[ind1].choices[ind2].status = true;
    }

    this.setState({personalize: pArr});

  }

  _onPressSubmit() {
    let result = [];

    for (let i = 0; i < this.state.sizes.length; i++) {
      if( this.state.sizes[i].status === true ) {
        result.push( this.state.sizes[i].tag )
      }
    }

    let item = [];

    for (let i = 0; i < this.state.personalize.length; i++) {
      for (let j = 0; j < this.state.personalize[i].choices.length; j++) {
        if( this.state.personalize[i].choices[j].status === true ) {
          let cuz = this.state.personalize[i].aspect;
          let amt = this.state.personalize[i].choices[j].tag;
          item.push({choice: cuz, amount: amt, other: this.state.customize});
        }
      }
    }

    this.props.navigation.navigate('main', {order: result});

  }

  render() {

    return (
      <Container style={styles.biggestContainer}>      /* biggest container */


        <Header style={styles.header}>            /* Header */
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
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
              {this.state.title}
            </Text>
          </Content>
        </Container>


        <Container style={styles.coffeeSizeContainer}>  /* Coffee Size */
          {this.populateSizeButtonsTest()}
        </Container>

        <Container style={styles.iecContainer}>
          {this.populateIEClines()}


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
          <Button
            bordered
            style={styles.comfirmButton}
            onPress={()=>this._onPressSubmit()}>
            <Text style={styles.button_text}>Confirm</Text>
          </Button>
        </Container>

      </Container>    /* biggest container */
    );

  }
}
