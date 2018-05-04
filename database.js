import firebase from 'firebase';

// Firebase configuration
var config = {
  apiKey: "AIzaSyAQSNocuGrjIBtwErRJeHV7nUsfQGZC_uE",
  authDomain: "cmdatabase-c3084.firebaseapp.com",
  databaseURL: "https://cmdatabase-c3084.firebaseio.com",
  projectId: "cmdatabase-c3084",
  storageBucket: "cmdatabase-c3084.appspot.com",
  messagingSenderId: "964208744011"
};
// Firebase initialization
firebase.initializeApp(config);

/*
 * Name: userLogin
 * Parameters: email - string; user login email
 *             password - string; user login password
 * Return:
 *  Error Condition: 1) Error Message indicates what went wrong
 *                   2) Error Inputs
 * Success: 1
 */
export function userLogin (email, password, login_cb) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(
    function() {
      // callback with 0 indicating login success
      login_cb(0);
    }
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // callback with errorMessage
    login_cb(errorMessage);
  });
}

/*
 * Name: userSignUp
 * Parameters: string: email, string: password
 * Return:
 * Error Condition: errorMessage
 * Success: 1 represents sign in successfully
 */
export function userSignup (email, password, signup_cb) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      function() {
      // callback with 0 indicating login success
        signup_cb(0);
      }
    ).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // callback with errorMessage
      signup_cb(errorMessage);
    });
}

export function displayMenu () {

}

export function displayType (type) {

}

export function displayItem (item_id) {

}

export function saveOrder (order) {

}
