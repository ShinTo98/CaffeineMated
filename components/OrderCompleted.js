import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import {styles} from '../CSS/OrderCompleted.js';
//import {userSignup, displayMenu, viewPendingOrders, displayType} from '../database.js';
import {
  Container,
  Button,
  Text,
  Left,
  Right,
  Card
} from 'native-base';
import StarRating from 'react-native-star-rating';
import {updateOrderRate} from './../database.js';

export class OrderCompleted extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  onStarRatingPress(rating) {
    this.setState({
      rate: rating
    });
    console.log(this.state.rate);
  }

  updateRating() {
    console.log(this.state.user_id)
    updateOrderRate(this.state.order_id, this.state.rate, this.state.isBuyer, this.state.user_id);
  }

  componentWillMount() {
    this.setState({
      user_id: this.props.user_id,
      order_id: this.props.order_id,
      isBuyer: this.props.isBuyer,
      user_name: this.props.user_name,
      img: this.props.img,
      star_count: 5,
      rate: 5
    });
    console.log(this.state)
  }


  render () {
    return(
      <Container>
        <Container style={styles.popupBox}>
            <Card>
            <Container style={styles.titleContainer}>
              <Text style={styles.title}>Success! </Text>
              <Text style={styles.title}>You've completed this order. </Text>
              <Text style={styles.title}>Please rate <Text style={styles.title}>{this.state.user_name}</Text></Text>
            </Container>


            <Container style={styles.avatarContainer}>
              <Image source={{uri: this.state.img}} style={styles.avatar} />
              <Text style={styles.userID}>{this.state.user_name}</Text>
            </Container>

            <Container style={styles.starsContainer}>
              <StarRating
                disabled={false}
                maxStars={5}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                halfStarEnabled={true}
                fullStarColor={'#FF9052'}
                emptyStarColor={'#47525E'}
                rating={this.state.rate}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </Container>
            </Card>

            <Container style={styles.buttonContainer}>
              <Button style={styles.buttons_submit} onPress={() => this.updateRating()}>
                <Text style={styles.buttonText}> Submit </Text>
              </Button>
            </Container>
        </Container>
        <Container>
        </Container>
      </Container>
    );
  }
}
export default OrderCompleted;
