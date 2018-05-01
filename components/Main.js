import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import {styles} from '../CSS/Main.js';
import {StackNavigator} from 'react-navigation'

export class Main extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.db); 
    return (
      <View style={styles.container}>
       <View style={styles.container}>
         <Image
           style={styles.logo}
           source={require('../resources/wei_logo.png')}
         />
         <Text style={styles.name}>
           CaffeineMated
         </Text>

       </View>

         
       <View style={styles.bottom}>
         <View style={styles.buttons} >
            <Button
              title="Log In"
              color="#ffffff"
              onPress={() => this.props.navigation.navigate('logIn')}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Sign Up"
              color="#ffffff"
              onPress={() => this.props.navigation.navigate('signUp')}
             />
          </View>
        </View>
      </View>
    );
  }
}

