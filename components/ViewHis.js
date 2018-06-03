import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  List,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Item,
  Input,
  Form,
  Label,
  View,
  ListItem,
  ActionSheet, 
  Thumbnail
} from 'native-base';

import {FlatList} from "react-native";

import {styles} from '../CSS/ViewHis.js';
import {getCurrentUserUID, displayOrderHistory, viewOrderDetailById, getProfileDetailById} from './../database.js';
import { StackActions, NavigationActions } from 'react-navigation';

export class ViewHis extends Component {

    static navigationOptions = {
        header: null
      }
    
      constructor(props) {
        super(props);
        this.state = {
          user_id: "",
          history: null, 
        };
      }
      async getHistory() {
        let user_id = "02"; // testing, uncomment the following line when done
        //let user_id = await getCurrentUserUID(); 
        
        let history = await displayOrderHistory(user_id);
        let totNum  = parseInt(history.total_num); 
        let hisState = []; 
        for (let i = 0; i < totNum; i++) {
            let order_id = history[i]; 
            let order = await viewOrderDetailById(order_id); 
            hisState[i] = {}; 
            hisState[i].time = order.last_update_time; 
            hisState[i].loc = order.location; 
            hisState[i].items = {}; 
            for (let property in order.items) {
                hisState[i].items[property] = order.items[property]['name'];
            }
            console.log(hisState[i].items); 
            hisState[i].key = ""+order_id; 
            if (order.buyer_id === user_id) {
                let otherProf = await getProfileDetailById(order.carrier_id); 
                hisState[i].other = 'Carrier - ' + otherProf.username; 
                if (otherProf.username) {
                    hisState[i].photo = otherProf.photo; 
                }
            } else {
                let otherProf = await getProfileDetailById(order.buyer_id); 
                hisState[i].other = 'Buyer - ' + otherProf.username; 
                if (otherProf.username) {
                    hisState[i].photo = otherProf.photo; 
                }
            }
        }
        this.setState({user_id: user_id}); 
        this.setState({history: hisState}); 
      }
    
      async componentDidMount() {
        await this.getHistory();
      }

    render() {
        return (
          <Container style={styles.color_theme}>
            <Header hasSegment="hasSegment">
              <Left>
                <Button transparent onPress={() => this.props.navigation.navigate('main', {
                   update: false,
              })}>
                  <Icon name='arrow-back' style={styles.icon}/>
                </Button>
              </Left>
              <Body>
    
                <Title>View History</Title>
    
              </Body>
              <Right></Right>
            </Header>

            <Container>
            <FlatList
                data={this.state.history}
                renderItem={({item}) => {
                    return (
                    <ListItem style={{ marginLeft: 0 }} onPress={() => this.props.navigation.navigate('OrderDetailInHistory',{
                        order_id: item.key
                      })}>
                        <Left>
                            <Thumbnail style={styles.itemImage} source={{uri:item.photo}} />
                            <Text>{item.time}</Text>
                        </Left>

                        <Right>
                            <Text>{item.location}</Text>
                            <Text>{item.other}</Text>
                        </Right>
                    </ListItem>); 
                }}
                />
                
            </Container>
          </Container>
        );
      }
}

export default ViewHis; 