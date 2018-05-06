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

/*
 * Name: displayMenu
 * Parameters: call back function
 * Return: List of pairs. [[img, TypeName]...]
 * Error Condition: None
 */
export function displayMenu (displayMenu_cb) {
    // access the Menu field in firebase
    const firebaseRef = firebase.database().ref("Menu");

    firebaseRef.on('value', function(snapshot){
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

      // return menu, for debug, uncomment the next step
       console.log(menu);
      displayMenu_cb(menu);

    }, function(errorObject){
      alert("failed:" + errorObject.code);
    });
}


/*
 * Name: displayItem
 * Parameters: string: type, string: item_id, displayItem_cb
 * Return:
 * The json containing the information of the item including description, image url, name and price
 *
 */
export function displayItem (type, item_id, displayItem_cb) {
    // get the direction
    dir = "Menu/" + type + "/items/" + item_id;
    firebase.database().ref(dir).on("value", function (snapshot) {
        var itemInformation = snapshot.val();
        displayItem_cb(itemInformation);
    });
}
    //return(information);

/*
 * Name: displayType
 * Parameters: string: type
 * Return: an array contains each item with image, id, and name.
 * @image: url
 * @id: string
 * @name: string
 */
export function displayType (type, displayType_cb) {
    let firebaseRef = firebase.database().ref('Menu');
    let drinks = [];
    firebaseRef.on('value', dataSnapshot => {
      let menu = dataSnapshot.val();
      var index;
      for (index in menu[type].items) {
        let item = menu[type].items[index];
        let drink = {image: item.image, id: index, name: item.name}
        drinks.push(drink);
      }
      displayType_cb(drinks);
    });
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
<<<<<<< HEAD
 * Name: viewPendingOrders
 * Description: This is for carrier to see all pending orders
 * Parameters: object: order, function: saveOrder_cb
 * Return:
 * Error Condition: none
 * Success: viewPendingOrders_cb
 */
export function viewPendingOrders() {
  // access the Menu field in firebase
  const firebaseRef = firebase.database().ref("Orders");

  firebaseRef.on('value', function(snapshot){

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

    console.log(pendingOrders);
   // displayMenu_cb(menu);

  }, function(errorObject){
    alert("failed:" + errorObject.code);
  });
=======
 * Name: updateOrderStatus
 * Description: update order status
 * Parameters: string: order_id, function: updateOrderStatus_cb
 * Return:
 * Error Condition: none
 * Success: update the order status
 */
export function updateOrderStatus(order_id, updateOrderStatus_cb) {
  let orderRef = firebase.database().ref("Orders/items/" + order_id); 
  let status = -1; 
  orderRef.once("value", dataSnapshot => {
    if (!dataSnapshot) {
      return; 
    } else {
      status = dataSnapshot.val().status; 
      status = Math.max(++status, 4);
      orderRef.child("status").set(status); 
      updateOrderStatus_cb(order_id); 
    }
  }); 
}

/*
 * Name: viewOrderDetailById
 * Parameters: string: order_id, viewOrderDetailById
 * Return:
 * The json containing the information of the order corresponding to the order_id
 *
 */
export function viewOrderDetailById (order_id, viewOrderDetailById_cb) {
    // get the direction
    dir = "Orders/items/" + order_id;
    firebase.database().ref(dir).on("value", function (snapshot) {
        var orderInformation = snapshot.val();
        viewOrderDetailById_cb(orderInformation);
    });
>>>>>>> a7061bc414e82c8a4882858bf5edd25c086f377a
}