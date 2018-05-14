import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  List,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Item,
  Input,
  Form,
  Label,
  View,
  ListItem,
  Thumbnail
} from 'native-base';
import {styles} from '../CSS/Profile.js';


export class Profile extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      name: 'John Appleseed',
      phone: '805-666-6666',
      email: '666@ucsd.edu',
      password: '666666',
      profilePic: "../resources/batman.jpg"
    };

  }

  render() {
    return (
      <Container style={styles.color_theme}>
        <Header hasSegment="hasSegment">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('main')}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Body>

            <Title>Profile</Title>

          </Body>
          <Right></Right>
        </Header>

         <Container style={styles.container}>

            <Container style={styles.profileSection}>
              <Thumbnail large source={ require('../resources/batman.jpg') } />
              <Container style={styles.buyerStarSection}>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star-half' android="md-star-half"/>
                <Icon ios='ios-star-outline' android="md-star-outline"/>
              </Container>
              <Container style={styles.sellerStarSection}>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star' android="md-star"/>
                <Icon ios='ios-star-half' android="md-star-half"/>
                <Icon ios='ios-star-outline' android="md-star-outline"/>
              </Container>
            </Container>

            <Form style={styles.detailSection}>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input placeholder={this.state.name}/>
              </Item>
              <Item stackedLabel>
                <Label>Phone Number</Label>
                <Input placeholder={this.state.phone}/>
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input disabled placeholder={this.state.email}
                keyboardType='email-address'
                />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input placeholder={this.state.password}
                keyboardType='visible-password'
                secureTextEntry= {true}
                />
              </Item>
            </Form>

          </Container>


      </Container>
    );
  }
}
export default Profile;
