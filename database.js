import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAQSNocuGrjIBtwErRJeHV7nUsfQGZC_uE",
  authDomain: "cmdatabase-c3084.firebaseapp.com",
  databaseURL: "https://cmdatabase-c3084.firebaseio.com",
  projectId: "cmdatabase-c3084",
  storageBucket: "cmdatabase-c3084.appspot.com",
  messagingSenderId: "964208744011"
};
firebase.initializeApp(config);

export function userSignIn() {

}

// Function name: userSignUp
// Function Parameters: string: email, string: password
// Return:
//         Error Condition: errorMessage
//         Success: 1 represents sign in successfully
export function userSignUp (email, password) {
  if (typeof email === 'string' && password === 'string') {
    this.props.db.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      });
      if （errorMessage === '') {
        return 1;
      } else {
        return errorMessage;
      }
  } else {
    return 'Wrong type passed in';
  }

}
