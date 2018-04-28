import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

export class SignUp extends Component {

    constructor(props) {
      super(props);
      this.state = {
        titleText: "CaffeineMated",
        bodyText: 'This is not really a bird nest.',
        email: 'Email',
      };
    }

    render(){
        return(

          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.banner}>
              <Text style={styles.titleText}>{this.state.titleText}</Text>
            </View>
            <View style={styles.buttons}>
              <Button
                title="Log In"
                color="#47525E"
                accessibilityLabel="Learn more about this purple button"
              />
              <Button
                title="Sign Up"
                color="#47525E"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={styles.textSection}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                keyboardType='email-address'
                value={this.state.email}
              />
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
  buttons: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  banner: {
    flex: 2,
    backgroundColor: '#ff9052',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    flex: 3,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '300',
  },
});

export default SignUp;
