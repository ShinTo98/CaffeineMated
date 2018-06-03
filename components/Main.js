import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl, ListView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem, Toast } from 'native-base';
import {sortOrdersByDistance, sortOrdersByRequestTime, viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, cancelByCarrier, getProfileDetailById, createOrder} from './../database.js';
import {styles} from '../CSS/Main.js';
import SubmitOrder from './SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';
import { BuyerMain } from './BuyerMain.js';
import { CarrierMain } from './CarrierMain.js';
import { PlaceChoose } from './PlaceChoose.js';


export class Main extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    // For swipable list
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.buyerMainChange = this.buyerMainChange.bind(this);
    this.buyerMainGet = this.buyerMainGet.bind(this);
    this.carrierMainChange = this.carrierMainChange.bind(this);
    this.carrierMainGet = this.carrierMainGet.bind(this);

    this.state = {
      seg: 1,
      where: "",
      ids: [],
      request_data: [],
      order_data: [],
      totalPrice: 0.00,
      loadFinished: false,
      order_exists: false,
      request_selected: false,
      isDateTimePickerVisible: false,
      location: '',
      time: '',
      refreshing: false,
      order_selecting: undefined,
      selecting_order: false,
      selected_order: -1,
      accepted: false,
      delivering: false,
      orderSubmitted: false,
      // for toggleing places choosing popup
      buyer_choosePlaces: false,
      carrier_choosePlaces: false,
      // for showing Toasts
      showToast: false,
      // for when & where logans
      buyer_whenLogan: 'Pick a time',
      buyer_whereLogan: 'Specify a place',
      carrier_whenLogan: 'Pick a time',
      carrier_whereLogan: 'Specify a place',
      carrier_time: '',
      carrier_location: '',
      curname: 'Username',
      carrier_accept_hour: 0,
      carrier_accept_minute: 0,
      carrier_accept_second: 0,
      // order id after order submission
      orderId: '',
    };
    this.order_selected = {};
    this.order_to_id = {};
    this.placeChooseChange = this.placeChooseChange.bind(this);
    this.placeChooseGet = this.placeChooseGet.bind(this);
  } 
  
  buyerMainChange(id, value){
    if( id == "buyer_choosePlaces"){
        this.setState({buyer_choosePlaces : !this.state.buyer_choosePlaces});
    }else if( id == "buyer_whenLogan"){
        this.setState({buyer_whenLogan : value});
    } else if( id == 'order_data') {
      this.setState({order_data: value});
    } else if( id == 'totalPrice') {
      this.setState({totalPrice: value});
    }
  }

  buyerMainGet(id){
   // console.log("klasdkjf;alksjdf;laksjdf;lkasjf;lkajsdl;" + s);
   if(id == "buyer_whereLogan"){
        return this.state.buyer_whereLogan;
   }else if( id == "buyer_choosePlaces"){
        return this.state.buyer_choosePlaces;
   }else if( id == "buyer_whenLogan"){
        return this.state.buyer_whenLogan;
   }else if( id == "order_data"){
        return this.state.order_data;
   }else if( id == "orderSubmitted"){
        return this.state.orderSubmitted;
   }else if( id == "updateOrderSubmitted"){
        return this.state.updateOrderSubmitted;
   }else if( id == "orderId"){
        return this.state.orderId;
   }else if( id == "order_exists"){
        return this.state.order_exists;
   }else if( id == "carrier_refreshing"){
        return this.state.carrier_refreshing;
   }else if( id == "totalPrice") {
        return this.state.totalPrice;
   }
  }

  carrierMainGet(id){
    if( id == 'selecting_order'){
        return this.state.selecting_order;
    }else if( id == 'order_selecting.id'){
        return this.state.order_selecting.id;
    }else if( id == 'order_selecting.avatar'){
        return this.state.order_selecting.avatar;
    }else if( id == 'order_selecting.buyer_name'){
        return this.state.order_selecting.buyer_name;
    }else if( id == 'order_selecting.buyer_rate'){
      return this.state.order_selecting.buyer_rate;
    }else if( id == 'order_selecting.location'){
      return this.state.order_selecting.location;
    }else if( id == 'order_selecting.request_time'){
      return this.state.order_selecting.request_time;
    }else if( id == 'order_selecting.items'){
      return this.state.order_selecting.items;
    }else if( id == "selected_order"){
      return this.state.selected_order;
    }else if( id == "request_selected"){
      return this.state.request_selected;
    }else if( id == "accepted"){
      return this.state.accepted;
    }else if( id == "request_data"){
      return this.state.request_data;
    }else if( id == 'loadFinished'){
      return this.state.loadFinished;
    }else if( id == 'carrier_whereLogan'){
      return this.state.carrier_whereLogan;
    }else if( id == 'carrier_whenLogan'){
      return this.state.carrier_whenLogan;
    }else if( id == 'carrier_refreshing'){
      return this.state.refreshing;
    }else if( id == 'delivering'){
      return this.state.delivering;
    }else if( id == "carrier_accept_hour"){
      return this.state.carrier_accept_hour;
    }else if( id == "carrier_accept_minute"){
      return this.state.carrier_accpet_minue;
    }else if( id == "carrier_accept_second"){
      return this.state.carrier_accept_second;
    }else if( id == "ids"){
      return this.state.ids;
    }
  }

  carrierMainChange(id, value){
    var orderSelecting = this.state.order_selecting;
    if( id == 'selecting_order'){
      this.setState({selecting_order : value});
  }else if( id == 'order_selecting.avatar'){
    orderSelecting.avatar = value;
      this.setState({order_selecting : orderSelecting});
  }else if( id == 'order_selecting.buyer_name'){
    orderSelecting.buyer_name = value;
      this.setState({order_selecting: orderSelecting});
  }else if( id == 'order_selecting.buyer_rate'){
    orderSelecting.buyer_rate = value;
    this.setState({order_selecting :orderSelecting});
  }else if( id == 'order_selecting.location'){
    orderSelecting.location = value;
    this.setState({order_selecting: orderSelecting});
  }else if( id == 'order_selecting.request_time'){
    orderSelecting.request_time = value;
    this.setState({order_selecting : orderSelecting});
  }else if( id == 'order_selecting.items'){
    orderSelecting.items = value;
    this.setState({order_selecting : orderSelecting});
  }else if( id == "selected_order"){
    this.setState({selected_order : value});
  }else if( id == "request_selected"){
    this.setState({request_selected : value });
  }else if( id == "accepted"){
    this.setState({accepted : value});
  }else if( id == 'carrier_choosePlaces'){
    this.setState({carrier_choosePlaces : value});
  }else if( id == "order_selecting"){
    this.setState({order_selecting : value});
  }else if( id == "selecting_order"){
    this.setState({selecting_order : value});
  }else if( id == 'carrier_whereLogan'){
    this.setState({carrier_whereLogan : value});
  }else if( id == 'carrier_whenLogan'){
    this.setState({carrier_whenLogan : value});
  }else if( id == "carrier_accept_hour"){
    this.setState({carrier_accept_hour : value});
  }else if( id == "carrier_accept_minute"){
    this.setState({carrier_accpet_minue : value});
  }else if( id == "carrier_accept_second"){
    this.setState({carrier_accept_second : value});
  }else if( id == "delivering"){
    this.setState({delivering: value});
  }else if( id == "request_data"){
    this.setState({request_data : value});
  }else if( id == "order_selected_id"){
    this.order_selected[value] = false;
  }
  }


  async saveRequestIds() {
    if( this.state.carrier_whereLogan != 'Specify a place'){
      this.setState({ids: await sortOrdersByDistance(this.state.carrier_whereLogan)});
    }else{
      this.setState({ids: await sortOrdersByRequestTime()});
    }
    console.log(this.state.ids);
  }

  async saveRequestDetails() {
    var received = [];
    for (let id of this.state.ids) {
      order = await viewOrderDetailById(id);
      order["id"] = id;
      profile = await getProfileDetailById(order.buyer_id)
      //console.log(profile)
      if (profile.username) {
        order["buyer_name"] = profile.username;
      }
      else {
        order["buyer_name"] = "Username";
      }
      if (profile.photo) {
        order["avatar"] = profile.photo;
      }
      else {
        order["avatar"] = undefined;
      }
      received.push(order);
      if (this.order_selected[id] == undefined) {
        this.order_selected[id] =  false;
      }
    }
    this.setState({request_data: received});
    //const d = this.state.ids.map(async id => {await viewOrderDetailById(id)});
    //console.log(d)
    //this.setState({data: async this.state.ids.map((id) => {await viewOrderDetailById(id))}});
    //console.log(this.state.request_data);
  }

  async componentWillMount() {
    //console.log("this is from main about get function" + this.buyerMainGet(whereLogan));
    this.setState({loadFinished: false});

    await this.saveRequestIds();
    await this.saveRequestDetails();
    this.setState({loadFinished: true});

    //console.log(this.state.request_data)

    // get params here
    //console.log("This is from main  " + this.props.navigation.getParam('selection'));

    if(this.props.navigation.getParam('itemObject') != undefined){
      var itemObject = this.props.navigation.getParam('itemObject');
      console.log("this is itemObject" + itemObject);
      console.log("this is itemObject size" + itemObject.size);
      console.log("this is itemObject syrup" + itemObject.syrup);
      console.log("this is itemObject price" + itemObject.price);
    }


    if(this.props.navigation.getParam('selection') != undefined) {
      var latest = this.props.navigation.getParam('data');
      if (this.props.navigation.getParam('update') == true) {
        latest.push({
          name: this.props.navigation.getParam('name'),
          image: this.props.navigation.getParam('image'),
          selection: this.props.navigation.getParam('selection'),
          itemObject: this.props.navigation.getParam('itemObject'),
        });
      }
      var newTotalPrice = 0;
      for(var i = 0; i < latest.length; i++) {
        newTotalPrice += latest[i].itemObject.price;
      }
      this.setState({order_data: latest});
      this.setState({totalPrice: newTotalPrice});
      this.setState({order_exists: true});
      //console.log(this.state.order_data);
    }
    
    //console.log("flkjdflksjdlfksjldfkjlsdjdfl" + this.props.navigation.getParam('location'));
    if(this.props.navigation.getParam('time') != undefined){
      this.setState({buyer_whenLogan : this.props.navigation.getParam('time')});
    }
    if( this.props.navigation.getParam('location') != undefined){
      this.setState({buyer_whereLogan : this.props.navigation.getParam('location')});
    }

    if( this.state.carrier_whereLogan != 'Specify a place'){
      this.setState({ids: await sortOrdersByDistance(this.state.carrier_whereLogan)});
    }
  }



  async placeChooseChange(id, location){
    if( id == 0){
      this.setState({buyer_whereLogan : location,
                     buyer_choosePlaces: false});

    }else{
      this.setState({carrier_whereLogan : location,
                     carrier_choosePlaces: false});
    }

    if( this.state.carrier_whereLogan != 'Specify a place'){
      this.setState({ids: await sortOrdersByDistance(this.state.carrier_whereLogan)});
      console.log("this is from main.js about setting updat orders" + this.state.carrier_whereLogan);
      console.log("this is updated ids" + this.state.ids);
    }

  }

  placeChooseGet(id){
    if( id == 0){
      return this.state.buyer_whereLogan;
    }else{
      return this.state.carrer_whereLogan;
    }
  }

  render() {
    // For swipable list
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const loading = this.state.loadFinished;
    const order_exists = this.state.order_exists;
    const order_data = this.state.order_data;
    const dloop = this.state.dloop;
    //console.log(this.state.order_data);
    //console.log(this.state.dloop);
    if( this.state.buyer_choosePlaces ){
      return(
        <PlaceChoose get={this.placeChooseGet} placeChange={this.placeChooseChange} main={0}/>)
      }else if( this.state.carrier_choosePlaces ){
      return (
        <PlaceChoose get={this.placeChooseGet} placeChange={this.placeChooseChange} main ={1}/>
      )
    }else{
    return (

      <Container style={styles.color_theme}>
      {/* ---------------------------------- Regular main page ---------------------------------- */}{/* ---------------------------------- Main page header ---------------------------------- */}
        <Header hasSegment style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Segment >
              <Button
                style={this.state.seg === 1 ? styles.button_header_on : styles.button_header_off}
                first
                onPress={() => this.setState({ seg: 1 })}
              >
                <Text style={this.state.seg === 1 ? styles.text_on : styles.text_off}>Buyer</Text>
              </Button>
              <Button
                style={this.state.seg === 2 ? styles.button_header_on : styles.button_header_off}
                last
                onPress={() => this.setState({ seg: 2 })}
              >
                <Text style={this.state.seg === 2 ? styles.text_on : styles.text_off}>Carrier</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content padder bounces={false} scrollEnabled={false}>

          {/* ---------------------------------- Buyer segment ---------------------------------- */}
          {!this.state.buyer_choosePlace && !this.state.carrier_choosePlaces && this.state.seg === 1 && <BuyerMain get = {this.buyerMainGet} change = {this.buyerMainChange} navigation = {this.props.navigation}/>}
          {!this.state.buyer_choosePlace && !this.state.carrier_choosePlaces && this.state.seg === 2 && <CarrierMain func = {this.componentWillMount} get = {this.carrierMainGet} change = {this.carrierMainChange} navigation = {this.props.navigation}/>}
          </Content>
    </Container>
    );
  }
}
}
export default Main;
