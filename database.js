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
export function userLogin(email, password, login_cb) {
  //if( typeof email === 'string'  && typeof password === 'string'){
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      function() {
        login_cb(0);
      }
    ).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
     // if( errorCode === 'auth/wrong-password'){
        login_cb(errorMessage);
      //}else{
        //return 1;
      //}
    });

  //}else{
  //  return "Wrong type passed in";
  //}
}

// Function name: userSignUp
// Function Parameters: string: email, string: password
// Return:
//         Error Condition: errorMessage
//         Success: 1 represents sign in successfully
export function userSignUp (email, password) {
  //if (typeof email === 'string' && password === 'string') {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      });
      //if (errorMessage == '') {
      //  return 1;
      //} else {
      //  return errorMessage;
      //}
  //} else {
  //  return 'Wrong type passed in';
  //}

}
