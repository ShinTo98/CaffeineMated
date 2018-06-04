import React, {Component} from 'react';
import {  ScrollView,TouchableOpacity, Image, RefreshControl, ListView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Footer, FooterTab, Grid, Row, Col, Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem} from 'native-base';
import {sortOrdersByDistance, sortOrdersByRequestTime,viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, cancelByCarrier, getProfileDetailById, createOrder} from './../database.js';
import {styles} from '../CSS/CarrierMain.js';
import SubmitOrder from './SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';
import {OrderCompleted} from './OrderCompleted.js';

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

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date.toString());
        // Extract the hr:min part
        var time = date.toString().substring(16, 21);
        this.props.change("carrier_whenLogan", time);
        this._hideDateTimePicker();
    };


    navigatePlace(lc){
        this.setState({location: lc});
    }

    accept = () => {
        date = new Date();
        this.changeStates(["accepted", "carrier_accept_hour","carrier_accept_minute", "carrier_accept_second"], [true,date.getHours(),date.getMinutes(),date.getSeconds()]);
        acceptOrder(this.props.get('selected_order'));
        console.log("this is from carrierMain about selected_order" + this.props.get('selected_order'));
        this.setState({progressNum:2})
      }

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


      cancelCarrier = () => {
        date = new Date();
        if(date.getHours() != this.props.get('carrier_accept_hour') && this.props.get('carrier_accept_minute') != 59) {
          console.log("can not cancel")
          alert("Can not cancel after 30 seconds!")
        }
        else if (date.getMinutes() != this.props.get('carrier_accept_minute') && this.props.get('carrier_accept_second') != 30){
          console.log("can not cancel")
          alert("Can not cancel after 30 seconds!")
        }
        else if (date.getSeconds() - this.props.get('carrier_accept_second') >= 30) {
          console.log("can not cancel")
          alert("Can not cancel after 30 seconds!")
        }
        else {
          cancelByCarrier(this.props.get('selected_order'));
          this.changeStates(['accepted','delivering','order_selecting','selecting_order','selected_order'], [false, false,-1, false, -1]);
        }
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


      update = () => {
        //console.log(this.state.selected_order);
        updateOrderStatus(this.props.get('selected_order'));
        this.props.change("delivering", true);
        this.setState({progressNum:3, progressText:'Delivering the drink'})
      }

      complete = () => {
        completeOrder(this.props.get('selected_order'));
        this.setState({rating_order: this.props.get('order_selecting'), rating: true});

        this.changeStates(["request_selected", "accepted", "delivering","order_selecting","selecting_order","selected_order"],[false, false, false, undefined,false,-1]);

        this.props.func();

        this.setState({progressNum:4})

      }


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

    _onRefresh() {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
          this.setState({refreshing: false})
        });

      }

    changeStates(ids, values){
        for( var i = 0; i < ids.length; i++){
            console.log("This is values in changeStates" + values[i]);
            this.props.change(ids[i], values[i]);
        }
    }

    async fetchData() {
        await this.saveRequestIds();
        await this.saveRequestDetails();
        console.log("This is carrier Main about selected orders " + this.props.get("selected_order"));
    }

    async saveRequestIds() {
      if( this.props.get('carrier_whereLogan') != 'Specify a place'){
        this.props.change('ids', await sortOrdersByDistance(this.props.get('carrier_whereLogan')));
        this.setState({ids: this.props.get('ids')});
      }else{
        this.props.change("ids", await sortOrdersByRequestTime());
        this.setState({ids: await sortOrdersByRequestTime()});
      }
      console.log("this is in refresh in carrier Main" + this.props.get("ids"));
    }

      async saveRequestDetails() {
        var received = [];
        for (let id of this.props.get('ids')) {

          order = await viewOrderDetailById(id);
          //order.buyer_id = id;
          //console.log("this is id from carrier Main" + order.buyer_id);
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
          //if (this.props.get("order_selected.id") == undefined) {
            //this.props.change("order_selected.id",id);
          //}
        }
        this.props.change("request_data", received);
        //const d = this.state.ids.map(async id => {await viewOrderDetailById(id)});
        //console.log(d)
        //this.setState({data: async this.state.ids.map((id) => {await viewOrderDetailById(id))}});
        //console.log(this.state.request_data);
    }

    OrderCompletedChange(id, value) {
      if (id == 'rating') {
        this.setState({rating: value});
      }
      if (id == 'rating_order') {
        this.setState({rating_order: value});
      }
    }




    render(){
        const loading = this.props.get('loadFinished');
        console.log("this is from carrier Main about ids    " + this.props.get('ids'));
        console.log("This is carrier Main about selected orders in render" + this.props.get("selected_order"));
        if(!this.state.rating && this.props.get('selecting_order')){

            return (

              <Container>
                <Content >
                <Card style={{flexWrap: 'wrap'}}>
                <CardItem header>

                <Button transparent onPress={() => this.props.change('selecting_order', false)}>
                <Icon name="arrow-back" style={styles.icon}/>
                </Button>

                <Text style={styles.orderDetailTitle}>Order Detail</Text>

                </CardItem>

                <View style={styles.cardLine}/>
                <CardItem style={{height: '20%'}}>
                <Left>
                {!this.props.get('order_selecting.avatar') &&
                <Thumbnail large source={require('../resources/avatar.png')}/>
            }
            {this.props.get('order_selecting.avatar') &&
            <Thumbnail large source={{uri: this.props.get('order_selecting.avatar')}}/>
        }

        <Body>
        <CardItem>
        <Text style={styles.cardBuyerName}>
        {this.props.get('order_selecting.buyer_name')}
        </Text>
        </CardItem>
        <CardItem>
        {
            this.createStars(this.props.get('order_selecting.buyer_rate'))
        }
        </CardItem>
        </Body>
        </Left>
        </CardItem>

        <Grid style={styles.headerContainer}>
        <Row>
        <Col style={{width: '40%'}}>
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
        <View style={styles.cardLine}/>

        {
          this.props.get("order_selecting.items").map(function (item, key){
             var itemSelf = item.itemObject;
              return(
                <Card style={styles.orderCard}>
                  <View style = {{flexDirection: 'row'}}>
                    <Grid >
                      <Col style={{width: '23%', flexWrap:'wrap'}}>
                      <Row style={{height: '20%'}}>
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
                </Card>

              )
              }
              )
              }

       </Card>

       <View style={styles.bottom}>
                         <Button style={styles.buttons_accept}
                                      onPress={() => this.changeStates(["selected_order","selecting_order", "request_selected"], [this.props.get("order_selecting.id"), false,true])}>
                            <Text style={styles.menuTextSelected}>Confirm</Text>
                         </Button>

       </View>
    </Content>








    </Container>
);
}else if(!this.state.rating && !this.props.get('accepted')){
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
    <Button iconRight style={styles.Wherebutton} onPress={()=>{this.props.change('carrier_choosePlaces', true)}}>
    <Text style={styles.Whenwheretext}>{this.props.get('carrier_whereLogan')}</Text>
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


   <Container scrollEnabled={false}> {/*style={styles.requestItem}>*/}
    {loading &&
        <Content refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }>
        <View style={styles.list}>
        <List
        //scrollEnabled={false}
        dataArray={this.props.get("request_data")}
        contentContainerStyle= {styles.requestList}


        renderRow={data =>
            <ListItem
            onPress={() => this.changeStates(["order_selecting","selecting_order"], [data, true])}
            style = {((data.id == this.props.get("selected_order")? styles.selectedCell: styles.normalCell))}>
            <View style = {{flexDirection: 'row'}}>

              <Left>
                { !data.avatar &&
                              <Thumbnail style={styles.itemImage} source={require('../resources/avatar.png')}/>
                          }
                          { data.avatar &&
                              <Thumbnail style={styles.itemImage} source={{uri: data.avatar}}/>
                          }
              </Left>

              <View style = {styles.cardTextView}>
                <Text style ={styles.cardPrimaryText}>
                  {data.buyer_name}
                </Text>
                <Text style ={styles.cardSecondaryText}>
                  {data.location}
                </Text>
                <Text style ={styles.cardSecondaryText}>
                  {data.request_time}
                </Text>
              </View>
            </View>

            {/*<Left style={styles.list_left_container}>
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
            </Body>*/}


            </ListItem>}
            />
            </View>
            </Content>
        }
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
        </Container>
     );
    }
    else if (this.state.rating) {
      console.log(this.props.get('order_selecting'))
      return <OrderCompleted user_id={this.state.rating_order.buyer_id} order_id={this.state.rating_order.id} user_name={this.state.rating_order.buyer_name} isBuyer={false} img={this.state.rating_order.avatar} change={this.OrderCompletedChange}/>
    }

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

                       <View style={styles.cardLine}/>


                  {
                    this.props.get("order_selecting.items").map(function (item, key){
                       var itemSelf = item.itemObject;
                        return(

                          <Card style={styles.deliver_orderCard}>
                            <View style = {{flexDirection: 'row'}}>
                              <Grid >
                                <Col style={{width: '23%', flexWrap:'wrap'}}>
                                <Row style={{height: '20%'}}>
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
                          </Card>

                        )
                        }
                        )
                        }
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

            </Container>
        );
    }
    }
}


export default CarrierMain;
