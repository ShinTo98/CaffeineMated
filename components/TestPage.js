import React, {Component} from 'react';
import  { Card, CardItem, Title, Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Input, Form, Label, View } from 'native-base';
import {displayMenu, displayType, displayItem, viewPendingOrders, viewOrderDetailById} from './../database.js';

export class TestPage extends Component {
     constructor(props){
         super(props);
     }

     async testdisplayMenu(){
         var test = await displayMenu();
         console.log(test);
    }

    async testdisplayType(){
        var test = await displayType("Hot Coffees");
        console.log(test);
    }

    async testdisplayItem(){
        var test = await displayItem("Hot Coffees", "HC02");
        console.log(test);
    }

    async testviewPendingOrders(){
        var test = await viewPendingOrders();
        console.log(test);
    }

    async testViewOrderDetailById(){
        var test = await viewOrderDetailById("2");
        console.log(test);
    }

     render(){
         return(
             <Container>
                <Header>
                  <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                       <Icon name='arrow-back' />
                    </Button>
                  </Left>
                    <Body>
                        <Title>Testing</Title>
                    </Body>
                    <Right />
                </Header>
                
                <Content>
                    <Text style={{fontSize:15, color:'#000000', fontFamily:'Hiragino Sans', margin:10}}>Functions that does not change value in database will have a test button here.
                        Return value will be printed to console</Text>
                    <Card>
                        <CardItem header>
                          <Text>DisplayMenu</Text>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Input: N/A</Text>
                                <Text>Output: Array of pairs which include image and name for all types</Text>
                                <Text />
                                <Button small primary onPress={this.testdisplayMenu}>
                                    <Text>Test</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                          <Text>DisplayType</Text>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Input: String typeName (example input is "Hot Coffees")</Text>
                                <Text>Output: An array contains each item with image, id, and name.</Text>
                                <Text />
                                <Button small primary onPress={this.testdisplayType}>
                                    <Text>Test</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                          <Text>DisplayItem</Text>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Input: String typeName, item_Id (example input is ("Hot Coffees", "HC02")</Text>
                                <Text>Output: Item object</Text>
                                <Text />
                                <Button small primary onPress={this.testdisplayItem}>
                                    <Text>Test</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                          <Text>ViewPendingOrders</Text>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Input: N/A</Text>
                                <Text>Output: List of pending orders id</Text>
                                <Text />
                                <Button small primary onPress={this.testviewPendingOrders}>
                                    <Text>Test</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                          <Text>ViewOrderDetailById</Text>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>Input: string orderId (example: "2")</Text>
                                <Text>Output: Order object</Text>
                                <Text />
                                <Button small primary onPress={this.testViewOrderDetailById}>
                                    <Text>Test</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>

              </Container>
         );
     };

}

