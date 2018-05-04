
import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from '../CSS/Signup.js';
import {userSignup, displayMenu} from '../database.js'

export class Signup extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      titleText: "CaffeineMated",
      //bodyText: 'This is not really a bird nest.',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      comfirm: 'Comfirm Password',
      haveAccount: 'Already have an account? ',
    };
    this.signup = this.signup.bind(this);
    this.signup_cb = this.signup_cb.bind(this);
  }

  signup (){
    userSignup(this.state.email, this.state.password, this.signup_cb);
  }

  signup_cb (msg) {
    if(msg === 0) {
      alert("Signup Successful!");
    } else {
      alert(msg);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.banner}>
            <Text style={styles.titleText}>{this.state.titleText}</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('start')}>
            <Image
              style={styles.logo}
              source={require('../resources/wei_logo.png')}
            />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.white_banner}/>
          <View style={styles.textSection}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({name: text})}
              value={this.state.name}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({email: text})}
              keyboardType='email-address'
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
              keyboardType='visible-password'
              value={this.state.password}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({confirm: text})}
              keyboardType='visible-password'
              value={this.state.comfirm}
            />
            <View style={styles.buttons}>
              <Button
                title="Signup"
                color="#ffffff"
                accessibilityLabel="Tap to sign up"
                onPress={this.signup}
              />
            </View>
            <View style={styles.textView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subText}>{this.state.haveAccount}</Text>
                <Text
                  style={{fontSize:12}}
                  onPress={() => this.props.navigation.navigate('login')}
                >Login</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Signup;
