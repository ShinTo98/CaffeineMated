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
  Thumbnail,
  Spinner
} from 'native-base';

export class OrderDetails extends Component {
  
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Container>
      
      {/*----------------------------------HEADER PORTION------------------------*/}
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Center>
            <Title> Order Detail </Title>
          </Center>
        </Header>
      </Container>
    );
  }
  
}
export default OrderDetails;