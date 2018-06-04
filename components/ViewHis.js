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
  Thumbnail,
  Spinner
} from 'native-base';

import {ScrollView, FlatList} from "react-native";

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
          loadFinished: false
        };
      }
      async getHistory() {
        //let user_id = "02"; // testing, uncomment the following line when done
        let user_id = await getCurrentUserUID(); 
        
        let history = await displayOrderHistory(user_id);
        let totNum  = parseInt(history.total_num); 
        let hisState = []; 
        for (let i = 0; i < totNum; i++) {
            let order_id = history.orders[i]; 
            let order = await viewOrderDetailById(order_id); 
            console.log(order); 
            hisState[i] = {}; 
            hisState[i].time = order.last_update_time; 
            hisState[i].location = order.location; 
            hisState[i].items = {}; 
            for (let property in order.items) {
                hisState[i].items[property] = order.items[property]['name'];
            }
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
        this.setState({loadFinished: true}); 
      }
    
      async componentDidMount() {
        await this.getHistory();
      }

    render() {
        let loaded = this.state.loadFinished; 
        if (loaded) {
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
        
                    <Title>Order History</Title>
        
                </Body>
                <Right></Right>
                </Header>

                <Container>
                <FlatList
                    data={this.state.history}
                    renderItem={({item}) => {
                        return (
                        <ListItem style={{marginLeft: 0, marginRight: 0}} onPress={() => this.props.navigation.navigate('orderDetailInHistory',{
                            order_id: item.key
                        })}>
                            <Left style={styles.leftBox}>
                                <Thumbnail style={styles.itemImage} source={{uri:item.photo}} />
                                <View style={styles.leftView}>
                                    <Text numberOfLines={1} style={styles.leftText2}>{item.other}</Text>
                                    <Text numberOfLines={1} style={styles.leftText}>{item.time}</Text>
                                </View>
                            </Left>

                            <Right style={styles.rightBox}>
                                <Text numberOfLines={1} style={styles.rightText}>{item.location}</Text>
                            </Right>
                        </ListItem>); 
                    }}
                    />
                    
                </Container>
            </Container>
            );
        } else {
            return (
              <Container>
                <Header/>
                <Spinner color={'#FF9052'}/>
              </Container>
              ); 
            
        }
      }
}

export default ViewHis; 