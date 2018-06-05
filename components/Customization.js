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
import {
  Container,
  Header,
  Button,
  Left,
  Body,
  Right,
  Icon,
  Segment,
  Content,
  Text,
  Title,
  Item,
  Input,
  Form,
  Textarea,
  Grid,
  Col,
  Row,
  Spinner,
  FooterTab,
  Footer,
} from 'native-base';
import {styles} from "../CSS/Customization.js";
import {displayItem} from "../database";


export class Customization extends Component {



  constructor(props) {
    super(props);
    this.state = {
      itemType: this.props.navigation.getParam('itemType'),
      itemId: this.props.navigation.getParam('itemId'),
      select: ["grande", "regular", "0 shot", "regular", "regular",""],
      icewater: ["no", "light", "regular"],
      espresso: ["0 shot", "1 shot", "2 shot"],
      cream: ["no", "light", "regular"],
      syrup: ["no", "light", "regular"],
      data: this.props.navigation.getParam('data'),
      location: this.props.navigation.getParam('location'),
      time: this.props.navigation.getParam('time'),
      saveInfo: this.props.navigation.getParam('saveInfo')
      // If you want to set up more customization, add a state with all the choices and the name of this customization in the header.
        //Example:
        //topping: ["no", "light", "regular"]
    };

    this.findPrices = this.findPrices.bind(this);
    this.changeChoice = this.changeChoice.bind(this);
    this.createItemObject = this.createItemObject.bind(this);
  }

  // Helper function to find all sizes for one item
  async findPrices(e,d){
    for( let price in e){
      d.push(price);
    }
    return d;
  }

  async componentWillMount(){
    // Find Item
    var currenItem = await displayItem(this.state.itemType, this.state.itemId);
    var datas = [];
    for( let data in currenItem){
       datas.push(currenItem[data]);
    }

    // Get sizes
    var prices = await this.findPrices(datas[3], []);
    // Find name for each customizations * First one vary depending on the drink
    var headers = ["check", "Espresso", "Cream","Syrup"];
    // Checking if it should be water or ice
    if( this.state.itemType.substring(0,3) == "Hot"){
       headers[0] = "Water";
    }else{
       headers[0]="Ice";
    }

    this.setState({prices:datas[3]});

    var select = this.state.select;
    select[0] = prices[0];

    // Set state
    this.setState({itemName: datas[2], itemSizes: prices, discription: datas[0], image: datas[1], header:headers, select: select});
    // Set object to pass into other components
    this.createItemObject();
  }

  // Function to restate state when user make a choice
  changeChoice(index, e){
    var selections = this.state.select;
    selections[index] = e;
    this.setState({select : selections});
    // Set object to pass into other components
    this.createItemObject();
  }

  // Function to create and change the object to be later pass into other components
  createItemObject(){
    var itemObject = {size : this.state.select[0]};
    var itemsize = this.state.select[0];
    itemObject['price'] = this.state.prices[itemsize];
    for( var i = 0; i < this.state.header.length; i++){
      var key = this.state.header[i];
      var value = this.state.select[i+1];
      itemObject[key] = value;
    }

    itemObject["customization"] = this.state.select[5];
    this.setState({item : itemObject});
  }




  render() {
    var itemImage = this.state.image;
    var itemSize = this.state.itemSizes;
    var itemName = this.state.itemName;
    var selections = this.state.select;
    var changeChoicef = this.changeChoice;
    var choiceIce = this.state.icewater;
    var choiceEsp = this.state.espresso;
    var choiceCream = this.state.cream;
    var choiceSyrup = this.state.syrup;
    var headers = this.state.header;
    var choices = [];
    choices.push(choiceIce);
    choices.push(choiceEsp);
    choices.push(choiceCream);
    choices.push(choiceSyrup);
    console.log("from customization" + this.state.saveInfo["buyer_whenLogan"]);
    // If add another customization, then add another push state, DO NOT CHANGE RENDER
    // Example:
    //choices.push(this.state.topping);

    // Check if everything is made, if not, display the spinning effect
    if( itemImage != undefined && itemSize != undefined && itemName != undefined &&
        selections != undefined && headers != undefined){
    return (

      <Container style={styles.page}>

        {/* Header contain: Go back button, go back to submenu*/}
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={ ()=> this.props.navigation.navigate('submenu',{
                saveInfo: this.state.saveInfo
              })}>
              <Icon name='arrow-back' style={styles.icon_BackArrow}/>
            </Button>
          </Left>
        </Header>

        {/* Item name and the line under the name */}
        <Container style={styles.content}>
            <Text style={styles.itemName}>{this.state.itemName}</Text>
            <View style={styles.line} />

        {/* Grid contains two columns, first is the image of the item, second being the discription of the item */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Grid style={styles.grid}>
            <Col style={styles.imageCol}>
                <Image style={styles.itemImage} source={{uri:itemImage}} />
            </Col>
            <Col style={styles.discriptionCol}>
                <Text style={styles.discription}>{this.state.discription}</Text>
            </Col>
          </Grid>

          {/* Draw line*/}
          <View style={styles.line}/>

          {/* Display sizes choices. This is speical because size options does not display the header "size" at the begnning of the row */}
          <Container style={styles.choicesContainer}>
              <Grid style={styles.grid}>
                <Row style={styles.row}>

              {
                // Conditional rendering depending on  whether the button is selected or not
                itemSize.map(function (size, i){
                  if(size!=selections[0]){
                    return (<Col key= {i} style={styles.buttonCol}>
                        <Button style={styles.buttonChoices} onPress={()=> {changeChoicef(0,size)}}>
                          <Text style={styles.buttonText}>{size}</Text>
                        </Button>
                    </Col>)
                  }else{
                    return (<Col key={i} style={styles.buttonCol}>
                        <Button style={styles.buttonChoiceSelect} onPress={() => {changeChoicef(0,size)}}>
                          <Text style={styles.buttonTextSelect}>{size}</Text>
                        </Button>
                    </Col>)
                  }
                  }
                )
              }
              </Row>

              
              {
                // loop through the header state to print out each header at the beginning of each row
                headers.map(function (header, i){
                    var choice = choices[i];
                    var z = i + 1;
                    return (
                      <Row key={i} style={styles.row}>
                      <Col style={styles.subHeadersCol}>
                      <Text style={styles.subHeaders}>{header}</Text>
                      </Col>
                      {
                        // Loop through each choice and print accordingly.
                        choice.map(function (size, j){
                          if(size != selections[z]){
                            return (<Col key= {j} style={styles.buttonCol}>
                              <Button style={styles.buttonChoices} onPress={()=> {changeChoicef(z,size)}}>
                                <Text style={styles.buttonText}>{size}</Text>
                              </Button>
                                   </Col>)
                          } else{
                          return (<Col key={j} style={styles.buttonCol}>
                              <Button style={styles.buttonChoiceSelect} onPress={() => {changeChoicef(z,size)}}>
                                <Text style={styles.buttonTextSelect}>{size}</Text>
                              </Button>
                          </Col>)
                        }})})
                        })
                      }

                      </Row>

                    )}
                  )}

              </Grid>

              {/* Ask for random customization*/}
              <Textarea style={styles.textInput} placeholder= "Anything else you want?" onChangeText={(text) => this.changeChoice(selections.length-1, text)}/>
                


                <Container style={styles.padding}></Container>

              </Container>

          </ScrollView>


        </Container>


        {/* Submit button is designed to be the footer of the page, pass all possible information to other states when pressed*/}
        <Footer>
            <FooterTab>
                <Button full style={styles.submitButton} onPress={ ()=> {
                    this.props.navigation.navigate('main', {
                      name: itemName,
                      image: itemImage,
                      selection: this.state.select,
                      data: this.state.data,
                      update: true,
                      itemObject: this.state.item,
                      saveInfo: this.state.saveInfo,
                      seg: 1
                    })}}>
                   <Text style={styles.submitText}>Submit</Text>
                </Button>
            </FooterTab>
        </Footer>

      </Container>
    );
    }else{
      /* Display spinning when loading*/
      return(
        <Container style={{backgroundColor: '#FAFAFA'}}>
          <Spinner color='#FF9052' style={{marginTop: 40}} />
        </Container>
      );
    }
  }
}
