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

export class SignUp extends Component {

    constructor(props) {
      super(props);
      this.state = {
        titleText: "CaffeineMated",
        bodyText: 'This is not really a bird nest.',
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
              />
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                keyboardType='visible-password'
                value={this.state.password}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  white_banner: {
    flex: 0.15,
    backgroundColor: '#ffffff',
  },
  banner: {
    flex: 1.8,
    backgroundColor: '#ff9052',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#47525e',
    flexDirection: 'row',
    justifyContent: 'center',
    //fontSize: 30,
    width: 200,
    padding: 5,
    top: 150,
  },
  textSection: {
    flex: 3,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  textInput: {
    height: 40,
    color: 'gray',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: 250,
    top: 100,
  },
  text: {
    fontSize: 30,
    //color: '#ffffff',
    top: 155,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: '300',
    color: 'white',
    top: 55,
  },
  logo: {
    width: 100,
    height: 100,
    top: 70,
  },
});

export default SignUp;
