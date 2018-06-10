/*
  Filename: OrderCompleted.js
  Version: 0.1.0
  Description: This page contains UI elements for the rating page after order is comple, as well as
  functions to update rating in database. 
*/
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


  // pressing on starts
  onStarRatingPress(rating) {
    this.setState({
      rate: rating
    });
  }

  // send rating to database
  updateRating() {
    updateOrderRate(this.state.order_id, this.state.rate, this.state.isBuyer, this.state.user_id);
    if(!this.props.fromBuyer) {
      this.props.change('rating', false);
    } else {
      this.props.buyer_change();
    }
  }

  // initializing
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
  }


  render () {
    return(
      <Container>
        <Container style={styles.popupBox}>
            
            <Container style={styles.titleContainer}>
              <Text style={styles.title}>Success! </Text>
              <Text style={styles.title}>You've completed this order. </Text>
              <Text style={styles.title}>Please rate <Text style={styles.title}>{this.state.user_name}</Text></Text>
            </Container>


            <Container style={styles.avatarContainer}>
              <Image source={{uri: this.state.img}} style={styles.avatar} />
              <Text style={styles.userID}>{this.state.user_name}</Text>
            </Container>

{/* ---------------------------------- rating stars ---------------------------------- */}
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
