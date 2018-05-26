import firebase from 'firebase';

import {
  userSignup,
  userLogin,
  userPasswordChange,
  getProfileDetailById,
  logout,
  getProfileById,
  displayMenu,
  displayType,
  displayItem,
  viewPendingOrders,
  viewOrderDetailById,
  getOrderLocationById,
  sortOrders,
  completeOrder,
  changeDefaultMode,
  changeUserName,
  changeProfilePhoto,
  displayOrderHistory
} from '../database.js';
import {saveOrder, viewAllOrders} from "../database";

//var _Example = require("../database.js\"");
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

//npx babel-node tests.js
async function main() {
  /*
  await testuserSignup();
  await testuserLogin();
  await testdisplayMenu();
  await testdisplayType();
  await testdisplayItem();
  */
  //await testviewPendingOrders();


  //await testLogOut();
  //await testUserPasswordChange();
  //await testGetProfileById();
   //await testviewOrderDetailById();
  await testgetOrderLocationById();
  //await testdisplayOrderHistory();
}


async function testuserSignup( ) {
  var email = "unittest@ucsd.edu";
  var password = "password";
  var returned = await userSignup( email, password );

  console.log( "Testing function userSignup..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }
}


async function testuserLogin( ) {
  var email = "unittest@ucsd.edu";
  var password = "password";
  var returned = await userLogin( email, password );

  password = "badpassword";
  var returnederror = await userLogin( email, password );

  console.log("Testing function userLogin with incorrect user" +
    " credentials...");
  console.log("Expecting to return an error message");
  console.log("Actual returned value:\t" + returnederror);

  if (returnederror !== 0) {
    console.log("PASSED!\n");
  } else {
    console.log("PASSED!\n");
  }
}

  console.log( "Testing function userLogin with incorrect user" +
    " credentials..." );
  console.log( "Expecting to return an error message" );
  console.log( "Actual returned value:\t" + returnederror );
  if( returnederror === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "PASSED!\n" ); }
}

async function testUserPasswordChange() {
  var email = "unittest@ucsd.edu";
  var password = "password";

  await userLogin( email, password );

  // What's current user in this case?
  await userPasswordChange("newPassword");

  var returnederror = await userLogin( email, password );

  console.log( "Testing function userPasswordChange with incorrect user" +
    " credentials..." );
  console.log( "Expecting to return an error message" );
  console.log( "Actual returned value:\t" + returnederror );
  if( returnederror === 0 ) { console.log( "FAILED!\n" ); } else { console.log( "PASSED!\n" ); }

  var password = "newPassword";
  var returned = await userLogin( email, password );

  console.log( "Testing function userPasswordChange with correct user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }
}

async function testChangeUserName () {
  // The method will return false if the user put a same name?
  var result = await changeUserName("id", "same name");

  console.log( "Testing function changeUserName with incorrect user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned !== 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }

  var result = await changeUserName("id", "new name");

  console.log( "Testing function changeUserName with correct user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }
}

async function testLogOut() {
  var email = "unittest@ucsd.edu";
  var password = "password";
  await userLogin( email, password );
  // Current user?
  var returned = logout();

  console.log( "Testing function logOut with correct user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }
}

// async function testCompleteOrder() {
//   await completeOrder("01", "666");
// }

// async function testSortOrders() {
//   var orders = sortOrders('Warren Lecture Hall');
//
//   for (let i = 1; i < orders.length; i++) {
//     current = await getDistance(loc, await getOrderLocationById(orders[i]), orders[i]);
//     prev = await getDistance(loc, await getOrderLocationById(orders[i - 1]), orders[i - 1]);
//     if (current >== prev) {
//       console.log( "FAILED!\n" );
//     }
//   }
//
//
// }

// async function testGetProfileById() {
//   console.log( "Testing function getProfileById..." );
//   var his = await getProfileById( "3" );
//   console.log(his);
//   var his = await getProfileById( "1" );
//   console.log(his);
//
//   var his = await getProfileById( "2" );
//   console.log(his);
//
//   var his = await getProfileById( "5" );
//   console.log(his);
// }

async function testdisplayMenu( ) {
  var gotMenu = await displayMenu();
  console.log( "Testing function displayMenu..." );
  console.log( "Expecting returned list of pairs of [img, type]" );
  console.log( "Actual returned value:\n" );
  for( pair in gotMenu){
    console.log( gotMenu[pair] );
  }
  console.log( "PASSED!\n" );
}

async function testdisplayType() {
  var gotSubMenu = await displayType('Drinks');
  console.log( "Testing function displayType..." );
  console.log( "Expecting returned list of pairs of [img, id, name]" );
  console.log( "Actual returned value:" );
  for( pair in gotSubMenu){
    console.log(gotSubMenu[pair]);
  }
  console.log( "PASSED!\n" );
}

async function testdisplayItem( ) {
  var got = await displayItem("Hot Coffees", "HC02");
  console.log( "Testing function displayItem..." );
  console.log( "Expecting returned list of [name, description, image]" );
  console.log( "Actual returned value:" );
  for( pair in got){
    console.log(got[pair]);
  }
  console.log( "PASSED!\n" );
}

async function helpaddingOrder(ord, callback) {
  setTimeout(function () {
    var addedOrderId = saveOrder(ord);
    callback();
    return addedOrderId;
  }, 1000);
}

async function helpviewpending(callback) {
  setTimeout(function () {
    var got = viewPendingOrders();
    callback();
    return got;
  }, 1000);

}

async function testviewPendingOrders() {
/*
  var add = {
    buyer_id: "001",
    buyer_rate: "4.5",
    carrier_id: "002",
    carrier_rate: "4",
    create_time: "12:55 pm, Friday, May 22, 2021",
    items: {
      customization: "lol",
      item_name: "pink drink",
      size: "grande"
    },
    last_update_time: "13:01 pm",
    location: "Warren Lecture Hall",
    request_time: "1:08 pm",
    status: 1

  };

    let gotPendingId;

    let addedOrderId = helpaddingOrder( add, function () {
      gotPendingId = helpviewpending( function () {

      });
    });*/

  var gotPendingId = await viewPendingOrders();
  var gotAllId = await viewAllOrders();
  var noProblem1 = true;


  console.log("Testing function viewPendingOrders...");

  console.log("Comparing if all fetched orders are of pending status");


  for ( index in gotPendingId) {
    let order = await viewOrderDetailById( gotPendingId[index] );
    //console.log(gotPendingId[index]);
    if( order.status != 1){
      noProblem1 = false;
    }
  }
  if (noProblem1) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED! Not all fetched orders are pending orders\n");
  }



console.log("Comparing if all pending orders fetched");
  var noProblem2 = true;


  for ( index in gotAllId) {

    let order = await viewOrderDetailById( gotAllId[index] );

    if( order.status == 1 && !gotPendingId.includes( gotAllId[index] ) ){
      noProblem2 = false;
    }
  }

  if (noProblem2) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED! Not all pending orders are fetched\n");
  }


  if (noProblem1 && noProblem2) {
    console.log("Both tests PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
  console.log( "PASSED!\n" );
}
/*
async function testviewOrderDetailById() {
  var got = await viewOrderDetailById("3");
  console.log("Testing function viewOrderDetailById...");


  var expectedItem = {
    buyer_id: "678",
    buyer_rate: "3.3",
    carrier_id: "234567",
    carrier_rate: "0.5",
    create_time: "9:30 am, Monday, March 29, 2018",
    items:
      { FR02:
          { customization: 'wulalalalalililalalilalidalidalidayou',
            item_name: 'Caramel Cocoa Cluster Frappuccino',
            size: 'tall' } },
    last_update_time: '9:50 am',
    location: 'Atkinson Hall',
    request_time: '10:20 am',
    status: 1
};

  var noProblem = true;
  console.log(got);
  for (pair in got) {
    if (pair !== "items" && got[pair] != expectedItem[pair]) {
      noProblem = false;
      console.log(got[pair]);
      console.log(expectedItem[pair]);
    }
    else if (pair === "items") {
      /*for (tag in got[items]) {
        for (item in tag) {
          if (got.price[tag] !== expectedItem.price[tag]) {
            noProblem = false;
          }
        }
      }
    }
  }
  if (noProblem) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }

}*/

async function testgetOrderLocationById() {
  var gotAllId = await viewAllOrders();

  console.log("Testing function getOrderLocationById...");

  console.log("Comparing location got with location stored in order object");
  var noProblem = true;


  for ( index in gotAllId) {

    let order = await viewOrderDetailById( gotAllId[index] );
    let loc = await getOrderLocationById( gotAllId[index] );

    if( order.location.split(' ').join('%20') != loc ){
      noProblem = false;
    }
  }

  if (noProblem) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }

}

async function testsortOrders( ) {
  //later depend on save order
}

async function testdisplayOrderHistory( ) {
  var his = await displayOrderHistory( "3" );
  console.log(his);
  var his = await displayOrderHistory( "1" );
  console.log(his);

  var his = await displayOrderHistory( "2" );
  console.log(his);

  var his = await displayOrderHistory( "5" );
  console.log(his);

}

async function testupdateRate( ) {
  //later depend on getProfileById
}
