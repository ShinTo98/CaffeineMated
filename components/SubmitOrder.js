import React, {Component} from 'react';
import { TouchableOpacity, Image, RefreshControl } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View, List, ListItem, Spinner, Thumbnail,Card, CardItem } from 'native-base';
import {viewPendingOrders, viewOrderDetailById, acceptOrder, updateOrderStatus, completeOrder} from './../database.js';
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
    };

  }


  componentDidMount() {
    console.log(this.props.order_data);
  }

  async fetchData() {

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
              Warren Lecture Hall
            </Text>
            <Text style = {styles.labelTextItems}>
              Time:
            </Text>
            <Text style = {styles.labelContent}>
              09:00, Tuesday May 22, 2018
            </Text>
            <Text style = {styles.labelTextItems}>
              Items:
            </Text>

            <Card style={styles.orderCard}>
              {/*<CardItem>*/}
                <View style = {{flexDirection: 'row'}}>
                <Left>
                  <Thumbnail style={{marginTop: 15, left: 10}} source={ require('../resources/batman.jpg') } />
                </Left>

                  <View style = {styles.cardTextView}>
                    <Text style ={styles.cardPrimaryText}>
                       Ice Coffee Latte
                    </Text>
                    <Text style ={styles.cardSecondaryText}>
                       Grande
                    </Text>

                  </View>

                </View>
              {/*</CardItem>*/}
            </Card>



          </Content>
        </View>
        <View>
          <Button
          style={styles.buttons_submit}
          color="#ffffff"
          onPress={() => this.props.updateOrderSubmitted(false)}
          > <Text style={styles.menuText}> Cancel Order </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
export default SubmitOrder;
