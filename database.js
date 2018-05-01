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

// Function name: userLogIn
// Function Parameters: string -- email, string -- password
// Return:
//         Error Condition: 1) Error Message indicates what went wrong
//                          2) Error Inputs
//         Success: 1
export function userLogIn(email, password) {
  if( typeof email === 'string'  && typeof password === 'string'){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if( errorMessage != ""){
        return errorMessage;
      }else{
        return 1;
      }
    });
  }else{
    return "Wrong type passed in";
  }
}



