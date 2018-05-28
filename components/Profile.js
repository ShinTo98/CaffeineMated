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
  Thumbnail,
  Spinner
} from 'native-base';
import {styles} from '../CSS/Profile.js';
import {getProfileById, changeUserName, getCurrentUserUID} from './../database.js';


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
      rating: 0,
      user_id: '',
      loaded: false,
    };

    this.updateProfile = this.updateProfile.bind(this);

  }

  async getProfile() {
    this.setState({user_id: await getCurrentUserUID()});
    this.setState({profileData: await getProfileById(this.state.user_id)});
    this.setState({
      placeName: this.state.profileData["username"],
      rating: Math.round(this.state.profileData["rate"]*2)/2,
      loaded: true,
    })
    //console.log(this.state.buyerRating);
    //console.log(this.state.carrierRating);
  }

  async componentWillMount() {
    await this.getProfile();
  }

  async updateProfile() {

    if (this.state.name == '') {
      alert('You cannot update an empty name!');
    } else {
      var result = await changeUserName(this.state.user_id, this.state.name);
      this.setState({
        placeName: this.state.name,
        name: '',
      })
      if(result == 0) {
        alert("Update Successful!");
      } else if (result == -1) {
        alert("Update Failed");
      }
    }
  }


  render() {

    let rateStars = [];

    let curr = this.state.rating;
    for (var i = 1; i <= 5; i++) {

      let iosStar = 'ios-star';
      let androidStar = 'md-star';

      if (curr - 1 >= 0) {
        iosStar = 'ios-star';
        androidStar = 'md-star';
        curr = curr - 1;
      } else if ( curr - 0.5 == 0) {
        iosStar = 'ios-star-half';
        androidStar = 'md-star-half';
        curr = curr - 0.5;
      } else {
        iosStar = 'ios-star-outline';
        androidStar = 'md-star-outline';
      }

			// Push the icon tag in the stars array
			rateStars.push((<Icon key={i} ios={iosStar} android={androidStar} style={styles.icon}/>));

		}

    return (
      <Container style={styles.color_theme}>
        <Header hasSegment="hasSegment">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('main', {
               update: false,
          })}>
              <Icon name='arrow-back' style={styles.icon}/>
            </Button>
          </Left>
          <Body>

            <Title>Profile</Title>

          </Body>
          <Right></Right>
        </Header>

          {this.state.loaded &&
            <Container style={styles.container}>
              <Container style={styles.profileSection}>
                <Thumbnail large source={ require('../resources/batman.jpg') } />
                <Container style={styles.starSection}>
                  {rateStars}
                </Container>
              </Container>

              <Form style={styles.detailSection}>
                <Item stackedLabel>
                  <Label>Name</Label>
                  <Input value={this.state.name}
                  onChangeText={(text) => this.setState({name: text})}
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
          }

          {!this.state.loaded &&
            <Container>
              <Spinner color="#FF9052" />
            </Container>

          }


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
