import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from '../CSS/MenuView.js';
import {userSignup, displayMenu, viewPendingOrders, displayType} from '../database.js';
import {
  Container,
  Header,
  Content,
  Button,
  Toast,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Spinner,
} from 'native-base';

export class SubMenuView extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      menu: 'Coffee',
      type: this.props.navigation.getParam('type'),
      loadFinished: false,
      items: [],
    };

    // Bind login related functions
    //this.getDrink = this.getDrink.bind(this);
  }

  async getDrink() {
    //var type = this.props.navigation.getParam('type');
      this.setState({menu: this.state.type});
      this.setState({items: await displayType(this.state.type)}, () => {
      this.setState({loadFinished: true});
      });
      console.log(this.state);
    //var drinks = await displayType(type);
    //this.setState({items: drinks});
  }

  async componentWillMount() {
    await this.getDrink();
  }

  async

  render () {
    //var result = this.state.items;
    const loading = this.state.loadFinished;
    return(

      <Container style={styles.container}>

        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                name='arrow-back'
                style={styles.icon }
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='search' style={styles.search}/>
            </Button>
          </Right>
        </Header>

        <Container style={styles.menu_container}>
          <Text style={styles.menu}>{this.state.menu}</Text>
          <View style={styles.coffeeNameUnderline} />
        </Container>

        <Container style={styles.box}>
        {console.log(this.state)/*
          result.map(function(item, i) {
            return (
              <Container>
                <TouchableWithoutFeedback onPress={() =>{
                  this.props.navigation.navigate('customization', {
                    name: this.props.navigation.getParam('type'),
                    id: item.id
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{uri: item.image}}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableWithoutFeedback>
              </Container>
            );
          })
        */}
        {loading &&
        <List
       dataArray={this.state.items}
       renderRow={data =>
          <ListItem style={styles.item}>
                <Button transparent onPress={() => {
                  this.props.navigation.navigate('customization', {
                    id: data.id,
                  });
                }}>
                  <Image
                    style={styles.image}
                    source={{url: data.image}}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                  </Button>
            </ListItem>
       }
       />
        }
        {!loading && <Content>
                  <Spinner color='#FF9052' />
                  </Content>
        }
        </Container>
      </Container>
    );
  }
}
export default SubMenuView;
