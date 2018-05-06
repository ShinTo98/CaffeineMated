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
export async function userLogin (email, password) {
  var result;
  await firebase.auth().signInWithEmailAndPassword(email, password).then(
    function success() {
      // callback with 0 indicating login success
      result = 0;
    }
  ).catch(
    function failure (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // callback with errorMessage
    result = errorMessage;
  });

  return result;
}

/*
 * Name: userSignUp
 * Parameters: string: email, string: password
 * Return:
 * Error Condition: errorMessage
 * Success: 1 represents sign in successfully
 */
export async function userSignup (email, password) {
    var result;
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(

      function success(){
        result = 0;
      }
    ).catch(
      function failure(error){
        var errorCode = error.code;
        var errorMsg = error.message;

        result = errorMsg;

      }
    );

    return result;
}


export function displayMenu () {

}

export function displayType (type) {

}

export function displayItem (item_id) {

}

/*
 * Name: saveOrder
 * Description: save order object to database
 * Parameters: object: order, function: saveOrder_cb
 * Return:
 * Error Condition: none
 * Success: return order id of saved order
 */
export function saveOrder (order, saveOrder_cb) {
  let orderRef = firebase.database().ref("Orders"); 
  let order_id = 0; 
  orderRef.once("value", dataSnapshot => {
    order_id = dataSnapshot.val().size; 
    if (!order_id) {
      order_id = 0; 
    }
    orderRef.child("items").child(order_id).set(order); 
    orderRef.child("size").set(++order_id); 
    saveOrder_cb(order_id); 
  }); 
}
