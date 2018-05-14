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
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail } from 'native-base';
import {viewPendingOrders, viewOrderDetailById} from './../database.js';
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
    };

  }

  async saveRequestIds() {
    this.setState({ids: await viewPendingOrders()});
    //console.log(this.state.ids);

  }

  async saveRequestDetails() {
    this.setState({loadFinished: false});
    var received = [];
    for (id in this.state.ids) {
      received.push(await viewOrderDetailById(id));
    }
    this.setState({request_data: received});
    //const d = this.state.ids.map(async id => {await viewOrderDetailById(id)});
    //console.log(d)
    //this.setState({data: async this.state.ids.map((id) => {await viewOrderDetailById(id))}});
    //console.log(this.state.request_data);
    this.setState({loadFinished: true});

  }


  async componentWillMount() {
    await this.saveRequestIds();
    await this.saveRequestDetails();
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
                  renderRow={data =>
                    <ListItem>
                      <Left style={styles.list_left_container}>
                        <Thumbnail square small source={require('../resources/avatar.png')}/>
                        <Text style={{fontSize: 12}}>
                          {data.buyer_id}
                        </Text>
                      </Left>
                      <Body style={styles.list_body_container}>
                      <Text style={styles.list_text}>
                        Coffee
                      </Text>

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
              onPress={() => this.saveRequestDetails()}
            >
              <Text style={this.state.request_selected? styles.menuText: styles.menuText_disabled}>
                Accept
              </Text>
            </Button>
            </View>

            </View>

            </Container>
          }

        </Content>
      </Container>
    );
  }
}
export default Main;
