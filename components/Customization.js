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
      select: ["grande", "regular", "0 shot", "regular", "regular","regular",""],
      icewater: ["no", "light", "regular"],
      espresso: ["0 shot", "1 shot", "2 shot"],
      cream: ["no", "light", "regular"],
      syrup: ["no", "light", "regular"],
      data: this.props.navigation.getParam('data'),
      location: this.props.navigation.getParam('location'),
      time: this.props.navigation.getParam('time'),
      //topping: ["no", "light", "regular"]
      //itemImage: displayItem(this.state.itemType, this.state.itemId)
    };

    this.findPrices = this.findPrices.bind(this);
    this.changeChoice = this.changeChoice.bind(this);
  }

  async findPrices(e,d){
    for( let price in e){
      d.push(price);
    }
    return d;
  }

  async componentWillMount(){
    var currenItem = await displayItem(this.state.itemType, this.state.itemId);
    var datas = [];
    for( let data in currenItem){
       datas.push(currenItem[data]);
    }
    console.log(currenItem);
    console.log(datas);

    var prices = await this.findPrices(datas[3], []);
    var headers = ["check", "Espresso", "Cream","Syrup"];
    if( this.state.itemType.substring(0,3) == "Hot"){
       headers[0] = "Water";
    }else{
       headers[0]="Ice";
    }

    var select = this.state.select;
    select[0] = prices[0];
    this.setState({itemName: datas[2], itemSizes: prices, discription: datas[0], image: datas[1], header:headers, select: select});
  }

  changeChoice(index, e){
    console.log("selected:" + e);
    var selections = this.state.select;
    selections[index] = e;
    this.setState({select : selections});
    console.log(this.state.select);
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
    //choices.push(this.state.topping);
    if( itemImage != undefined && itemSize != undefined && itemName != undefined &&
        selections != undefined && headers != undefined){
    return (

      <Container style={styles.page}>

        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={ ()=> this.props.navigation.navigate('submenu',{
                location: this.state.location,
                time: this.state.time,
              })}>
              <Icon name='arrow-back' style={styles.icon_BackArrow}/>
            </Button>
          </Left>
        </Header>

        <Container style={styles.content}>
            <Text style={styles.itemName}>{this.state.itemName}</Text>
            <View style={styles.line} />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Grid style={styles.grid}>
            <Col style={styles.imageCol}>
                <Image style={styles.itemImage} source={{uri:itemImage}} />
            </Col>
            <Col style={styles.discriptionCol}>
                <Text style={styles.discription}>{this.state.discription}</Text>
            </Col>
          </Grid>

          <View style={styles.line}/>

          <Container style={styles.choicesContainer}>
              <Grid style={styles.grid}>
                <Row style={styles.row}>

              {
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
                headers.map(function (header, i){
                    var choice = choices[i];
                    var z = i + 1;
                    return (
                      <Row key={i} style={styles.row}>
                      <Col style={styles.subHeadersCol}>
                      <Text style={styles.subHeaders}>{header}</Text>
                      </Col>
                      {
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

              <Textarea style={styles.textInput} placeholder= "Anything else you want?" onChangeText={(text) => this.changeChoice(selections.length-1, text)}/>
                


                <Container style={styles.padding}></Container>

              </Container>

          </ScrollView>


        </Container>


                                <Footer>
                  <FooterTab>
                <Button full style={styles.submitButton}>
                   <Text style={styles.submitText} onPress={ ()=> {
                this.props.navigation.navigate('main', {
                   name: itemName,
                   image: itemImage,
                   selection: this.state.select,
                   data: this.state.data,
                   location: this.state.location,
                   time: this.state.time,
                   update: true,
              })}}>Submit</Text>
                </Button>
                </FooterTab>
                </Footer>

      </Container>
    );
    }else{
      return(
        <Container>
          <Spinner color='red' />
        </Container>
      );
    }
  }
}
