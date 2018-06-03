import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, List, ListItem, View, Spinner, Thumbnail,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, getProfileById, cancelByBuyer} from './../database.js';
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
      orderId: this.props.orderId,
      time: this.props.time,
      location: this.props.location,
      order_data: this.props.order_data,
      progressText: 'Order Progress: Waiting for carrier to accept',
      progressNum: 1,
      carrierName: '',
      carrierRate: '',
      carrierPhoto: '',
      carrierAccepted: false,
    };
    //console.log("orderId, " + this.props.orderId);

  }

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

  updateStars = (num) => {
    let carrierStars = [];

    let curr = Math.round(num*2)/2;
    console.log(curr);
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
    console.log(this.props.order_data);
  }

  async fetchData() {
    console.log(this.state.orderId);
    var orderDetail = await viewOrderDetailById(this.state.orderId);
    //console.log(orderDetail);
    var status = orderDetail.status;
    this.setState({progressNum: status})
    if(status >= 2) {
      var carrierProfile = await getProfileById(orderDetail.carrier_id);
      //console.log(carrierProfile);
      this.setState({carrierName: carrierProfile.username});
      this.setState({carrierRate : carrierProfile.rate});
      this.setState({carrierPhoto: carrierProfile.photo});
      this.setState({carrierAccepted: true});
    }

  }

  async updateOrderSubmitted() {
    await cancelByBuyer(this.state.orderId);
    this.props.orderCancelled();
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

            <Text style = {styles.orderTitle}>
              Orders Details
            </Text>
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

<List
dataArray={this.state.order_data}

renderRow={data =>
<ListItem style={styles.listItems}>
  <Card style={styles.orderCard}>
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
  </Card>
</ListItem>}
/>

{this.state.carrierAccepted &&
<View>
  <Text style = {styles.carrierTitle}>
              Your Carrier
            </Text>
            <View  style= {styles.carrierView}>

              <View style= {styles.carrierPic}>

                <Thumbnail style={{alignSelf:'center'}} large source={ require('../resources/batman.jpg') } />

                <View style= {styles.carrierStars}>
                  {this.updateStars(4.6)}
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
                  Rate:
                </Text>
                <Text style = {styles.labelContent}>
                  {this.updateStars(this.state.carrierRate)}
                </Text>
              </View>

            </View>
            </View>

}

          </Content>
        </View>

        <View style={styles.progressBarView}>

          <View style= {styles.progressBar}>
            {this.updateProgressBar(this.state.progressNum)}
          </View>


          <Text style = {styles.progressText}>
            {this.state.progressText}
          </Text>
        </View>

        <View>
          <Button
          style={styles.buttons_submit}
          color="#ffffff"
          onPress={() => this.updateOrderSubmitted()}
          > <Text style={styles.menuText}> Cancel Order </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
export default SubmitOrder;
