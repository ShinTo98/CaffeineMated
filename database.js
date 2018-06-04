import firebase from 'firebase';
import {Alert} from 'react-native';

// Firebase configuration
var config = {
    apiKey: "AIzaSyC9lBfgxor-3FS__blFmwqda8LIvlKrq1c",
    authDomain: "caffeinemated-90dda.firebaseapp.com",
    databaseURL: "https://caffeinemated-90dda.firebaseio.com",
    projectId: "caffeinemated-90dda",
    storageBucket: "caffeinemated-90dda.appspot.com",
     messagingSenderId: "329358763029"
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

  if (result === 0) {
      var curUser = getCurrentUserUID();
      var Profile = await getProfileById(curUser);
      if (Profile.current_order_as_buyer && Profile.current_order_as_buyer != -1)
          addOrderStatusChangeListener(Profile.current_order_as_buyer);
  }
  return result;
}

/*
 * Name: userSignUp
 * Parameters: string: email, string: password
 * Return:
 * Error Condition: errorMessage
 * Success: 1 represents sign in successfully
 * If sign up successfully, firebase will create a default profile related to that uid
 */
export async function userSignup (email, password, name) {
    var result;
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(

      function success(){
        result = 0;
          var newUID = getCurrentUserUID();
          var newProfileDirName = "Profile/" + newUID;
          var ref = firebase.database().ref(newProfileDirName);
          ref.set({default_mode:"Buyer", rate:5, username:name,
              history:{total_num:0}, photo:"data:image/png;base64,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"});
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
* Name: userPasswordChange
 * Parameters: string: newPassword
 * Return: N/A
 * Error Condition: errorMessage
 * Success: Password sucessfully
 */
export async function userPasswordChange(newPassword){
  var user = firebase.auth().currentUser;
  var newPassword = getASecureRandomPassword();

 user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});

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
    var drinks;
    await firebaseRef.once('value', dataSnapshot => {
      let info = [];
      let result = [];
      let menu = dataSnapshot.val();
      var index;
      for (index in menu[type].items) {
        let item = menu[type].items[index];
        info = [];
        //let drink = {image: item.image, id: index, name: item.name}
        info.push(item.image);
        info.push(index);
        info.push(item.name);
        result.push(info);
      }
      drinks = result;
    });
    return drinks;
  }

/*
 * Name: displayItem
 * Parameters: string: type, string: item_id
 * Return:
 * The array containing name, description, image.
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
    order.id = order_id;
    orderRef.child("items").child(order_id).set(order);
    orderRef.child("size").set(order_id+1);
  });

  return order_id;
}

/*
 * Name: createOrder
 * Description: create buyer order
 * Parameters: Object items, string location, string request_time
 * Return: order_id
 */
  export async function createOrder(orders, orderLocation, requestTime){
    console.log(orders);
    console.log(orderLocation);
    console.log(requestTime);
    var buyerId = await getCurrentUserUID();
    var createTime = new Date().toLocaleString('en-US', { hour12: false });

    var orderObject ={
        buyer_id: buyerId,
        buyer_rate: -1,
        carrier_id: -1,
        create_time: createTime,
        items: orders,
        last_update_time: createTime,
        location: orderLocation,
        request_time: requestTime,
        status: 1
    }

    var orderId = await saveOrder(orderObject);
    profileRef = firebase.database().ref("Profile/" + buyerId);
    profileRef.child("current_order_as_buyer").set(orderId);
    addOrderStatusChangeListener(orderId);
    return orderId;
  }


/*
 * Name: cancelByBuyer
 * Description: delete order object from database
 * Parameters: string: order_id
 */
export function cancelByBuyer(order_id) {
    let orderRef = firebase.database().ref("Orders/items/" + order_id);
    orderRef.once('value', dataSnapshot => {
      if (dataSnapshot.val().status === 1) {
        orderRef.child('status').set(-1);
      }
    });
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
 * Return: An array of order_id
 * Error Condition: none
 * Success: N/A
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
      status = Math.min(++status, 3);
      orderRef.child("status").set(status);
    }

    updateLastTime(order_id);
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
 * Name: getOrderLocationById
 * Parameters: string: order_id
 * Return: return location string,
 * Parameter: string:order_id
 * Return: location of this order
 */
export async function getOrderLocationById (order_id){
  // get the direction
  dir = "Orders/items/" + order_id;
  var location;
  await firebase.database().ref(dir).once("value", function (snapshot){
    location = snapshot.val().location;
    location = location.split(' ').join('%20');
  });
  return location;
}

/*
 * Name: getProfileDetailById
 * Parameters: string: profile_id
 * Return: object profile
 *
 */
export async function getProfileDetailById(profile_id){
  dir = "Profile/" + profile_id;
  var result;
  await firebase.database().ref(dir).once("value", function(snapshot){
    result = snapshot.val();
  })

  return result;
}


/*
 * Name: acceptOrder
 * Parameter: string:order_id  string:carrier_id
 * Return: -1 if the order is not found or already accepted by others.
 * If the current order is still pending, the carrier will take the order.
 * The database will update the carrier_id entry with the current carrier_id.
 * If the order is already taken by others, it will return -1.
 */
export async function acceptOrder(order_id){
    var carrier_id = getCurrentUserUID();
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

      updateLastTime(order_id);
  });
}

/*
 * Name: getDistance
 * Parameters: string: starting location, string destination, order_id
 * Return: a pair (location distance, order_id)
 *
 * Parameter: string: origin  string: destination  string: id
 * Return: the distance between origin location and destination
 */
export async function getDistance(origin, destination, id) {
  return new Promise(function(resolve,reject){
    const xhr = new XMLHttpRequest();

    const url = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&mode=walking";
    xhr.responseType = 'json';
    //let orderWithDist;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if( xhr.response.routes[0] != undefined){
            var orderWithDist = {dist: xhr.response.routes[0].legs[0].distance.value, order_id: id};
            resolve(orderWithDist);
          }else{
            alert("Please choose another location");
          }
      }
    };

    xhr.ontimeout = function() {
      reject("timeout");
    }
    xhr.open('GET', url);
    xhr.send();
  });

}

/*
 *  Helper function used to compare two orders with ids.
 */
function compare (a, b){
    if (a.dist > b.dist){
        return 1;
    }
    else if (a.dist < b.dist){
        return -1;
    }
    return 0;
}

/*
 * Name: sortOrder
 * Parameters: string: origin
 * Return: array containing order ids
 * Sort the pending order based on some rules (for now, we are only sorting it with
 * distance from the origin)
 */
export async function sortOrdersByDistance(origin) {
  let orders = await viewPendingOrders();
  let ordersWithDistance = [];
  var current;
  const loc = origin.split(' ').join('%20'); // initial location
  for (let i = 0; i < orders.length; i++) {
    current = await getDistance(loc, await getOrderLocationById(orders[i]), orders[i]);
    await ordersWithDistance.push(current);
  }

  await ordersWithDistance.sort(compare);
  console.log(ordersWithDistance);
  let ordersResult = [];
  for (let j = 0; j < ordersWithDistance.length; j++){
      await ordersResult.push(ordersWithDistance[j].order_id);
  }
  //console.log("this is what we returned from database" + ordersResult);
  return ordersResult;
}

export async function getOrderRequestTime(order_id) {
  let dir = "Orders/items/" + order_id;
  var location;
  await firebase.database().ref(dir).once("value", function (snapshot){
    location = snapshot.val().location;
    location = location.split(' ').join('%20');
  });
  return location;
}

export async function sortOrdersByRequestTime() {
   let orders = await viewPendingOrders();

   // build array with each object containing id and request_time
   let ordersWithRequestTime = [];
   for (let i = 0; i < orders.length; i++) {
   var orderRef = firebase.database().ref("Orders/items/"+orders[i]);
   await orderRef.once("value", dataSnapshot => {
   ordersWithRequestTime.push({orderId:orders[i],requestTime:dataSnapshot.val().request_time});
   });
   }

   await ordersWithRequestTime.sort(compareByRequestTime);

   // build the result array
   let resList = [];
   for (var j = 0; j < ordersWithRequestTime.length; j++){
   resList.push(ordersWithRequestTime[j].orderId);
   }
   return resList;
  }

/*
 * Name: completeOrder
 * Parameter: string: order_id  string: user_id
 * Return: N/A
 */
export async function completeOrder(order_id) {
    var user_id = getCurrentUserUID();
  let profileRef = firebase.database().ref("Profile/" + user_id + "/history/");
  await profileRef.once("value", snapshot => {
    index = snapshot.val().total_num;
  });

  let orderRef = firebase.database().ref("Orders/items/" + order_id);
  await orderRef.once("value", dataSnapshot => {

      // current order status is 4: completedByBuyer, then carrier click complete
      // update status to be 6: completed
      if (dataSnapshot.val().status === 4 && dataSnapshot.val().carrier_id == user_id) {
          orderRef.child("status").set(6);
          profileRef.child("orders").child(index).set(order_id);
          profileRef.child("total_num").set(++index);
      }

      // current order status is 5: completedByCarrier, then buyer click complete
      // update status to be 6: completed
      else if (dataSnapshot.val().status === 5 && dataSnapshot.val().buyer_id == user_id) {
          orderRef.child("status").set(6);
          profileRef.child("orders").child(index).set(order_id);
          profileRef.child("total_num").set(++index);

          ref = firebase.database().ref("Profile/" + user_id);
          ref.child("current_order_as_buyer").set('-1');
          removeOrderStatusChangeListener(orderId);
      }

      // current order status is 3: delivering, then buyer click complete
      // update status to be 4: completedByBuyer
      else if (dataSnapshot.val().status === 3 && dataSnapshot.val().buyer_id == user_id){
          orderRef.child("status").set(4);
          //console.log("complete by buyer");
          profileRef.child("orders").child(index).set(order_id);
          profileRef.child("total_num").set(++index);

          ref = firebase.database().ref("Profile/" + user_id);
          ref.child("current_order_as_buyer").set('-1');
          removeOrderStatusChangeListener(orderId);
      }

      // current order status is 3: delivering, then carrier click complete
      // update status to be 5: completedByCarrier
      else if (dataSnapshot.val().status === 3 && dataSnapshot.val().carrier_id == user_id){
          orderRef.child("status").set(5);
          //console.log("complete by carrier");
          profileRef.child("orders").child(index).set(order_id);
          profileRef.child("total_num").set(++index);
      }

      updateLastTime(order_id);
  });
}

/*
 * Name: changeDefaultMode
 * Parameters: string id, string mode
 * Return: N/A
 * change the default mode to given mode.
 */
export async function changeDefaultMode(id, mode) {
  let profileRef = firebase.database().ref("Profile/"+id);
  let defaultMode;
  await profileRef.once("value", dataSnapshot => {
      profileRef.child("default_mode").set(mode);
      alert("Change Successful!");
    }
  );

}

/*
 * Name: getDefaultMode
 * Parameters: void
 * Return: N/A
 * get deault mode
 */

 export async function getDefaultMode(){
   var defaultMode;
   let profileId =  getCurrentUserUID();
   let profileRef = firebase.database().ref("Profile/" + profileId +"/default_mode");
   await profileRef.once("value", dataSnapshot => {
     defaultMode = dataSnapshot.val();
   });
   console.log("this is getDefaultMode " + defaultMode);

   return defaultMode;
 }




/*
 * Name: changeProfilePhoto
 * Parameters: string id, string url
 * Return: N/A
 * update user profile photo
 */
export async function changeProfilePhoto(id, url) {
  let profileRef = firebase.database().ref("Profile/"+id);
  await profileRef.once("value", dataSnapshot => {
    profileRef.child("photo").set(url);
  });
}

/*
 * Name: logout
 * Parameters: N/A
 * Return: 0 if success, otherwise return error message
 * logout the user
 */
export async function logout() {

    var curUser = getCurrentUserUID();
    var Profile = await getProfileById(curUser);
    if (Profile.current_order_as_buyer != null && Profile.current_order_as_buyer != -1)
        removeOrderStatusChangeListener(Profile.current_order_as_buyer);

    var result;
    await firebase.auth().signOut().then(

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
 * Name: displayOrderHistory
 * Parameters: string user_id
 * Return: order history
 * return order history of the given user
 */
export async function displayOrderHistory(user_id) {
  // get the directory
  let dir = "Profile/" + user_id + "/history";
  let orderHis;
  await firebase.database().ref(dir).once("value", function (snapshot) {
      orderHis = snapshot.val();
  });
  return orderHis;
}

/*
 * Name: getProfileById
 * Parameters: string user_id
 * Return: object profile
 * return profile information of the given user
 */
export async function getProfileById(user_id) {
  // get the directory
  let dir = "Profile/" + user_id;
  let profile;
  await firebase.database().ref(dir).once("value", function (snapshot) {
      profile = snapshot.val();
  });

  return profile;
}

/*
 * Name: updateDelivery
 * Parameters: order_id,
 * Return: database change
 * update user profile photo
 */

 export async function updateLastTime(order_id){
   let dir;
   dir = "Orders/items/" + order_id + "/last_update_time";
   let update_time = firebase.database().ref(dir);
   var createTime = new Date().toLocaleString('en-US', { hour12: false });
   update_time.set(createTime);

 }

 /*
 * Name: updateOrderRate
 * Parameters: string order_id, string rate, boolean isBuyer, string user_id
 * Return: N/A
 * update rate in order and rate in given user
 */
export async function updateOrderRate(order_id, rate, isBuyer, user_id) {
  let orderDir;
  if (isBuyer) { // get direction
    orderDir = "Orders/items/" + order_id + "/buyer_rate";
  } else {
    orderDir = "Orders/items/" + order_id + "/carrier_rate";
  }
  let orderRef = firebase.database().ref(orderDir);
  orderRef.set(rate);

  let profileDir = "Profile/" + user_id;
  let prevRate;
  let totalNum;
  await firebase.database().ref(profileDir).once("value", function (snapshot) {
    user = snapshot.val();
    prevRate = user.rate;
    totalNum = user.history.total_num;
  });
  let newRate = (parseFloat(prevRate) * (parseInt(totalNum)-1) + parseFloat(rate)) / (parseInt(totalNum));
  let rateRef = firebase.database().ref(profileDir + "/rate");
  rateRef.set(newRate);
}

/*
 * Name: changeUserName
 * Parameters: string: user_id string:newName
 * Return: none
 * change the name of the user
 */
export async function changeUserName(user_id, newName){
    let profileRef = firebase.database().ref("Profile/" + user_id);
    var result;
    await profileRef.once("value", dataSnapshot => {
        if (!dataSnapshot) {
            result = -1;
        } else {
            profileRef.child("username").set(newName);
            result = 0;
        }
    });
    return result;
}

/*
 * Name: setPhoneNum
 * Parameter: string: phoneNum
 */
export async function setPhoneNum(phoneNum) {
  let profile_id = getCurrentUserUID();
  let dir = firebase.database().ref("Profile/" + profile_id);
  dir.child("phone").set(phoneNum);
}


export function getCurrentUserEmail(){
    var currentUser = firebase.auth().currentUser;
    if (currentUser != null){
        return currentUser.email;
    }
    return -1;
}

/*
 * Name: getCurrentUserUID
 * Parameter: None
 * Return: the uid of current user.
 * get the current user uid
 */
export function getCurrentUserUID(){
    var currentUser = firebase.auth().currentUser;
    if (currentUser != null){
        return currentUser.uid;
    }
    return -1;
}

/*
 *  Helper function used to compare two orders with time.
 *  NOTICE: should be 24 hours format
 */
function compareByRequestTime (a, b){
    // initialize array containing hours and minutes
    var aTime = a.requestTime.split(":");
    var bTime = b.requestTime.split(":");

    // compare hours
    if (aTime[0] > bTime[0]){
        return 1;
    }
    else if (aTime[0] < bTime[0]){
        return -1;
    }

    // compare minutes
    else if (aTime[1] > bTime[1]){
        return 1;
    }
    else if (aTime[1] < bTime[1]){
        return -1;
    }
    return 0;
}

/*
 * Name: getItemDetailWithOnlyId
 * Parameter: itemId
 * Return: the json containing item details
 * this function allows us to get item details with only id
 */
export async function getItemDetailWithOnlyId(itemId) {
    var dict = {HC:"Hot Coffees",
                DR:"Drinks",
                FR:"Frappuccino",
                CC:"Cold Coffees",
                HT:"Hot Teas",
                IT:"Iced Teas"};
    var type = dict[itemId.substring(0,2)];
    var itemDetail = await displayItem(type, itemId);
    return itemDetail;
}

export function addOrderStatusChangeListener(orderId){
    ref = firebase.database().ref("Orders/items/" + orderId +"/status");
    ref.on('value', statusUpdated);
}

export function removeOrderStatusChangeListener(orderId){
    ref = firebase.database().ref("Orders/items/" + orderId +"/status");
    ref.off('value', statusUpdated);
}

function statusUpdated(snapshot) {
    var changedChild = snapshot.val();
    if (changedChild === 2　&& changedChild != 4) {
        Alert.alert("Notification", "Someone just accepted your order!\n Please refresh the page!");
    }
    else if (changedChild != 1　&& changedChild != 4) {
        Alert.alert("Notification", "Your Order has been updated!\n Please refresh the page! ");
    }
}

export async function randomCoffee() {
  // random an integer for type
  let type = Math.floor(Math.random() * 6);

  // random an integer for item
  let item = Math.floor(Math.random() * 3) + 1;
  let hotTea = Math.floor(Math.random() * 3) + 1;

  let typeRef;
  let prefix;

  if (type === 0) {
    typeRef = 'Cold Coffees';
    prefix = 'CC';
  } else if (type === 1) {
    typeRef = 'Drinks';
    prefix = 'DR';
  } else if (type === 2) {
    typeRef = 'Frappuccino';
    prefix = 'FR';
  } else if (type === 3) {
    typeRef = 'Hot Coffees';
    prefix = 'HC';
  } else if (type === 4) {
    typeRef = 'Hot Teas';
    prefix = 'HT';
  } else if (type === 5) {
    typeRef = 'Iced Teas';
    prefix = 'IT';
  }

  let dir;
  // if (typeRef === 'Hot Teas') {
  //   dir = "Menu/" + typeRef + "/items/" + prefix + '0' + hotTea;
  // }
  dir = "Menu/" + typeRef + "/items/" + prefix + '0' + item;
  //console.log("prefix is: " + prefix);
  //console.log("dir in random is " + dir);
  var coffee;
  await firebase.database().ref(dir).once("value", function (snapshot) {
    coffee = snapshot.val();
  });
  console.log("today coffee is "+ coffee);
  return coffee;
}

export function resetPassword() {
    var user = firebase.auth().currentUser;

    if (user) {
        firebase.auth().sendPasswordResetEmail(user.email).then(function () {
            // Email sent.
            Alert.alert("Success！", "An E-mail has just been sent to your email!");
        }).catch(function (error) {
            // An error happened.
            Alert.alert("Failed", "Something strange happened...")
        });
    }
}
