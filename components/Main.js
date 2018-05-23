import React, {Component} from 'react';
// import {
//  Button,
//  StyleSheet,
//  View,
//  Text,
//  Image,
//  TextInput,
//  KeyboardAvoidingView,
//  TouchableWithoutFeedback
// } from 'react-native';
import { TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder} from './../database.js';
import {styles} from '../CSS/Main.js';
import SubmitOrder from './SubmitOrder.js';
import IconVector from 'react-native-vector-icons/Entypo';


export class Main extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
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
      orderSubmitted: false
    };
    this.order_selected = {};
    this.order_to_id = {};

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
      console.log(this.state.order_data);
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.toString());
    // Extract the hr:min part
    var time = date.toString().substring(16, 21);
    this.setState({time: time});
    this._hideDateTimePicker();
  };

  createStars = (num) => {
    let stars = []
    for (var i = 1; i <= 5; i++) {

      let iosStar = 'ios-star';
      let androidStar = 'md-star';

      if (num - 1 > 0) {
        iosStar = 'ios-star';
        androidStar = 'md-star';
      } else if ( num - 0.5 == 0) {
        iosStar = 'ios-star-half';
        androidStar = 'md-star-half';
      } else {
        iosStar = 'ios-star-outline';
        androidStar = 'md-star-outline';
      }
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
    this.setState({accepted: true});
    acceptOrder(this.state.selected_order, "01");
    console.log(this.state.accepted);
  }

  update = () => {
    console.log(this.state.selected_order);
    updateOrderStatus(this.state.selected_order);
    this.setState({delivering: true})
  }

  complete = () => {
    completeOrder(this.state.selected_order, "01");
    this.setState({accepted: false, delivering: false,order_selecting: undefined,selecting_order: false,selected_order: -1});

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


  render() {
    const loading = this.state.loadFinished;
    const order_exists = this.state.order_exists;
    return (
      <Container style={styles.color_theme}>
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

        <Content padder bounces={false} scrollEnabled={false}>
          {this.state.seg === 1 &&

            <Container style = {styles.Container}>

            {this.state.orderSubmitted &&
              <SubmitOrder
              updateOrderSubmitted={this.updateOrderSubmitted}
              order_data={this.state.order_data}
              />
            }

            {!this.state.orderSubmitted &&


              <View style= {styles.banner}>
              <Item regular style={styles.textInput}>
              {/*}  <Input placeholder='Where...' placeholderTextColor="gray" style={styles.subText} onChangeText={(text) => this.setState({where: text})}
                /> */}

                <View style={styles.floatView}>
                  <GooglePlacesAutocomplete
                    placeholder='Where...'
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      console.log(data);
                      this.setState({location: data.description});
                      console.log(this.state);
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
                </View>

                <View style={styles.timeButton}>
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                <Icon style={styles.icon} name="clock" />
                  </TouchableOpacity>
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
                {/*<Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={styles.icon} name="clock" />
                </Button> */}
              </Item >
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

              {/* ------------------------ Order item display section ------------------------ */}
              <Item regular style={styles.orderTitleItem}>
              <Label style = {styles.orderTitle}>
                Orders
              </Label>
              </Item>

              <Item regular style={styles.orderItem}>
                <Item>
                {order_exists &&
                   <List
                    dataArray={this.state.order_data}
                    renderRow={data =>
                      <ListItem>
                        <Left style={styles.list_left_container}>
                          <Thumbnail source={{uri: data.image}}/>
                        </Left>
                        <Body style={styles.list_body_container}>
                        <Text style={styles.list_text}>
                          {data.name}
                        </Text>
                        </Body>
                      </ListItem>}
                    />
                }{
                  !order_exists &&
                    <Text style={styles.nothingText}>
                      Nothing yet: ) {'\n'} Click menu to place your first order
                      </Text>
                }
                </Item>
              </Item>

              <View style={styles.buttonItem}>
              <Button
                style={styles.buttons_submit}
                color="#ffffff"
                onPress={() => this.setState({orderSubmitted: true})}
              > <Text style={styles.menuText}> Submit </Text>
              </Button>
              </View>

              </View>
            }
            </Container>
          }

          {
            this.state.seg === 2 && <Container style = {styles.Container}>

            {this.state.selecting_order &&
              <Content scrollEnabled={false}>
              <Card>
                <CardItem header>
                  <Button transparent onPress={() => this.setState({selecting_order: false})}>
                    <Icon name="arrow-back" style={styles.icon}/>
                    </Button>
                </CardItem>
                <CardItem>
                  <Thumbnail square large source={require('../resources/avatar.png')}/>

                  <Text>
                    {this.state.order_selecting.buyer_id}
                  </Text>
                </CardItem>
                <CardItem>
                  {
                    this.createStars(this.state.order_selecting.buyer_rate)
                  }
                </CardItem>
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
                    Comfirm
                  </Text>
                </Button>
                </Body>
                </CardItem>

              </Card>
              </Content>
            }


            {!this.state.selecting_order & !this.state.accepted &&
            <View style= {styles.banner}>
            <Item regular style={styles.textInput}>
              <Input placeholder='Where...' placeholderTextColor="gray" style={styles.subText} onChangeText={(text) => this.setState({where: text})}
              />
              <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="clock" />
              </Button>
            </Item >


            <Item regular style={styles.requestTitleItem}>
            <Label style = {styles.orderTitle}>
              Requests
            </Label>
            </Item>


            <Item regular style={styles.requestItem}>

              {loading &&
                <Content refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }>
                 <List
                  dataArray={this.state.request_data}


                  renderRow={data =>
                    <ListItem
                    onPress={() => this.setState({order_selecting: data, selecting_order: true})}
                    selected = {data.id == this.state.selected_order}>
                      <Left style={styles.list_left_container}>
                        <Thumbnail square small source={require('../resources/avatar.png')}/>
                        <Text style={{fontSize: 12}}>
                          {data.buyer_id}
                        </Text>
                      </Left>
                      <Body style={styles.list_body_container}>
                        {Object.values(data.items).map((item,key)=>
                          <Text style={styles.list_text} key={key}>
                            {item.item_name}
                          </Text>)
                        }
                      <Text style={styles.list_text}>
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

            </Item>
            <View style={styles.buttonItem}>
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
            <Thumbnail square large source={require('../resources/avatar.png')}/>
            <View>
              <Label style={styles.DeliverProfileText}>
                {this.state.order_selecting.buyer_id}
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
    );
  }
}
export default Main;
