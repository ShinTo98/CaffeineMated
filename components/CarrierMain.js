import React, {Component} from 'react';
import {  ScrollView,TouchableOpacity, Image, RefreshControl, ListView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Footer, FooterTab, Grid, Row, Col, Container, Header, Left, Body, Right,
  Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List,
  ListItem, Spinner, Thumbnail,Card, CardItem} from 'native-base';
import {sortOrdersByDistance, sortOrdersByRequestTime,viewPendingOrders,
  viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder,
  cancelByCarrier, getProfileDetailById, createOrder} from './../database.js';
import {styles} from '../CSS/CarrierMain.js';
import SubmitOrder from './SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';
import {OrderCompleted} from './OrderCompleted.js';

/*
 * Filename: CarrierMain.js
 * Version: 0.1.0
 * Description: This component will display the carrier main page, as well as
 *              functions to update carrier status and pending orders.
 */

export class CarrierMain extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state={
      isDateTimePickerVisible:false,
      loading:false,
      rating: false,
      rating_order: undefined,
      refreshing: false,
      progressText: 'Order Progress: Buying the drink',
      progressNum: 1,
    }

    this.createStars = this.createStars.bind(this);
    this.changeStates = this.changeStates.bind(this);
    this.OrderCompletedChange = this.OrderCompletedChange.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  /*
   *  This function update states after the user choose a time.
   */
  _handleDatePicked = (date) => {
    // Extract the hr:min part
    var time = date.toString().substring(16, 21);
    this.props.change("carrier_whenLogan", time);
    this._hideDateTimePicker();
  };

  /*
   *  This function update states after the user choose a location.
   */
  navigatePlace(lc){
    this.setState({location: lc});
  }

  /*
   *  This function update states and call backend function after the user clicks the accept button.
   */
  accept = () => {
    date = new Date();
    this.changeStates(["accepted", "carrier_accept_hour","carrier_accept_minute",
                      "carrier_accept_second"],
                      [true,date.getHours(),date.getMinutes(),date.getSeconds()]);
    acceptOrder(this.props.get('selected_order'));
    this.setState({progressNum:2})
  }

  /*
   *  This function return the status bar.
   */
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


  /*
   *  This function update states and call backend function after the user clicks the cancel button.
   */
  cancelCarrier = () => {
    date = new Date();
    if(date.getHours() != this.props.get('carrier_accept_hour') && this.props.get('carrier_accept_minute') != 59) {
      alert("Can not cancel after 30 seconds!")
    }
    else if (date.getMinutes() != this.props.get('carrier_accept_minute') && this.props.get('carrier_accept_second') != 30){
      alert("Can not cancel after 30 seconds!")
    }
    else if (date.getSeconds() - this.props.get('carrier_accept_second') >= 30) {
      alert("Can not cancel after 30 seconds!")
    }
    else {
      cancelByCarrier(this.props.get('selected_order'));
      this.changeStates(['accepted','delivering','order_selecting','selecting_order','selected_order', 'request_selected'], [false, false,undefined, false, -1, false]);
    }
  }

  /*
   *  This function parse the current time.
   */
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

  /*
   *  This function update states and call backend function after the user clicks the update button.
   */
  update = () => {
    updateOrderStatus(this.props.get('selected_order'));
    this.props.change("delivering", true);
    this.setState({progressNum:3, progressText:'Delivering the drink'})
  }

  /*
   *  This function update states and call backend function after the user clicks the complete button.
   */
  complete = () => {
    completeOrder(this.props.get('selected_order'));
    this.setState({rating_order: this.props.get('order_selecting'), rating: true});

    this.changeStates(["request_selected", "accepted", "delivering","order_selecting","selecting_order","selected_order"],[false, false, false, undefined,false,-1]);

    this.props.func();

    this.setState({progressNum:4})

    this.fetchData();
  }


  /*
   *  This function return the rating star.
   */
  createStars = (num) => {
    let stars = []
    for (var i = 0; i <= 4; i++) {

      let iosStar = 'ios-star';
      let androidStar = 'md-star';

      if (num - 1 >= 0) {
        iosStar = 'ios-star';
        androidStar = 'md-star';
      } else if ( num - 0.5 >= 0) {
        iosStar = 'ios-star-half';
        androidStar = 'md-star-half';
      } else {
        iosStar = 'ios-star-outline';
        androidStar = 'md-star-outline';
      }
      num -= 1
      stars.push((<Icon key={i} ios={iosStar} android={androidStar} style={styles.icon}/>));
    }
    return stars
  }

  /*
   *  This function return the status bar.
   */
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

  /*
   *  This function handles list's refreshing and fetch data.
   */
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false})
    });
  }

  /*
   *  This function is a prototype of change state in main.js.
   */
  changeStates(ids, values){
    for( var i = 0; i < ids.length; i++){
      this.props.change(ids[i], values[i]);
    }
  }

  /*
   *  This function updates the data.
   */
  async fetchData() {
    await this.saveRequestIds();
    await this.saveRequestDetails();
  }

  /*
   *  This function updates the pending order ids.
   */
  async saveRequestIds() {
    if( this.props.get('carrier_whereLogan') != 'Specify a place'){
      this.props.change('ids', await sortOrdersByDistance(this.props.get('carrier_whereLogan')));
      this.setState({ids: this.props.get('ids')});
    }else{
      this.props.change("ids", await sortOrdersByRequestTime());
      this.setState({ids: await sortOrdersByRequestTime()});
    }
  }

  /*
   * This function save the order detail of each pending order.
   */
  async saveRequestDetails() {
    var received = [];
    for (let id of this.props.get('ids')) {

      order = await viewOrderDetailById(id);
      profile = await getProfileDetailById(order.buyer_id);
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
    }
    this.props.change("request_data", received);
  }

  /*
   * This function handles conditional rendering after completing the rating.
   */
  OrderCompletedChange(id, value) {
    if (id == 'rating') {
      this.setState({rating: value});
    }
    if (id == 'rating_order') {
      this.setState({rating_order: value});
    }
  }

  /*
   * This function renders the component
   */
  render(){

    const loading = this.props.get('loadFinished');

    {/* ------------------------- Order detial while selecting ---------------------------------- */}
    if(!this.state.rating && this.props.get('selecting_order')){
      return (

        <Container style={styles.bigContainer}>

          <Header>
            <Left>
              <Button transparent onPress={() => this.props.change('selecting_order', false)}>
                <Icon name="arrow-back" style={styles.icon}/>
              </Button>
            </Left>

            <Body>
              <Text style={styles.orderDetailTitle}>Order Detail</Text>
            </Body>
          </Header>

        < Container>

        {/* ------------------------- Order detial ---------------------------------- */}
        <ScrollView>
          <Grid>
            <Col>
              {!this.props.get('order_selecting.avatar') &&
                <Thumbnail large source={require('../resources/avatar.png')}/>
              }
              {this.props.get('order_selecting.avatar') &&
                <Thumbnail large source={{uri: this.props.get('order_selecting.avatar')}}/>
              }
            </Col>

            <Col>
              <Row>
                <Text style={styles.cardBuyerName}>
                  {this.props.get('order_selecting.buyer_name')}
                </Text>
              </Row>
              <Row>
                {
                  this.createStars(this.props.get('order_selecting.buyer_rate'))
                }
              </Row>
            </Col>
          </Grid>

          <Grid style={{height: '30%'}}>
            <Row>
              <Col style={{flexDirection:'wrap'}}>
                <Icon name='ios-compass' size={20} style={styles.icons}/>
              </Col>
              <Col style={{width: '60%', alignSelf: 'flex-end', alignContent: 'flex-start'}}>
                <Text style={styles.order_select}>
                  {this.props.get('order_selecting.location')}
                </Text>
              </Col>
            </Row>

            <Row>
              <Col style={{width:'40%'}}>
                <Icon name='ios-time' size={20} style={styles.icons} />
              </Col>
              <Col style={{alignSelf: 'flex-end', alignContent: 'flex-start'}}>
                <Text style={styles.order_select}>
                  {this.props.get('order_selecting.request_time')}
                </Text>
              </Col>
            </Row>
          </Grid>

    {/* ------------------------- order items ---------------------------------- */}
    {
      this.props.get("order_selecting.items").map(function (item, key){
        var itemSelf = item.itemObject;
        return(
          <Card style={styles.orderCard}>
            <Grid>
              <Col style={{ width: '25%', flexWrap:'wrap'}}>
                <Row>
                  <Text style ={styles.cardPrimaryText}>
                    {item.name}
                  </Text>
                </Row>

                <Row>
                  <Thumbnail style={styles.itemImage} source={{uri: item.image}} />
                </Row>
              </Col>

              <Col style={{ flexWrap: 'wrap'}}>
                {

                  (Object.keys(item.itemObject)).map(function (itemKey,key){
                    return(
                      <Row key={key}>

                        <Col>
                          <Text style={styles.cardSecondaryText}>{itemKey}</Text>
                        </Col>

                        <Col>
                          <Text style={styles.cardSecondaryText}>{item.itemObject[itemKey]}</Text>
                        </Col>
                      </Row>
                    )
                  })
                }

              </Col>
            </Grid>
          </Card>
        )}
        )
      }
      </ScrollView>
    </Container>


    <Footer style={styles.footerStyle}>
      <FooterTab style={{height: '100%'}}>
        <Button style={styles.confirmButton}
          onPress={() => this.changeStates(["selected_order","selecting_order", "request_selected"],
                                         [this.props.get("order_selecting.id"), false,true])}>
            <Text style={{color: '#FFFFFF', fontSize: 22, padding: '20%'}}>Confirm</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
  );

  {/* ------------------------- carrier main page with pending list ---------------------------------- */}
  else if(!this.state.rating && !this.props.get('accepted')){
    return(
      <Container style = {{height: '100%'}}>
        <View style= {styles.banner}>

          <View style={styles.textInput}>
            <Button iconLeft style={styles.Whenbutton} onPress={this._showDateTimePicker}>
              <Icon style={styles.Whenwheretext} name='alarm' />
                <Text style={styles.Whenwheretext}>{this.props.get('carrier_whenLogan')}</Text>
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
          </View>

          <View style={styles.textInput}>
            <Button iconRight style={styles.Wherebutton} onPress={()=>
                              {this.props.change('carrier_choosePlaces', true)}}>
                              <Text numberOfLines={1} style={styles.Whenwheretext2}>{this.props.get('carrier_whereLogan')}</Text>
              <Icon style={styles.Whenwheretext} name='navigate' />
            </Button>
          </View>

        {/* ---------------------------------- Request List ---------------------------------- */}
        <View style={styles.requestItem}>
          <View style={styles.requestTitleText}>
            <Text style = {styles.requestText}>
              Requests
            </Text>
          </View>


          <Container scrollEnabled={false}>
            {loading && <Content refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
          <Container style={styles.list}>

          <List
            dataArray={this.props.get("request_data")}
            contentContainerStyle= {styles.requestList}


            renderRow={data =>
              <ListItem
                onPress={() => this.changeStates(["order_selecting","selecting_order"], [data, true])}
                style = {((data.id == this.props.get("selected_order")? styles.selectedCell: styles.normalCell))}>

              <Container style = {styles.cardRow}>

                <Container style={{ width: '15%', alignItems: 'center'}}>
                  { !data.avatar &&
                    <Thumbnail style={styles.itemImage} source={require('../resources/avatar.png')}/>
                  }
                { data.avatar &&
                  <Thumbnail style={styles.itemImage} source={{uri: data.avatar}}/>
                }
                </Container>

                <Container style ={{flexWrap: 'wrap', width:'80%', flexDirection: 'flex-end', marginBottom: 0}}>

                  <Text style ={styles.cardPrimaryText}>
                    {data.buyer_name}
                  </Text>

                  <Text style ={styles.cardSecondaryText}>
                    {data.location}
                  </Text>

                  <Text style ={styles.cardSecondaryText}>
                    {data.request_time}
                  </Text>
                </Container>

              </Container>

            </ListItem>}
            />
          </Container>
        </Content>
        }

        {/* ------------------------- order is loading ---------------------------------- */}
          {
            !loading && <Content>
              <Spinner style={{marginLeft: '53%'}} color='#FF9052' />
            </Content>
          }
        </Container>
      </View>


      {/* ---------------------------------- Accept Button ---------------------------------- */}

      <View style={styles.acceptButtonItem}>

        <Button
          disabled = {!this.props.get('request_selected')}
          style={this.props.get('request_selected')? styles.buttons_accept : styles.buttons_accept_disabled}
          color="#ffffff"
          onPress={() => this.accept() }
        >
          <Text style={this.props.get('request_selected')? styles.menuTextSelected: styles.menuText_disabled}>
            Accept
          </Text>
        </Button>
      </View>


      </View>
    </Container>);
  }

  {/* ---------------------------------- Rating ---------------------------------- */}
  else if (this.state.rating) {
    return <OrderCompleted user_id={this.state.rating_order.buyer_id} order_id={this.state.rating_order.id} user_name={this.state.rating_order.buyer_name} isBuyer={true} img={this.state.rating_order.avatar} change={this.OrderCompletedChange}/>
  }


  {/* ---------------------------------- Update page ---------------------------------- */}
  else if(this.props.get("accepted")){
    return (
      <Container style={styles.deliver_container}>
        <Item regular style={styles.DiliverTitleItem}>
          <Label style = {styles.orderTitle}>
            {!this.props.get('delivering') ? 'Ordering': 'Delivering'}
          </Label>
        </Item>

        <Container style={styles.deliver_scroll_container}>
          <ScrollView style = {styles.deliver_scroll_view}>
            <Grid>
              <Col>
                {!this.props.get('order_selecting.avatar') &&
                  <Thumbnail large source={require('../resources/avatar.png')}/>
                }

                {this.props.get('order_selecting.avatar') &&
                  <Thumbnail large source={{uri: this.props.get('order_selecting.avatar')}}/>
                }
              </Col>
            <Col>
              <Row>
                <Text style={styles.cardBuyerName}>
                  {this.props.get('order_selecting.buyer_name')}
                </Text>
              </Row>

              <Row>
                {
                  this.createStars(this.props.get('order_selecting.buyer_rate'))
                }
              </Row>
            </Col>
          </Grid>

          <Grid style={{height: '30%'}}>
            <Row>
              <Col style={{flexDirection:'wrap'}}>
                <Icon name='ios-compass' size={20} style={styles.icons}/>
              </Col>

              <Col style={{width: '60%', alignSelf: 'flex-end', alignContent: 'flex-start'}}>
                <Text style={styles.order_select}>
                  {this.props.get('order_selecting.location')}
                </Text>
              </Col>
            </Row>

            <Row>
              <Col style={{width:'40%'}}>
                <Icon name='ios-time' size={20} style={styles.icons} />
              </Col>

              <Col style={{width: '60%', alignSelf: 'flex-end', alignContent: 'flex-start'}}>
                <Text style={styles.order_select}>
                  {this.props.get('order_selecting.request_time')}
                </Text>
              </Col>
            </Row>
          </Grid>

          {/* --------------------------- item card list --------------------------- */}
          <View style={styles.cardLine}/>
            {
              this.props.get("order_selecting.items").map(function (item, key){
                var itemSelf = item.itemObject;
                return(

                  <Card style={styles.deliver_orderCard}>
                    <View style = {{flexDirection: 'row'}}>
                  <Grid >

                  <Col style={{width: '25%', flexWrap:'wrap'}}>
                    <Row>
                      <Text style ={styles.cardPrimaryText}>
                        {item.name}
                      </Text>
                    </Row>

                    <Row>
                      <Thumbnail style={styles.itemImage} source={{uri: item.image}} />
                    </Row>
                  </Col>

                  <Col style={{width: '78%', flexWrap: 'wrap'}}>
                    <View style = {styles.cardTextView}>
                      {

                        (Object.keys(item.itemObject)).map(function (itemKey,key){
                          return(
                            <Row key={key}>
                              <Col>
                                <Text style={styles.cardSecondaryText}>{itemKey}</Text>
                              </Col>

                              <Col>
                                <Text style={styles.cardSecondaryText}>{item.itemObject[itemKey]}</Text>
                              </Col>
                            </Row>
                          )
                        })
                      }
                    </View>
                  </Col>
                </Grid>
              </View>
            </Card>)
            }
          )
        }

        <Grid>
          <Container style={styles.filler}>
            {!this.props.get('delivering') &&
              <Button
                style={styles.buttons_cancel}
                onPress={() => this.cancelCarrier() }
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </Button>
            }
          </Container>
        </Grid>

      </ScrollView>
    </Container>

    <View style={styles.progressBarView}>

      <View style= {styles.progressBar}>
        {this.updateProgressBar(this.state.progressNum)}
      </View>


      <Text style = {styles.progressText}>
        {this.state.progressText}
      </Text>
    </View>

    <View style={styles.updateButtonItem}>
      {!this.props.get('delivering') &&
        <Button
          style={styles.buttons_update}
          onPress={() => this.update() }
        >
          <Text style={styles.updateText}>
            Update
          </Text>
        </Button>
      }

      {this.props.get('delivering') &&
        <Button
          style={styles.buttons_update}
          onPress={() => this.complete() }
        >
          <Text style={styles.updateText}>
            Complete
          </Text>
        </Button>
      }
    </View>
    }

  </Container>);
  }
}
}

export default CarrierMain;
