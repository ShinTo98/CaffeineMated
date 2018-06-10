/*
  Filename: SubmitOrder.js
  Version: 0.1.0
  Description: This page is the page that displays after the buyer submits order,
  displays information regarding who the carrier is, current order status, as well
  as ordered items.
*/
import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, List, ListItem, View, Spinner, Thumbnail,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, getProfileById, cancelByBuyer} from './../database.js';
import {styles} from '../CSS/SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';
import {OrderCompleted} from './OrderCompleted.js';


export class SubmitOrder extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      orderId: this.props.orderId,
      time: this.props.time,
      location: this.props.location,
      order_data: this.props.order_data,
      progressText: 'Order Progress: Waiting for carrier to accept',
      progressNum: 1,
      carrierName: '',
      carrierRate: '',
      carrierPhoto: '',
      carrierPhone: '',
      carrierAccepted: false,
      buttonText: 'Cancel Order',
      disableButton: false,
      carrierId: '',
      completed: false,
    };

    this.OrderCompletedChange = this.OrderCompletedChange.bind(this);

  }

  //updates progress bar to the status depending on parameter passed
  updateProgressBar = (num) => {
    let curr = num;
    let progressArr = [];

    for (var i = 1; i <= 4; i++) {


      if (curr - 1 >= 0) {
        progressArr.push((<View key={i} style={styles.circleFilled}/>));
        curr = curr - 1;
      } else {
        progressArr.push((<View key={i} style={styles.circle}/>));
      }

      if (i != 4) {
        progressArr.push((<View key={4+i} style={styles.line}/>));
      }
		}

    return progressArr;

  };

  //changes state after order has completed
  OrderCompletedChange() {
    this.props.change('orderSubmitted', false);
  }

  //updates number of stars depending on parameter passed
  updateStars = (num) => {
    let carrierStars = [];

    let curr = Math.round(num*2)/2;
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
			carrierStars.push((<Icon key={i} ios={iosStar} android={androidStar} style={styles.icon}/>));

		}

    return carrierStars;

  };


  componentDidMount() {
  }

  async fetchData() {
    var orderDetail = await viewOrderDetailById(this.state.orderId);
    var status = orderDetail.status;
    this.setState({progressNum: status})
    //order status
    switch(status) {
      case 2:
        this.setState({progressText: 'Order Progress: Your order has been accepted!'});
        this.setState({buttonText: 'Carrier Working...'});
        this.setState({disableButton: true});
        this.setState({carrierId: orderDetail.carrier_id});
        var carrierProfile = await getProfileById(orderDetail.carrier_id);
        this.setState({carrierName: carrierProfile.username});
        this.setState({carrierRate : carrierProfile.rate});
        this.setState({carrierPhoto: carrierProfile.photo});
        this.setState({carrierPhone: carrierProfile.phone});
        this.setState({carrierAccepted: true});
        break;
      case 3:
        this.setState({progressText: 'Order Progress: Your coffee is on its way!'});
        this.setState({buttonText: 'Complete Order'});
        this.setState({disableButton: false});
        this.setState({carrierId: orderDetail.carrier_id});
        var carrierProfile = await getProfileById(orderDetail.carrier_id);
        this.setState({carrierName: carrierProfile.username});
        this.setState({carrierRate : carrierProfile.rate});
        this.setState({carrierPhoto: carrierProfile.photo});
        this.setState({carrierPhone: carrierProfile.phone});
        break;
      case 5:
        this.setState({progressText: 'Order Progress: Your order is complete!'});
        this.setState({buttonText: 'Complete Order'});
        this.setState({disableButton: false});
        this.setState({carrierId: orderDetail.carrier_id});
        var carrierProfile = await getProfileById(orderDetail.carrier_id);
        this.setState({carrierName: carrierProfile.username});
        this.setState({carrierRate : carrierProfile.rate});
        this.setState({carrierPhoto: carrierProfile.photo});
        this.setState({carrierPhone: carrierProfile.phone});
        break;
    }
  }

  //changes button to complete order to let the user complete the order.
  async updateOrderSubmitted() {
    if (this.state.buttonText === 'Cancel Order') {
      await cancelByBuyer(this.state.orderId);
      //alert('Order cancel successful!');
      this.props.orderCancelled();
    } else if (this.state.buttonText === 'Complete Order') {
      alert('Order completed!');
      await completeOrder(this.state.orderId);
      this.setState({completed: true});
      this.props.change('order_data', []);
      this.props.change('totalPrice', 0);
      this.props.change('buyer_whenLogan', 'Pick a time');
      this.props.change('buyer_whereLogan','Specify a place');
      this.props.change('order_exists', false);
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    if(!this.state.completed) {
    return (
      <Container>
        <View style= {styles.container}>
          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
            <View style={styles.orderDetailText}>
              <Text style={styles.orderText}> Order Details </Text>
            </View>
            <Text style = {styles.labelTextFirst}>
              Location:
            </Text>
            <Text style = {styles.labelContent}>
              {this.state.location}
            </Text>
            <Text style = {styles.labelTextItems}>
              Time:
            </Text>
            <Text style = {styles.labelContent}>
              {this.state.time}
            </Text>
            <Text style = {styles.labelTextItems}>
              Items:
            </Text>

          {/*List of all the drinks in the order*/}
          <List
          dataArray={this.state.order_data}

          renderRow={data =>
          <ListItem style={styles.listItems}>
              <View style = {{flexDirection: 'row'}}>
                <Left>
                  <Thumbnail style={styles.itemImage} source={{uri: data.image}} />
                </Left>
                <View style = {styles.cardTextView}>
                  <Text style ={styles.cardPrimaryText}>
                    {data.name}
                  </Text>
                  <Text style ={styles.cardSecondaryText}>
                    {data.itemObject.size}
                  </Text>
                  <Text style ={styles.cardSecondaryText}>
                    ${data.itemObject.price}
                  </Text>
                </View>
              </View>
          </ListItem>}
          />

          {/*Information of carrier of the order*/}
          {this.state.carrierAccepted &&
          <View>
            <Text style = {styles.carrierTitle}>
              Your Carrier
            </Text>
            <View  style= {styles.carrierView}>

              <View style= {styles.carrierPic}>

                <Thumbnail style={{alignSelf:'center'}} large source={ {uri: this.state.carrierPhoto} } />

                <View style= {styles.carrierStars}>
                  {this.updateStars(this.state.carrierRate)}
                </View>
              </View>

              <View style= {styles.carrierText}>
                <Text style = {styles.labelTextFirst}>
                  Name:
                </Text>
                <Text style = {styles.labelContent}>
                  {this.state.carrierName}
                </Text>
                <Text style = {styles.labelTextItems}>
                  Phone Number:
                </Text>
                <Text style = {styles.labelContent}>
                  {this.state.carrierPhone}
                </Text>
              </View>

            </View>
            </View>

            }

          </Content>
        </View>

        {/*Displays progress bar*/}
        <View style={styles.progressBarView}>

          <View style= {styles.progressBar}>
            {this.updateProgressBar(this.state.progressNum)}
          </View>

        {/*Displays progress text*/}
          <Text style = {styles.progressText}>
            {this.state.progressText}
          </Text>
        </View>

        <View>
          <Button
          disabled={this.state.disableButton}
          style={styles.buttons_submit}
          color="#ffffff"
          onPress={() => this.updateOrderSubmitted()}
          > <Text style={styles.menuText}> {this.state.buttonText} </Text>
          </Button>
        </View>
      </Container>
    );
  } else if(this.state.completed) {
    return <OrderCompleted user_id={this.state.carrierId}
            order_id={this.state.orderId}
            user_name={this.state.carrierName}
            isBuyer={false} img={this.state.carrierPhoto}
            fromBuyer={true} buyer_change={this.OrderCompletedChange}/>
  }
  }
}
export default SubmitOrder;
