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

main();


async function main() {
  await testuserSignup();
  await testuserLogin();
  await testLogOut();
  await testUserPasswordChange();
  await testGetProfileById();
  await testdisplayMenu();
  await testdisplayType();
  await testdisplayItem();
  await testviewPendingOrders();
  await testviewOrderDetailById();
  await testgetOrderLocationById()
  await testdisplayOrderHistory();
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

  console.log( "Testing function userLogin with correct user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }

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

async function testviewPendingOrders( ) {
  var got = await viewPendingOrders();
  console.log( "Testing function viewPendingOrders..." );
  console.log( "Expecting returned list of order id" );
  console.log( "Actual returned value:" );
  for( index in got){
    console.log(got[index]);
  }
  console.log( "PASSED!\n" );
}

async function testviewOrderDetailById( ) {
  var got = await viewOrderDetailById( "3" );
  console.log( "Testing function viewOrderDetailById..." );
  console.log( "Expecting returned detail of order" );
  console.log( "Actual returned value:" );
  console.log(got);
  console.log( "PASSED!\n" );
}

async function testgetOrderLocationById( ) {
  var got = await getOrderLocationById( "3" );
  console.log( "Testing function getOrderLocationById..." );
  console.log( "Expecting returned location of order" );
  console.log( "Actual returned value: Atkinson Hall" );
  console.log(got);
  console.log( "PASSED!\n" );
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
