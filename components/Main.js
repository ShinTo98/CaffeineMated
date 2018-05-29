import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl, ListView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem, Toast } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, cancelByCarrier, getProfileDetailById, createOrder} from './../database.js';
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
  }
  }


  // For swipable list delete one row
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.order_data];
    newData.splice(rowId, 1);
    this.setState({ order_data: newData });
  }

  async saveRequestIds() {
    this.setState({ids: await viewPendingOrders()});
    //console.log(this.state.ids);
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

  GetTime() {
    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    if(hour <= 11)
    {
      TimeType = 'am';
    }
    else{
      TimeType = 'pm';
    }
    if( hour > 12 )
    {
      hour = hour - 12;
    }
    if( hour == 0 )
    {
        hour = 12;
    }
    minutes = date.getMinutes();

    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    return fullTime
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

    if(this.props.navigation.getParam('selection') != undefined) {
      var latest = this.props.navigation.getParam('data');
      if (this.props.navigation.getParam('update') == true) {
        latest.push({
          name: this.props.navigation.getParam('name'),
          image: this.props.navigation.getParam('image'),
          selection: this.props.navigation.getParam('selection'),
        });
      }
      this.setState({order_data: latest});
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
  }


  _handleCarrierDatePicked = (date) => {
    console.log('A date has been picked: ', date.toString());
    // Extract the hr:min part
    var time = date.toString().substring(16, 21);
    this.setState({carrier_time: time});
    this.setState({carrier_whenLogan: time});
    this._hideDateTimePicker();
    Toast.show({
      text: "Time choosing successfull!",
    });
  };



  createProcess = (num) => {
    let dots = []
    for (var i = 1; i <= 4; i++) {

      if (num >= i) {
        dots.push((<IconVector key={i} name='dot-single' style={styles.icon}/>));
      } else {
        dots.push((<IconVector key={i} name='dot-single'/>));
      }

		}
    return dots
  }



  update = () => {
    //console.log(this.state.selected_order);
    updateOrderStatus(this.state.selected_order);
    this.setState({delivering: true})
  }

  complete = () => {
    completeOrder(this.state.selected_order, "01");
    this.setState({request_selected: false, accepted: false, delivering: false,order_selecting: undefined,selecting_order: false,selected_order: -1});

    this.componentWillMount();
  }



  updateOrderSubmitted = (val) => {
    this.setState({ orderSubmitted: val });
  }

  cancelCarrier = () => {
    date = new Date();
    if(date.getHours() != this.state.carrier_accept_hour && this.state.carrier_accept_minute != 59) {
      console.log("can not cancel")
    }
    else if (date.getMinutes() != this.state.carrier_accept_minute && this.state.carrier_accept_second != 30){
      console.log("can not cancel")
    }
    else if (date.getSeconds() - this.state.carrier_accept_second >= 30) {
      console.log("can not cancel")
    }
    else {
      cancelByCarrier(this.state.selected_order);
      this.setState({accepted: false, delivering: false,order_selecting: undefined,selecting_order: false,selected_order: -1});
    }
  }



  placeChooseChange(id, location){
    if( id == 0){
      this.setState({buyer_whereLogan : location,
                     buyer_choosePlaces: false});
      console.log("from main" + this.state.buyer_whereLogan);

    }else{
      this.setState({carrier_whereLogan : location,
                     carrier_choosePlaces: false});
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
          {!this.state.buyer_choosePlace && !this.state.carrier_choosePlaces && this.state.seg === 2 && <CarrierMain get = {this.carrierMainGet} change = {this.carrierMainChange} navigation = {this.props.navigation}/>}
          </Content>
          {/*}
            <Container style = {styles.Container}>

            {/* ------------------------------- Order submitted page ------------------------------- */}
            {/*this.state.orderSubmitted &&
              <SubmitOrder
              updateOrderSubmitted={this.updateOrderSubmitted}
              order_data={this.state.order_data}
              orderId={this.state.orderId}
              />
            }

            {/* ---------------------------------- Ordering page ---------------------------------- */}
            {/*!this.state.orderSubmitted &&
              <View style= {styles.banner}>
              {/* When & Where section 
              <Item regular style={styles.textInput}>
                <Button iconLeft style={styles.Whenbutton} onPress={this._showDateTimePicker}>
                  <Icon style={styles.Whenwheretext} name='alarm' />
                  <Text style={styles.Whenwheretext}>{this.state.whenLogan}</Text>
                  </Button>
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    titleIOS='Pick a time'
                    is24Hour={true}
                    timeZoneOffsetInMinutes={-7 * 60}
                  />
              </Item>
              <Item regular style={styles.textInput}>
                <Button iconRight style={styles.Wherebutton} onPress={() => this.setState({choosePlaces: true})}>
                  <Text style={styles.Whenwheretext}>{this.state.whereLogan}</Text>
                  <Icon style={styles.Whenwheretext} name='navigate' />
                  </Button>
              </Item>

              {/* Menu button section */}
              {/*}
              <View style={styles.buttonItem}>
              <Button
                style={styles.buttons_menu}
                color="#ffffff"
                onPress={() => this.props.navigation.navigate('menu', {
                  data: this.state.order_data,
                })}
              > <Text style={styles.menuText}> Menu </Text>
              </Button>
              </View>


              <View regular style={styles.orderItem}>
                <Text style={styles.orderDetailText}> Order Details </Text>
                <View style={styles.line}/>
                <View>
                {order_exists &&
                  <List
                    dataSource={this.ds.cloneWithRows(this.state.order_data)}
                    renderRow={data =>
                      <ListItem style={{borderColor: '#FFFFFF', marginLeft: 20, marginTop: -10, marginBottom: -10}}>
                        <Card style={styles.orderCard}>
                          <View style = {{flexDirection: 'row'}}>
                          <Left>
                            <Thumbnail style={{marginTop: 8, marginBottom: 8, left: 10}} source={{uri: data.image}} />
                          </Left>

                          <View style = {styles.cardTextView}>
                            <Text style ={styles.cardPrimaryText}>
                              {data.name}
                            </Text>
                            <Text style ={styles.cardSecondaryText}>
                              {data.selection[0]}
                            </Text>
                          </View>
                          </View>
                        </Card>
                      </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                      <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                        <Icon active name="trash" />
                      </Button>}
                    rightOpenValue={-75}
                  />
                }
                {!order_exists &&
                    <Text style={styles.nothingText}>
                      Nothing yet: ) {'\n'} Click menu to place your first order
                      </Text>
                }
                </View>
              </View>
            {/* Submit button section */}
            {/*}
              <View style={styles.buttonItem}>
              <Button
                style={styles.buttons_submit}
                color="#ffffff"
                onPress={() => this.setState({orderSubmitted: true})}
              > <Text style={styles.submitText}> Submit </Text>
              </Button>
              </View>

              </View>
            }
            </Container>
          }

          {/* ---------------------------------- Requester segment ---------------------------------- */}
          {/*
            this.state.seg === 2 && <Container style = {styles.Container}>

            {/* ---------------------------------- Order Card ---------------------------------- */}

            {/*this.state.selecting_order &&
              <Content scrollEnabled={false}>
              <Card>
                <CardItem header>

                  <Button transparent onPress={() => this.setState({selecting_order: false})}>
                    <Icon name="arrow-back" style={styles.icon}/>
                  </Button>

                </CardItem>

                <View style={styles.cardLine}/>
                <CardItem>
                <Left>
                  {!this.state.order_selecting.avatar &&
                    <Thumbnail large source={require('../resources/avatar.png')}/>
                  }
                  {this.state.order_selecting.avatar &&
                    <Thumbnail large source={{uri: this.state.order_selecting.avatar}}/>
                  }
                  <Body>
                  <CardItem>
                  <Text style={styles.cardBuyerName}>
                    {this.state.order_selecting.buyer_name}
                  </Text>
                  </CardItem>
                  <CardItem>
                  {
                    this.createStars(this.state.order_selecting.buyer_rate)
                  }
                  </CardItem>
                  </Body>
                </Left>
                </CardItem>
                <View style={styles.cardLine}/>
                <CardItem>
                  <Text style={styles.card_title}>
                    Location:
                  </Text>
                  <Text>
                    {this.state.order_selecting.location}
                  </Text>
                </CardItem>
                <CardItem style={styles.row_card_item}>
                  <Text style={styles.card_title}>
                    Time:
                  </Text>
                  <Text>
                    {this.state.order_selecting.request_time}
                  </Text>
                </CardItem>
                {Object.values(this.state.order_selecting.items).map((item,key)=>
                  (

                  <CardItem key= {key}>
                  <Body>
                  <Text style={styles.card_title}>
                    {item.item_name}
                  </Text>

                  <Text>
                    {item.size}
                  </Text>

                  <Text>
                    {item.customization}
                  </Text>
                  </Body>
                  </CardItem>
                  ))
                }
                <CardItem footer>
                <Body>
                <Button
                  style={styles.buttons_confirm}
                  color="#ffffff"
                >
                  <Text style={styles.menuText}
                  onPress={() => this.setState({selected_order: this.state.order_selecting.id, selecting_order: false, request_selected: true})}>
                    Confirm
                  </Text>
                </Button>
                </Body>
                </CardItem>

              </Card>
              </Content>
            }

            {/* ---------------------------------- Regular Request Page ---------------------------------- */}

            {/*!this.state.selecting_order & !this.state.accepted &&
            <View style= {styles.banner}>

            <Item regular style={styles.textInput}>
              <Button iconLeft style={styles.Whenbutton} onPress={this._showDateTimePicker}>
                <Icon style={styles.Whenwheretext} name='alarm' />
                <Text style={styles.Whenwheretext}>{this.state.carrier_whenLogan}</Text>
                </Button>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleCarrierDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode='time'
                  titleIOS='Pick a time'
                  is24Hour={true}
                  timeZoneOffsetInMinutes={-7 * 60}
                />
            </Item>
            <Item regular style={styles.textInput}>
              <Button iconRight style={styles.Wherebutton} onPress={() => this.setState({carrier_choosePlaces: true})}>
                <Text style={styles.Whenwheretext}>{this.state.carrier_whereLogan}</Text>
                <Icon style={styles.Whenwheretext} name='navigate' />
                </Button>
            </Item>

            {/* ---------------------------------- Request List ---------------------------------- */}
{/*}
            <View regular style={styles.requestTitleItem}>
            <Label style = {styles.orderTitle}>
              Requests
            </Label>
            </View>


            <View scrollEnabled={false} style={styles.requestView}>
              {loading &&
                <Content refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }>
                 <List
                 scrollEnabled={false}
                  dataArray={this.state.request_data}
                  style= {styles.requestList}


                  renderRow={data =>
                    <ListItem
                    onPress={() => this.setState({order_selecting: data, selecting_order: true})}
                    selected = {data.id == this.state.selected_order}>
                      <Left style={styles.list_left_container}>
                        { !data.avatar &&
                          <Thumbnail  source={require('../resources/avatar.png')}/>
                        }
                        { data.avatar &&
                          <Thumbnail  source={{uri: data.avatar}}/>
                        }
                        <Text numberOfLines={1} style={{flex: 1, fontSize: 12}}>
                          {data.buyer_name}
                        </Text>
                      </Left>
                      <Body style={styles.list_body_container}>
                        {Object.values(data.items).map((item,key)=>
                          <Text style={styles.list_text} key={key}>
                            {item.item_name}
                          </Text>)
                        }
                      <Text numberOfLines={1} style={styles.list_text}>
                        {data.location}
                      </Text>
                      <Text style={styles.list_text}>
                        {data.request_time}
                      </Text>
                      </Body>


                    </ListItem>}
                  >
                  </List>
                </Content>
              }
              {
                !loading && <Content>
                  <Spinner color='#FF9052' />
                  </Content>
              }
            </View>


            {/* ---------------------------------- Accept Button ---------------------------------- */}
{/*}
            <View style={styles.acceptButtonItem}>
            <Button
              disabled = {!this.state.request_selected}
              style={styles.buttons_accept}
              color="#ffffff"
              onPress={() => this.accept() }
            >
              <Text style={this.state.request_selected? styles.menuText: styles.menuText_disabled}>
                Accept
              </Text>
            </Button>
            </View>


          </View>
        }

        {/* ---------------------------------- Delivering Page ---------------------------------- */}
{/*}
        {this.state.accepted &&
        <View style= {styles.banner}>


        <Item regular style={styles.DiliverTitleItem}>
        <Label style = {styles.orderTitle}>
          {!this.state.delivering ? 'Way To Shop': 'Delivering'}
        </Label>
        </Item>

        <Item regular style={styles.DiliverItem}>
        <View >
          <View style={styles.deliverProfile}>
            {!this.state.order_selecting.avatar &&
              <Thumbnail large source={require('../resources/avatar.png')}/>
            }
            {this.state.order_selecting.avatar &&
              <Thumbnail large source={{uri: this.state.order_selecting.avatar}}/>
            }
            <View>
              <Label style={styles.DeliverProfileText}>
                {this.state.order_selecting.buyer_name}
              </Label>
              <View style={styles.DeliverStarts}>
                {this.createStars(this.state.order_selecting.buyer_rate)}
              </View>
            </View>
          </View>
          <View style={styles.deliverItems}>
          {Object.values(this.state.order_selecting.items).map((item,key)=>
            (

            <View key= {key} style={styles.deliverItem}>
            <Text style={styles.card_title}>
              {item.item_name}
            </Text>
            <Text>
              {item.size}
            </Text>
            <Text>
              {item.customization}
            </Text>
            </View>
            ))
          }
          </View>
        </View>
        </Item>


        <Item regular style={styles.DiliverProcess}>
          <View style={styles.deliverLocation}>
            <View style={styles.process}>
              <Text>
                {this.GetTime()}
              </Text>
              <Text>
                {this.state.order_selecting.location}
              </Text> 
              <Text>
                {this.state.order_selecting.request_time}
              </Text>
            </View>
            <View style={styles.process}>
              {this.state.delivering? this.createProcess(3):this.createProcess(2)}
            </View>
          </View>
        </Item>


        <View style={styles.updateButtonItem}>
        {!this.state.delivering &&
          <Button
            style={styles.buttons_accept}
            color="#ffffff"
            onPress={() => this.update() }
          >
            <Text style={styles.menuText}>
              Update
            </Text>
          </Button>
        }
        {!this.state.delivering &&
          <Button
            style={styles.buttons_cancel}
            color="#ffffff"
            onPress={() => this.cancelCarrier() }
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </Button>
        }
        {this.state.delivering &&
          <Button
            style={styles.buttons_accept}
            color="#ffffff"
            onPress={() => this.complete() }
          >
            <Text style={styles.menuText}>
              Complete
            </Text>
          </Button>
        }
        </View>
      </View>
    }

    </Container>
    }

    </Content>
    </Container>
  */}
    </Container>
    );
  }
}
}
export default Main;
