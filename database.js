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

/*
 * Name: displayMenu
 * Parameters: None
 * Return: List of pairs. [[img, TypeName]...]
 * Error Condition: None
 */
export async function displayMenu () {
    // access the Menu field in firebase
    const firebaseRef = firebase.database().ref("Menu");
    var result;
    await firebaseRef.once('value', function(snapshot){
      let menu = [];
      let type = [];

      // Find the value of the Menu field
      let types = snapshot.val();
      var typeName;

      // loop through all types in menu
      for( typeName in types){
        // for each different type, get the value
        let typeField = types[typeName];
        type = [];

        // find image and name
        type.push(typeField.image);
        type.push(typeName);
        menu.push(type);
      }
      result = menu;
    });

    return result;
}

/*
 * Name: displayType
 * Parameters: string: type
 * Return: an array contains each item with image, id, and name.
 * @image: url
 * @id: string
 * @name: string
 */
export async function displayType (type) {
    let firebaseRef = firebase.database().ref('Menu');
    let drinks = [];
    await firebaseRef.once('value', dataSnapshot => {
      let menu = dataSnapshot.val();
      var index;
      for (index in menu[type].items) {
        let item = menu[type].items[index];
        let drink = {image: item.image, id: index, name: item.name}
        drinks.push(drink);
      }
    });

    return drinks;
  }

/*
 * Name: displayItem
 * Parameters: string: type, string: item_id
 * Return:
 * The array containing name, description, image.
 *
 */
export async function displayItem (type, item_id) {
    // get the direction
    dir = "Menu/" + type + "/items/" + item_id;

    var coffee;
    await firebase.database().ref(dir).once("value", function (snapshot) {
        coffee = snapshot.val();

    });
    return coffee;
}

/*
 * Name: saveOrder
 * Description: save order object to database
 * Parameters: object: order
 * Return:
 * Error Condition: none
 * Success: return order id of saved order
 */
export async function saveOrder (order) {
  let orderRef = firebase.database().ref("Orders");
  let order_id = 0;
  await orderRef.once("value", dataSnapshot => {
    order_id = dataSnapshot.val().size;
    if (!order_id) {
      order_id = 0;
    }
    orderRef.child("items").child(order_id).set(order);
    orderRef.child("size").set(++order_id);
  });
  return order_id;
}


/*
 * Name: cancelByBuyer
 * Description: delete order object from database
 * Parameters: string: order_id
 */
export function cancelByBuyer(order_id) {
    let orderRef = firebase.database().ref("Orders/items/" + order_id);
    orderRef.remove();
}


/*
 * Name: cancelByCarrier
 * Description: return accepted order object to pending orders
 * Parameters: string: order_id
 */
export function cancelByCarrier(order_id) {
    let orderRef = firebase.database().ref("Orders/items/" + order_id);
    orderRef.once('value', dataSnapshot => {
      if (dataSnapshot.val().status === 2) {
        orderRef.child('status').set(1);
      }
    });
}

/*
 * Name: viewPendingOrders
 * Description: This is for carrier to see all pending orders
 * Parameters: object: order
 * Return:
 * Error Condition: none
 * Success: viewPendingOrders_cb
 */
export async function viewPendingOrders() {
  // access the Menu field in firebase
  const firebaseRef = firebase.database().ref("Orders");

  var pendingOrders;
  await firebaseRef.once('value', function(snapshot){

    // Find the value of Orders field
    let orders = snapshot.val();
    orders = orders.items;

    pendingOrders=[];
    var order_id;

    // loop through all types in orders
    for( order_id in orders){

      // check if it is a pending order
      let order = orders[order_id];
      if( order.status == 1){
        pendingOrders.push(order_id);
      }

    }
  }, function(errorObject){
    alert("failed:" + errorObject.code);
  });

  return pendingOrders;
}

/*
 * Name: updateOrderStatus
 * Description: update order status
 * Parameters: string: order_id
 * Return:
 * Error Condition: none
 * Success: update the order status
 */
export async function updateOrderStatus(order_id) {
  let orderRef = firebase.database().ref("Orders/items/" + order_id);
  let status = -1;
  await orderRef.once("value", dataSnapshot => {
    if (!dataSnapshot) {
      return;
    } else {
      status = dataSnapshot.val().status;
      status = Math.min(++status, 4);
      orderRef.child("status").set(status);
    }
  });
}

/*
 * Name: viewOrderDetailById
 * Parameters: string: order_id
 * Return: object orderInformation
 * The json containing the information of the order corresponding to the order_id
 *
 */
export async function viewOrderDetailById (order_id) {
    // get the direction
    dir = "Orders/items/" + order_id;
    var orderInformation;
    await firebase.database().ref(dir).once("value", function (snapshot) {
        orderInformation = snapshot.val();
    });

    return orderInformation;
}

/*
 * Name: acceptOrder
 * Parameter: string:order_id  string:carrier_id
 * Return: -1 if the order is not found or already accepted by others.
 * If the current order is still pending, the carrier will take the order.
 * The database will update the carrier_id entry with the current carrier_id.
 * If the order is already taken by others, it will return -1.
 */
export async function acceptOrder(order_id, carrier_id){
    let orderRef = firebase.database().ref("Orders/items/" + order_id);
    let status = -1;
    await orderRef.once("value", dataSnapshot => {
        // the order is already accpeted by others if status is not 1
        if (dataSnapshot.val().status != 1) {
            alert("The order is already accepted by others. Try refresh!");
        }

        // update the carrier_id and status of the order.
        else {
            orderRef.child("carrier_id").set(carrier_id);
            orderRef.child("status").set(2);
        }
    });
}

export function sortLocation(location) {

}

export function changeDefaultMode(id) {

}

export function changeProfilePhoto() {

}
