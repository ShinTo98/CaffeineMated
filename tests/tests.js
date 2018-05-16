import {
  userSignup,
  userLogin,
  getProfileDetailById,
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
  changeProfilePhoto
} from '../database.js';

//var _Example = require("../database.js\"");

main();


async function main() {
  await testuserSignup();
  await testuserLogin();
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

  console.log( "Testing function userLogin with correct user credentials..." );
  console.log( "Expecting returned value:\t0" );
  console.log( "Actual returned value:\t" + returned );
  if( returned === 0 ) { console.log( "PASSED!\n" ); } else { console.log( "FAILED!\n" ); }
}

async function testuserPasswordChange( ) {
}
