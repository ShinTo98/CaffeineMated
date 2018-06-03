import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
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
} from 'native-base';
import {styles} from "../CSS/CoffeeOfTheDay.js";
import {randomCoffee} from "../database";
import PTRView from 'react-native-pull-to-refresh';

export class CoffeeOfTheDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item : null
    }
    // Bind login related functions
    this.getCoffee = this.getCoffee.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    console.log("Hello Update");
    this.forceUpdate();
  }

  async getCoffee(){
    var test = await randomCoffee();
    this.setState({item: test});
    console.log(this.state.item);
  }

  async componentWillMount(){
    await this.getCoffee();
  }

  async _refresh() {
    // this.componentWillMount();
    // forceUpdate();
      return new Promise((resolve) => {
        // this.getCoffee()
        setTimeout(()=>{resolve()}, 2000)
        this.forceUpdateHandler();

      });
  }


  render () {
    var result = this.state.item;
    //console.log(result.image);
    if( result != undefined){
    //console.log("this is result in items: " + result.image);
      return(
        <PTRView onRefresh={this._refresh}>
          <View style={styles.container}>
            <Grid style={{flexWrap: 'wrap'}}>

              <Row style={styles.titleRow}>
                <Text>Coffee of The Day</Text>
              </Row>

              <Row style={styles.imageRow}>
                <Image style={styles.itemImage} source={{uri: result.image}}/>
              </Row>

              <Row style={{marginTop: 30}}>
                <Text style={{alignSelf: 'center'}}> {result.name} </Text>
              </Row>

              <Row style={styles.btn}>
                  <Button onPress={() => {
                    this.getCoffee();
                  }} title="Click Me" style={{height: 10, backgroundColor: '#1e90ff'}}/>
              </Row>

            </Grid>
          </View>
        </PTRView>
      );
    } else {
      return(
        <View />
       )
    }
  }
}
export default CoffeeOfTheDay;
