import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder} from './../database.js';
import {styles} from '../CSS/SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';


export class SubmitOrder extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };

  }


  componentDidMount() {
    console.log(this.props.order_data);
  }

  async fetchData() {

  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <Container>
        <View style= {styles.container}>
          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
            <View style = {styles.progress}>
            {/*
              <Text style = {styles.progressSpinLabel}>
                Waiting for carrier to accept...
              </Text>
              <Spinner color="#8E8E93" style = {styles.progressSpin}/>
              */}
            </View>
            <Text style = {styles.carrierTitle}>
              Your Carrier
            </Text>
            <View  style= {styles.carrierView}>

              <View style= {styles.carrierPic}>

                <Thumbnail style={{alignSelf:'center'}} large source={ require('../resources/batman.jpg') } />

                <View style= {styles.carrierStars}>
                  <Icon ios='ios-star' android='md-star' style={styles.icon}/>
                  <Icon ios='ios-star' android='md-star' style={styles.icon}/>
                  <Icon ios='ios-star' android='md-star' style={styles.icon}/>
                  <Icon ios='ios-star' android='md-star' style={styles.icon}/>
                  <Icon ios='ios-star' android='md-star' style={styles.icon}/>
                </View>
              </View>

              <View style= {styles.carrierText}>
                <Text style = {styles.labelTextFirst}>
                  Name:
                </Text>
                <Text style = {styles.labelContent}>
                  John Appleseed
                </Text>
                <Text style = {styles.labelTextItems}>
                  Phone Number:
                </Text>
                <Text style = {styles.labelContent}>
                  619-358-6666
                </Text>
              </View>

            </View>
            <Text style = {styles.orderTitle}>
              Orders Details
            </Text>
            <Text style = {styles.labelTextFirst}>
              Location:
            </Text>
            <Text style = {styles.labelContent}>
              Warren Lecture Hall
            </Text>
            <Text style = {styles.labelTextItems}>
              Time:
            </Text>
            <Text style = {styles.labelContent}>
              09:00, Tuesday May 22, 2018
            </Text>
            <Text style = {styles.labelTextItems}>
              Items:
            </Text>

            <Card style={styles.orderCard}>
                <View style = {{flexDirection: 'row'}}>
                <Left>
                  <Thumbnail style={{marginTop: 15, left: 10}} source={ require('../resources/batman.jpg') } />
                </Left>

                  <View style = {styles.cardTextView}>
                    <Text style ={styles.cardPrimaryText}>
                       Ice Coffee Latte
                    </Text>
                    <Text style ={styles.cardSecondaryText}>
                       Grande
                    </Text>

                  </View>

                </View>
            </Card>



          </Content>
        </View>

        <View style={styles.progressBarView}>

          <View style= {styles.progressBar}>
            <View style={styles.circleFilled}/>
            <View style={styles.line}/>
            <View style={styles.circleFilled}/>
            <View style={styles.line}/>
            <View style={styles.circle}/>
            <View style={styles.line}/>
            <View style={styles.circle}/>
          </View>


          <Text style = {styles.progressText}>
            Order Progress: Carrier Confirmed
          </Text>
        </View>

        <View>
          <Button
          style={styles.buttons_submit}
          color="#ffffff"
          onPress={() => this.props.updateOrderSubmitted(false)}
          > <Text style={styles.menuText}> Cancel Order </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
export default SubmitOrder;
