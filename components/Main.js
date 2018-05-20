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
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail, RefreshControl,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus} from './../database.js';
import {styles} from '../CSS/Main.js';

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
      loadFinished: false,
      request_selected: false,
      refreshing: false,
      order_selecting: undefined,
      selecting_order: false,
      selected_order: -1,
      accepted: false,
      status: 1,
    };
    this.order_selected = {};
    this.order_to_id = {};

  }

  async saveRequestIds() {
    this.setState({ids: await viewPendingOrders()});
    //console.log(this.state.ids);

  }

  async saveRequestDetails() {
    this.setState({loadFinished: false});
    var received = [];
    for (id in this.state.ids) {
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
    console.log(this.state.request_data);
    this.setState({loadFinished: true});
  }


  async componentWillMount() {
    await this.saveRequestIds();
    await this.saveRequestDetails();
    console.log("This is from main  " + this.props.navigation.getParam('selection'));
  }

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
      stars.push((<Icon key={i} ios={iosStar} android={androidStar}/>));
		}
    return stars
  }

  accept = () => {
    this.setState({accepted: true, status: 2});
    acceptOrder(this.state.selected_order, "01");
    console.log(this.state.accepted);
  }

  update = () => {
    console.log(this.state.selected_order);
    updateOrderStatus(this.state.selected_order);
    cur = this.state.status + 1;
    this.setState({state: cur});
  }



  render() {
    const loading = this.state.loadFinished;
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
            <View style= {styles.banner}>
            <Item regular style={styles.textInput}>
              <Input placeholder='Where...' placeholderTextColor="gray" style={styles.subText} onChangeText={(text) => this.setState({where: text})}
              />
              <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="clock" />
              </Button>
            </Item >
            <View style={styles.buttonItem}>
            <Button
              style={styles.buttons_menu}
              color="#ffffff"
              onPress={() => this.props.navigation.navigate('menu')}
            > <Text style={styles.menuText}> Menu </Text>
            </Button>
            </View>

            <Item regular style={styles.orderItem}>

              <Label style = {styles.orderTitle}>
                Orders
              </Label>

            </Item>

            <View style={styles.buttonItem}>
            <Button
              style={styles.buttons_submit}
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}
            > <Text style={styles.menuText}> Submit </Text>
            </Button>
            </View>

            </View>

            </Container>
          }

          {
            this.state.seg === 2 && <Container style = {styles.Container}>

            {this.state.selecting_order &&
              <Card style={styles.card}>
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

                <View style={styles.buttonItem}>
                <Button
                  style={styles.buttons_accept}
                  color="#ffffff"
                >
                  <Text style={styles.menuText}
                  onPress={() => this.setState({selected_order: this.state.order_selecting.id, selecting_order: false, request_selected: true})}>
                    Comfirm
                  </Text>
                </Button>
                </View>

              </Card>
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
                 <List
                  dataArray={this.state.request_data}
                  //refreshControl =
                  // {<RefreshControl
                  //   refreshing = {this.state.refreshing}
                  //   onRefresh = {() => this.setState({refreshing: true}), console.log("hi")}
                  // />}
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
                  />
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


        <Item regular style={styles.requestTitleItem}>
        <Label style = {styles.orderTitle}>
          Request
        </Label>
        </Item>

        <Label style = {styles.orderTitle}>
          {this.state.status}
        </Label>
        <Item regular style={styles.requestItem}>

        </Item>
        <View style={styles.buttonItem}>
        <Button
          disabled = {!this.state.request_selected}
          style={styles.buttons_accept}
          color="#ffffff"
          onPress={() => this.update() }
        >
          <Text style={styles.menuText}>
            Update
          </Text>
        </Button>
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
