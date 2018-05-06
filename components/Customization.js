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

export class Customization extends Component {

  static navigationOptions = {
    header: null

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.bgColor}>

        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='search'/>
            </Button>
          </Right>
        </Header>

        <Container style={styles.coffeeTitle}>
          <Content>
            <View style={styles.coffeeNameUnderline}>
              <Text style={styles.coffeeName}>
                Mocha
              </Text>
            </View>
          </Content>
        </Container>

        <Container style={styles.coffeeSizeContainer}>
          <Content>
            <View style={styles.coffeeNameUnderline}>

              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Short</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Tall</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Grande</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Venti</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Iced</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Hot</Text>
              </Button>
            </View>
          </Content>
        </Container>

        <Container style={styles.IECcontainer}>
          <Content>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.button_text}>Ice</Text>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Regular</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Light</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>None</Text>
              </Button>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.button_text}>Espresso</Text>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>1 Shot</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text.color}>2 Shots</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text.color}>3 Shots</Text>
              </Button>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.button_text}>Cream</Text>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>With</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Without</Text>
              </Button>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.button_text}>Sugar</Text>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Regular</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Light</Text>
              </Button>
              <Button bordered style={styles.buttonStyle}>
                <Text style={styles.button_text}>Over</Text>
              </Button>
            </View>
            <View>
              <Form>
              <Textarea rowSpan={8} bordered
                        placeholder="Other Customization..."/>
              </Form>
            </View>
          </Content>
        </Container>



        <Container
          style={styles.coffeeSizeContainer}
          justifyContent='flex-end'>
          <Button bordered style={styles.comfirmButton}>
            <Text style={styles.button_text}>Confirm</Text>
          </Button>
        </Container>

      </Container>

    );

  }
}
