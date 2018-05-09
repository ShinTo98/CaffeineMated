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


/* Class of Buttons */
class SizeButtons extends Component {
  loopingFunction() {
    const fields = [];
    for (let i=0; i < this.props.size.length; i++) {
      fields.push(
        <Button bordered style={styles.buttonStyle}>
          <Text style={styles.button_text}>{this.props.size[i]}</Text>
        </Button>
      );
    }
    return fields;
  }

  render() {
    return (
      this.loopingFunction()
  );
  }
}



class IECButtons extends Component {
  loopingFunction() {
    const fields = [];
    for (let i=0; i < this.props.choices.length; i++) {
      fields.push(
        <Button bordered style={styles.buttonStyle}>
          <Text style={styles.button_text}>{this.props.choices[i]}</Text>
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
  }

  render() {
    let ice = ['Regular', 'Light', 'None'];
    let shot = ['1 Shot', '2 Shots', '3 Shots'];
    let cream = ['With', 'Without'];
    let sugar = ['Regular', 'Light', 'Over'];

    let sizes = ['Short', 'Tall', 'Grande', 'Venti', 'Tentra']

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
              <Form>
              <Textarea rowSpan={5}
                        bordered
                        placeholder="Other Customization..."/>
              </Form>
            </Container>
        </Container>    /* end iecContainer */


        <Container style={styles.submitButtonContainer}>
          <Button bordered style={styles.comfirmButton}>
            <Text style={styles.button_text}>Confirm</Text>
          </Button>
        </Container>

      </Container>    /* biggest container */

    );

  }
}
