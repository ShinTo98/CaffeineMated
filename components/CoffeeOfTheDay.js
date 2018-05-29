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
} from 'native-base';
//import {styles} from "../CSS/Customization.js";
import {randomCoffee} from "../database";

export class CoffeeOfTheDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:
    };
    // Bind login related functions
    this.getCoffee = this.getCoffee.bind(this);
  }

  async getCoffee(){
    var test = await randomCoffee();
    this.setState(item: test);
    console.log(this.state.item);
  }

  async componentWillMount(){
    await this.getCoffee();
  }

  render () {
    var result = this.state.item;
    //console.log("this is result in items: " + result);
    return(
      <container>
        // <TouchableWithoutFeedback onPress ={ () => {
        //   this.props.navigation.navigate('customization', {
        //     itemType: this.state.type,
        //     itemId: type[1],
        //     data: this.state.data,
        //   })}}>
        //   <Image style={styles.image} source={{uri: type[0]}}/>
        // </TouchableWithoutFeedback>
      </container>
    );
  }
}
export default CoffeeOfTheDay;
