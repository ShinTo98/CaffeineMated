import React, {Component} from 'react';
import {
    Container,
    Button,
    Text,
    Left,
    Thumbnail,
    View,
    List,
    ListItem,
} from 'native-base';

import {viewOrderDetailById, getProfileById} from './../database.js';
import {styles} from "../CSS/OrderDetailInHistory";
import StarRating from 'react-native-star-rating';

export class OrderDetailInHistory extends Component{
    constructor(props){
        super(props);
        this.state = {orderId : "0", // this is hard coded for testing use
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
        console.log(this.state.loadFinished);
    }

    async componentDidMount(){
        await this.getInfo();
    }

    render(){
        var itemsInformation = this.state.itemsInfo;
        var loaded = this.state.loadFinished
        if (loaded) {
            return (
                <Container>
                    /* this will contain the return button later */
                    <Container style={styles.headerContainer}>
                        <Text style={styles.buttonText}> Useless Container now </Text>
                    </Container>

                    /* this contains all buyer information to display */
                    <Container style={styles.userContainer}>
                        <Text style={styles.title}> Buyer</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Left>
                                <Thumbnail style={{marginTop: 8, marginBottom: 8, left: 10}}
                                           source={{uri: this.state.buyerInfo.photo}}/>
                            </Left>
                            <Text>{this.state.buyerInfo.username} </Text>
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
                            />
                        </View>
                    </Container>

                    /* this contains all carrier information to display */
                    <Container style={styles.userContainer}>
                        <Text style={styles.title}> Carrier</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Left>
                                <Thumbnail style={{marginTop: 8, marginBottom: 8, left: 10}}
                                           source={{uri: this.state.carrierInfo.photo}}/>
                            </Left>
                            <Text>{this.state.carrierInfo.username} </Text>
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
                            />
                        </View>
                    </Container>

                    /* this contains all order information to display */
                    <Container style={styles.orderContainer}>
                        <Text style={styles.title}>Order Detail</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Left>
                                <Text style={styles.title}> Items </Text>
                            </Left>
                            <List>
                                {
                                    Object.values(itemsInformation).map((item, i) =>
                                        <Text key={i}>
                                            {item.item_name}
                                        </Text>
                                    )
                                }
                            </List>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Left>
                                <Text style={styles.title}> Location </Text>
                            </Left>

                            <Text>{this.state.orderData.location} </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Left>
                                <Text style={styles.title}> Finish Time </Text>
                            </Left>
                            <Text>{this.state.orderData.last_update_time} </Text>
                        </View>
                    </Container>
                </Container>
            );
        }

        /* TODO:Need some animation when loading*/
        else{
            console.log("not");
            return (
                <Text hahahahha/>
            );
        }
    }
}
export default OrderDetailInHistory;