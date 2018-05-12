import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ListView
} from 'react-native';
import {styles} from '../CSS/MenuView.js';
import {userSignup, displayMenu, viewPendingOrders, displayType} from '../database.js';
import {
  Container,
  Header,
  Content,
  Button,
  Toast,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Left,
  Right,
  Col,
  Row,
  Grid,
  Body,
  Title
} from 'native-base';


export class SubMenuView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Types:[]
    };

    this.callDisplayMenu = this.callDisplayMenu.bind(this);

  }

  componentDidMount(){
    this.callDisplayMenu();
  }

  async callDisplayMenu(){
    var result = await displayType("Cold Coffees");
    console.log(result);
    this.setState({Types:result});
}

  render () {
    const Result = this.state.Types;
    return(

      <Container style={styles.container}>

        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title>Menu</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search'/>
            </Button>
          </Right>
        </Header>




        <Grid style={{flexWrap: 'wrap'}}>
          {
               Result.map((type,i) =>
               <Col key={i} style={{height:'30%', width:'45%', alignItems: "center"}}>
                 <Row style={{height:'90%'}}>
                   <Image style={styles.image}
                          source={{uri: type.image}} />
                 </Row>
                 <Row>
                   <Text style={styles.text}>{type.name}</Text>
                </Row>
              </Col>
             )
          }

       </Grid>
      </Container>
    );
  }
}
export default SubMenuView;
