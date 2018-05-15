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
import {getProfileById, changeUserName} from './../database.js';


export class Profile extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      placeName:'',
      name: '',
      phone: '805-666-6666',
      email: '666@ucsd.edu',
      password: '••••••',
      profilePic: "../resources/batman.jpg",
      profileData: [],
    };

    this.updateProfile = this.updateProfile.bind(this);

  }

  async getProfile() {
    this.setState({profileData: await getProfileById("01")});
    this.setState({
      placeName: this.state.profileData["username"],
    })
    //console.log(this.state.profileData);
  }

  async componentWillMount() {
    await this.getProfile();
  }

  async updateProfile() {
    var result = await changeUserName("01", this.state.name);
    this.setState({
      placeName: this.state.name,
    })
    if(result == 0) {
      alert("Update Successful!");
    } else if (result == -1) {
      alert("Update Failed");
    }
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
                <Input onChangeText={(text) => this.setState({name: text})}
                placeholder={this.state.placeName}/>
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

          <Footer>
            <FooterTab>
              <Button full style={styles.signOut}
                onPress={() => this.updateProfile()}>
                <Text style={styles.signOutText}>Update Profile</Text>
              </Button>
            </FooterTab>
          </Footer>

      </Container>
    );
  }
}
export default Profile;
