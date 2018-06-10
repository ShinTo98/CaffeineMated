/*
  Filename: OrderDetailInHistory.js
  Version: 0.1.0
  Description: Display the order detail in history.
*/
import React, {Component} from 'react';
import {
  Container, Button, Header, Left, 
  Body, Text, Thumbnail, View, 
  List, Spinner, Icon, Title,
  Right, Segment
} from 'native-base';
import {ScrollView,Dimensions,Image} from 'react-native';

import {viewOrderDetailById, getProfileById} from './../database.js';
import {styles} from "../CSS/OrderDetailInHistory";
import StarRating from 'react-native-star-rating';

export class OrderDetailInHistory extends Component{
  
  constructor(props){
    super(props);
    this.state = {orderId : this.props.navigation.getParam('order_id'), // this is hard coded for testing use
    orderData : [],
    buyerInfo:[],
    carrierInfo:[],
    loadFinished : false, 
  };
}

// get all useful information
async getInfo(){
  this.setState({orderData : await viewOrderDetailById(this.state.orderId)});
  this.setState({buyerInfo : await getProfileById(this.state.orderData.buyer_id)});
  this.setState({carrierInfo : await getProfileById(this.state.orderData.carrier_id)});
  this.setState({buyerRate : this.state.orderData.buyer_rate});
  this.setState({carrierRate : this.state.orderData.carrier_rate});
  this.setState({itemsInfo : this.state.orderData.items});
  this.setState({loadFinished:true});
}

async componentDidMount(){
  await this.getInfo();
}

render(){
  var itemsInformation = this.state.itemsInfo;
  var loaded = this.state.loadFinished
  if (loaded) {
    return (
      <Container style={{height:'100%'}}>
        {/***************** this will contain the header informations ********************** */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('viewHis')}>
              <Icon name='arrow-back' style={styles.icon}/>
           </Button>
          </Left>
          <Body>
            <Title style= {styles.title}> Order Detail </Title>
          </Body>
          <Right/>
        </Header>
        {/***************** this will contain the header informations ********************** */}


        <ScrollView showsVerticalScrollIndicator={false} >
      
        {/************** this contains all buyer information to display *********************/}
        <Container style={styles.userContainer}>
          <Text style={styles.title}> Buyer</Text>
          <View style={styles.horizontalRule} />
          <View style={{flexDirection: 'row'}}>
            
            <Left >
              <Thumbnail  style={styles.image}
              source={{uri: this.state.buyerInfo.photo}}/>
            </Left>

            <View style = {{flexDirection: 'column'}}>
              <Text style={styles.content}>{this.state.buyerInfo.username} </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                halfStarEnabled={true}
                fullStarColor={'#FF9052'}
                emptyStarColor={'#47525E'}
                rating={this.state.buyerRate}
                starSize={35}
              />
            </View>
          </View>
        </Container>
        {/************** this contains all buyer information to display *********************/}

      
        {/********************* this contains all carrier information to display *******************/}
        <Container style={styles.userContainer}>
          <Text style={styles.title}> Carrier</Text>
          <View style={styles.horizontalRule} />
          <View style={{flexDirection: 'row'}}>
            <Left>
              <Thumbnail style={styles.image}
                source={{uri: this.state.carrierInfo.photo}}/>
            </Left>
              <View style = {{flexDirection: 'column'}}>
                    <Text style={styles.content}>{this.state.carrierInfo.username} </Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        halfStarEnabled={true}
                        fullStarColor={'#FF9052'}
                        emptyStarColor={'#47525E'}
                        rating={this.state.carrierRate}
                        starSize={35}
                    />
              </View>
          </View>
        </Container>
        {/********************* END OF all carrier information to display *******************/}

      
        {/****************** this contains all order information to display *********************/}
        <Container style={styles.orderContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}> Items </Text>
            <View style={styles.horizontalRule} />
                <List>
                {
                  Object.values(itemsInformation).map((item, i) =>
                    <Text key={i} style={styles.content}>
                      {item.name}
                    </Text>
                  )
                }
              </List>
             </View>

          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}> Location </Text>
            <View style={styles.horizontalRule} />

            <Text style={styles.content}>{this.state.orderData.location} </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.subTitle}> Finish Time </Text>
            <View style={styles.horizontalRule} />
            <Text style={styles.content}>{this.state.orderData.last_update_time} </Text>
          </View>
        </Container>
        {/****************** END OF  all order information to display *********************/}
        </ScrollView>

      </Container>
      );
    }

    else{
      // Information not fully loaded yet ------------------------------------------------- //
      return (
        <Container>
          <Header/>
          <Spinner color={'#FF9052'}/>
        </Container>
      );
    }
  }
}
export default OrderDetailInHistory;