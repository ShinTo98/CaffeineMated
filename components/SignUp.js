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
import {styles} from '../CSS/SignUp.js';
import {userSignup} from '../database.js'

export class SignUp extends Component {

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
  }

  async signup (){
    var result = await userSignup(this.state.email, this.state.password);
    if(result == 0){
      alert("Sign up successful!");
    }
    else{
      alert(result);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.banner}>
            <Text style={styles.titleText}>{this.state.titleText}</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('main')}>
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
                title="Sign Up"
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
                  onPress={() => this.props.navigation.navigate('logIn')}
                >Log In</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
