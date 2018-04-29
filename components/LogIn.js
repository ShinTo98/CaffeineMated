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
import {styles} from '../CSS/LogIn.js';

export class LogIn extends Component {

    constructor(props) {
      super(props);
      this.state = {
        titleText: "CaffeineMated",
        //bodyText: 'This is not really a bird nest.',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        signUp: 'Don\'t have an account? Sign Up',
      };
    }

    render(){
        return(

          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.banner}>
              <Text style={styles.titleText}>{this.state.titleText}</Text>
              <Image
                style={styles.logo}
                source={require('../resources/wei_logo.png')}
              />
            </View>
            <View style={styles.white_banner} />
            <View style={styles.textSection}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                keyboardType='email-address'
                value={this.state.email}
                //placeHolder={this.state.email}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                keyboardType='visible-password'
                value={this.state.password}
                //placeHolder={this.state.password}
              />
              <View style={styles.buttons}>
                <Button
                  title="Log In"
                  color="#ffffff"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
              <View style={styles.text}>
                <Text style={{color:'gray'}}>{this.state.forgotPassword}</Text>
                <Text style={{top:80, color:'gray'}}>{this.state.signUp}</Text>
              </View>
            </View>
          </View>
          </KeyboardAvoidingView>
        );
    }
}

export default LogIn;
