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
      title: "",
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

      sizes: [], //testing purposes


      //TODO hard code for now

    };

    this.populateSizeArray = this.populateSizeArray.bind(this);
    this.populateSizeButtons = this.populateSizeButtons.bind(this);
    this._onPressSingleSize = this._onPressSingleSize.bind(this);
    this.populateIEClines = this.populateIEClines.bind(this);
    this.populateIECbuttons = this.populateIECbuttons.bind(this);
  }


  async componentWillMount() {
    await this.populateSizeArray();
  }


  //populate the sizes array in this.state according to database price array
  async populateSizeArray() {

    var coffeeID = this.props.navigation.getParam('id');
    var coffeeType = this.props.navigation.getParam('type');
    var coffeeObj = await displayItem(coffeeType, coffeeID);


    var priceArr = coffeeObj.price;

    this.setState({title: coffeeObj.name});

    let sArr = [];

    for (s in priceArr) {
      sArr.push({tag: s, status: false});
    }

    sArr[0].status = true;

    this.setState({sizes: sArr});
  }


  //populate the sizes buttons in on the screen according to sizes array in
  // this.state
  populateSizeButtons() {

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


  //functions when pressing size button
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


  //function to populate the ice/expresso/cream/sugar lines by lines
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


  //function to populate a single ice/expresso/cream/sugar
  populateIECbuttons(asp, aspectIndex) {

    var choices = asp.choices;

    var enableNoChoice = false;

    if (asp.aspect === "shot") {
      enableNoChoice = true;
    }
    let thisLine = [];

    thisLine.push(
      <Button
        disabled
        bordered
        key={'-1'}
        style={styles.aspectFakeText}>
        <Text style={styles.button_text}>{asp.aspect}</Text>
      </Button>
    );

    for (let i = 0; i < choices.length; i++) {
      var k = choices[i].tag + asp.aspect;
      thisLine.push(
        <Button bordered
                style={this.state.personalize[aspectIndex].choices[i].status ?
                  styles.selectedButtonStyle : styles.buttonStyle}
                key={k}
                onPress={() => this._onPressSinglePersonalize(aspectIndex, i, enableNoChoice)}>
          <Text style={this.state.personalize[aspectIndex].choices[i].status ?
            styles.selected_button_text : styles.button_text}>{choices[i].tag}</Text>
        </Button>
      );

    }

    return thisLine;
  }


  //functions when pressing ice/shots/cream/sugar button
  _onPressSinglePersonalize(ind1, ind2, bool) {
    var pArr = this.state.personalize;

    if (pArr[ind1].choices[ind2].status === true && bool) {
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


  //functions when pressing submit button, pass data to the next page
  _onPressSubmit() {
    let result = [];

    for (let i = 0; i < this.state.sizes.length; i++) {
      if (this.state.sizes[i].status === true) {
        result.push(this.state.sizes[i].tag)
      }
    }

    let item = [];

    for (let i = 0; i < this.state.personalize.length; i++) {
      for (let j = 0; j < this.state.personalize[i].choices.length; j++) {
        if (this.state.personalize[i].choices[j].status === true) {
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
          {this.populateSizeButtons()}
        </Container>

        <Container style={styles.iecContainer}>
          {this.populateIEClines()}


          <Container style={styles.customizationTextboxContainer}>


            <Form style={{top: 5}}>
              <Item regular style={styles.textInput}>
                <Input
                  style={styles.input_text}
                  placeholder='Other customization...'
                  placeholderStyle={styles.input_text}
                  onChangeText={(text) => this.setState({customize: text})}
                />
              </Item>
            </Form>

          </Container>
        </Container> /* end iecContainer */


        <Container style={styles.submitButtonContainer}>
          <Button
            bordered
            style={styles.comfirmButton}
            onPress={() => this._onPressSubmit()}>
            <Text style={styles.button_text}>Confirm</Text>
          </Button>
        </Container>

      </Container>    /* biggest container */
    );

  }
}
