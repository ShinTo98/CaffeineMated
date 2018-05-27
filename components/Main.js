import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl, ListView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem, Toast } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder, cancelByCarrier, getProfileDetailById, createOrder} from './../database.js';
import {styles} from '../CSS/Main.js';
import SubmitOrder from './SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';


export class Main extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    // For swipable list
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
      location: 'Specify a place',
      time: 'Pick a time',
      refreshing: false,
      order_selecting: undefined,
      selecting_order: false,
      selected_order: -1,
      accepted: false,
      delivering: false,
      orderSubmitted: false,
      // for toggleing places choosing popup
      choosePlaces: false,
      carrier_choosePlaces: false,
      // for showing Toasts
      showToast: false,
      // for when & where logans
      whenLogan: 'Pick a time',
      whereLogan: 'Specify a place',
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
    console.log(this.state.ids);
  }

  async saveRequestDetails() {
    var received = [];
    for (let id of this.state.ids) {
      order = await viewOrderDetailById(id);
      order["id"] = id;
      profile = await getProfileDetailById(order.buyer_id)
      console.log(profile)
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

  async fetchData() {
    await this.saveRequestIds();
    await this.saveRequestDetails();
  }

  async componentWillMount() {
    this.setState({loadFinished: false});

    await this.saveRequestIds();
    await this.saveRequestDetails();
    this.setState({loadFinished: true});

    console.log(this.state.request_data)

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
      this.setState({location: this.props.navigation.getParam('location')});
      this.setState({time: this.props.navigation.getParam('time')});
      this.setState({order_data: latest});
      this.setState({order_exists: true});
      //console.log(this.state.order_data);
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.toString());
    // Extract the hr:min part
    var time = date.toString().substring(16, 21);
    this.setState({time: time});
    this.setState({whenLogan: time});
    this._hideDateTimePicker();
    Toast.show({
      text: "Time choosing successfull!",
    });
  };

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

  createStars = (num) => {
    let stars = []
    for (var i = 0; i <= 4; i++) {

      let iosStar = 'ios-star';
      let androidStar = 'md-star';

      if (num - 1 > 0) {
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

  accept = () => {
    date = new Date();
    this.setState({accepted: true, carrier_accept_hour: date.getHours(), carrier_accept_minute: date.getMinutes(), carrier_accept_second: date.getSeconds()});
    acceptOrder(this.state.selected_order, "01");
    //console.log(this.state.accepted);
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

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  updateOrderSubmitted = (val) => {
    this.setState({ orderSubmitted: val });
  }

  dataList = () => {

    return this.state.order_data.map((data) => {
      return (
        <View><Text>{data}</Text></View>
      )
    })

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

  submitValidityCheck = () => {
    if(this.state.location == '' || this.state.time == '') {
      Toast.show({
        text: 'Please fill out location & time!'
      });
    } else if(this.state.order_data.length == 0) {
      Toast.show({
        text: 'Please order at least one drink!'
      });
    } else {
      var id = createOrder(this.state.order_data, this.state.location, this.state.time);
      this.setState({orderId: id});
      this.setState({orderSubmitted: true});
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

    return (
      <Container style={styles.color_theme}>
      {/* --------------------------------- Place choosing popup ------------------------------- */}
      {this.state.choosePlaces &&
        <Container style={styles.placeAutocomplete}>
        <GooglePlacesAutocomplete
          placeholder='Where...'
          minLength={1} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            //console.log(data);
            // Get useful piece from data.description
            this.setState({location: data.description.toString().substring(0, data.description.toString().indexOf(','))});
            this.setState({whereLogan: data.description.toString().substring(0, data.description.toString().indexOf(','))});
            //console.log(this.state);
            this.setState({choosePlaces: false});
            Toast.show({
              text: "Places choosing successfull!",
            });
            //console.log(details)
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAfpH-uU6uH9r8pN4ye4jeunIDMavcxolo',
            language: 'en', // language of the results
            //types: '(cities)' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            listView: {
              backgroundColor: '#FFFFFF',
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          /*predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
          renderRightButton={() => <Text>Custom text after the inputg</Text>} */
        />
        </Container>
      }
      {this.state.carrier_choosePlaces &&
        <Container style={styles.placeAutocomplete}>
        <GooglePlacesAutocomplete
          placeholder='Where...'
          minLength={1} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            //console.log(data);
            // Get useful piece from data.description
            this.setState({carrier_location: data.description.toString().substring(0, data.description.toString().indexOf(','))});
            this.setState({carrier_whereLogan: data.description.toString().substring(0, data.description.toString().indexOf(','))});
            //console.log(this.state);
            this.setState({carrier_choosePlaces: false});
            Toast.show({
              text: "Places choosing successfull!",
            });
            //console.log(details)
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAfpH-uU6uH9r8pN4ye4jeunIDMavcxolo',
            language: 'en', // language of the results
            //types: '(cities)' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            listView: {
              backgroundColor: '#FFFFFF',
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          /*predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
          renderRightButton={() => <Text>Custom text after the inputg</Text>} */
        />
        </Container>
      }

      {/* ---------------------------------- Regular main page ---------------------------------- */}
      {(!this.state.choosePlaces & !this.state.carrier_choosePlaces) &&
        <Container>

        {/* ---------------------------------- Main page header ---------------------------------- */}
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
                //active={this.state.seg === 1 ? true : false}
                first
                onPress={() => this.setState({ seg: 1 })}
              >
                <Text style={this.state.seg === 1 ? styles.text_on : styles.text_off}>Buyer</Text>
              </Button>
              <Button
                style={this.state.seg === 2 ? styles.button_header_on : styles.button_header_off}
                last
                //active={this.state.seg === 1 ? true : false}
                onPress={() => this.setState({ seg: 2 })}
              >
                <Text style={this.state.seg === 2 ? styles.text_on : styles.text_off}>Carrier</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
          </Right>
        </Header>

        {/* ---------------------------------- Main page content ---------------------------------- */}
        <Content padder bounces={false} scrollEnabled={false}>

          {/* ---------------------------------- Buyer segment ---------------------------------- */}
          {this.state.seg === 1 &&
            <Container style = {styles.Container}>

            {/* ------------------------------- Order submitted page ------------------------------- */}
            {this.state.orderSubmitted &&
              <SubmitOrder
              updateOrderSubmitted={this.updateOrderSubmitted}
              order_data={this.state.order_data}
              orderId={this.state.orderId}
              />
            }

            {/* ---------------------------------- Ordering page ---------------------------------- */}
            {!this.state.orderSubmitted &&
              <View style= {styles.banner}>
              {/* When & Where section */}
              <Item regular style={styles.textInput}>
                <Button iconLeft style={styles.Whenbutton} onPress={this._showDateTimePicker}>
                  <Icon style={styles.Whenwheretext} name='alarm' />
                  <Text style={styles.Whenwheretext}>{this.state.time}</Text>
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
                  <Text style={styles.Whenwheretext}>{this.state.location}</Text>
                  <Icon style={styles.Whenwheretext} name='navigate' />
                  </Button>
              </Item>

              {/* Menu button section */}
              <View style={styles.buttonItem}>
              <Button
                style={styles.buttons_menu}
                color="#ffffff"
                onPress={() => this.props.navigation.navigate('menu', {
                  data: this.state.order_data,
                  location: this.state.location,
                  time: this.state.time,
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
              <View style={styles.buttonItem}>
              <Button
                style={styles.buttons_submit}
                color="#ffffff"
                onPress={this.submitValidityCheck}
              > <Text style={styles.submitText}> Submit </Text>
              </Button>
              </View>

              </View>
            }
            </Container>
          }

          {/* ---------------------------------- Requester segment ---------------------------------- */}
          {
            this.state.seg === 2 && <Container style = {styles.Container}>

            {/* ---------------------------------- Order Card ---------------------------------- */}

            {this.state.selecting_order &&
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

            {!this.state.selecting_order & !this.state.accepted &&
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
 }
    </Container>
    );
  }
}
export default Main;