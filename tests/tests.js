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
  displayOrderHistory,
  getItemDetailWithOnlyId,
  updateOrderRate,
  saveOrder,
  viewAllOrders
} from '../database.js';

main();

//npx babel-node tests.js
async function main() {

  await testdisplayType();
  await testdisplayItem();
  await testviewPendingOrders();
  await testGetProfileById();
  await testGetProfileDetailById();
  await testgetOrderLocationById();
  await testdisplayOrderHistory();
  await testGetItemDetailWithOnlyId();
  await testChangeUserName();
  await testChangeProfilePhoto();
}


async function testuserLogin() {
  var email = "unittest@ucsd.edu";
  var password = "password";
  var returned = await userLogin(email, password);

  password = "badpassword";
  var returnederror = await userLogin(email, password);

  console.log("Testing function userLogin with correct user credentials...");
  console.log("Expecting returned value:\t0");
  console.log("Actual returned value:\t" + returned);
  if (returned === 0) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }

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


async function testGetProfileById() {
  console.log( "Testing function getProfileById..." );

  var his = await getProfileById( "test1" );

  var expected = {
    "default_mode": "buyer",
    "history": {
      "0": "historyOrder1",
      "1": "historyOrder2",
      "size": 2,
    },
    "rate": 4,
    "username": "testname",
  }

  for (index in his) {
    let item = his[index];
    let expectedItem = expected[index];

    if (index === "history") {

      for (inner in item) {

        if (item[inner] == expectedItem[inner]) {
          console.log("PASSES!\n");

        }
        else {
          console.log("FAILED!\n");

        }
      }
    }
    else {
      if (item === expectedItem) {
        console.log("PASSES!\n");
      }
      else {
        console.log("FAILED!\n");

      }
    }
  }
}


async function testviewPendingOrders() {

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
}


async function testGetProfileDetailById() {
  console.log( "Testing function getProfileDetailById..." );

  var his = await getProfileDetailById( "test1" );

  var expected = {
    "default_mode": "buyer",
    "history": {
      "0": "historyOrder1",
      "1": "historyOrder2",
      "size": 2,
    },
    "rate": 4,
    "username": "testname",
  }

  for (index in his) {
    let item = his[index];
    let expectedItem = expected[index];

    if (index === "history") {

      for (inner in item) {

        if (item[inner] == expectedItem[inner]) {
          console.log("PASSES!\n");

        }
        else {
          console.log("FAILED!\n");

        }
      }
    }
    else {
      if (item === expectedItem) {
        console.log("PASSES!\n");
      }
      else {
        console.log("FAILED!\n");

      }
    }
  }

}


async function testdisplayMenu( ) {
  var gotMenu = await displayMenu();

  var expectedReturnedMenu = [
    ['https://globalassets.starbucks.com/assets/73f48e9a2580412b8b28a8e75d4b4642.jpg',
      'Cold Coffees'],
    ['https://globalassets.starbucks.com/assets/3056aa7849a0477ea4ed137b66910324.jpg',
      'Drinks'],
    ['https://www.starbucks.com/assets/963d78767f4a4710b6d48fd526fe9eb8.jpg',
      'Frappuccino'],
    ['https://globalassets.starbucks.com/assets/60058630d5a14a679054712b6afa77c3.jpg',
      'Hot Coffees'],
    ['https://globalassets.starbucks.com/assets/98659cd2d5d94dfdad933dfa17c3d6f3.jpg',
      'Hot Teas'],
    ['https://www.starbucks.com/assets/8bffaf8cd08743b6add5b20cb1f3eb2b.jpg',
      'Iced Teas']
  ];

  console.log("Testing function displayMenu...");
  //console.log( "Expecting returned list of pairs of [img, type]" );
  //console.log( "Actual returned value:\n" );
  var noProblem = true;
  for (pair in gotMenu) {
    if (gotMenu[pair][0] !== expectedReturnedMenu[pair][0] ||
      gotMenu[pair][1] !== expectedReturnedMenu[pair][1]) {
      noProblem = false;
    }
    //console.log( gotMenu[pair][0] );
  }
  if (noProblem) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
}


async function testdisplayType() {
  var gotSubMenu = await displayType('Drinks');
  var expectedReturnedDrinks = [
    [
      'https://globalassets.starbucks.com/assets/3056aa7849a0477ea4ed137b66910324.jpg',
      'DR01',
      'Pink Drink'
    ],
    [
      'https://globalassets.starbucks.com/assets/452d9229393844b9b57263a7d0d9cf1e.jpg',
      'DR02',
      'Hot Chocolate'
    ],
    [
      'https://globalassets.starbucks.com/assets/cff93f212cda4cd09e7dfa5a358caeed.jpg',
      'DR03',
      'Strawberry Acai Refreshers™'
    ],
    [ 'https://globalassets.starbucks.com/assets/c05d9645bcad432695e2e2b42fda77f1.jpg',
      'DR04',
      'Cool Lime Lemonade Refreshers' ],
    [ 'https://globalassets.starbucks.com/assets/65cd490369574169b7da525a715c388b.jpg',
      'DR05',
      'Very Berry Hibiscus Lemonade Refreshers' ],
    [ 'https://globalassets.starbucks.com/assets/fc862fb36e71455c97360082d513c48e.jpg',
      'DR06',
      'Ombré Pink Drink' ],
    [ 'https://globalassets.starbucks.com/assets/195a5b9e040d4da18464ce64813ce44f.jpg',
      'DR07',
      'Violet Drink' ],
    [ 'https://globalassets.starbucks.com/assets/b74472856c7343b88f78e01c0e736d85.jpg',
      'DR08',
      'White Hot Chocolate' ],
    [ 'https://globalassets.starbucks.com/assets/5f58206cbf3d463ebdac5f9f281aded1.jpg',
      'DR09',
      'Chocolate Smoothie' ],
    [ 'https://globalassets.starbucks.com/assets/75f0afa0cf954a9b819ae7d031275e39.jpg',
      'DR10',
      'Cinnamon Dolce Crème' ]
];


  console.log("Testing function displayType...");



  //console.log( "Expecting returned list of pairs of [img, id, name]" );
  //console.log( "Actual returned value:" );
  var noProblem = true;
  for (pair in gotSubMenu) {
    if (gotSubMenu[pair][0] !== expectedReturnedDrinks[pair][0] ||
      gotSubMenu[pair][1] !== expectedReturnedDrinks[pair][1]) {
      noProblem = false;
    }
  }
  if (noProblem) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
}


async function testdisplayItem() {
  var got = await displayItem("Hot Coffees", "HC02");
  var expectedItem = {
    description: 'Espresso shots are topped with hot water to produce a light layer of crema. The result is this wonderfully rich cup with depth and nuance.',
    image: 'https://globalassets.starbucks.com/assets/2a4807223b53455b89f792b5e25ce89e.jpg',
    name: 'Caffè Americano',
    price: {grande: 3.25, short: 2.45, tall: 2.65, venti: 3.45}
  };


  console.log("Testing function displayItem...");
  //console.log( "Expecting returned list of [name, description, image]" );
  //console.log( "Actual returned value:" );
  var noProblem = true;
  for (pair in got) {
    if (pair !== "price" && got[pair] !== expectedItem[pair]) {
      noProblem = false;
    }
    else if (pair === "price") {
      for (tag in got.price) {
        if (got.price[tag] !== expectedItem.price[tag]) {
          noProblem = false;
        }
      }
    }
  }
  if (noProblem) {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
}


function compareObj(obj1, obj2) {
  var equal = true;

  for (tag in obj1) {
    if (obj1[tag] !== obj2[tag]) {
      noProblem = false;
    }
  }

  return equal;
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


async function testdisplayOrderHistory() {
  console.log("Testing function displayOrderHistory...");

  var his = await displayOrderHistory("test1");
  var expected = await getProfileById("test1");
  for (index in his) {
    if (his[index] === expected.history[index]) {
      console.log("PASSED!\n");
    } else {
      console.log("FAILED!\n");
    }
  }
}


async function testGetItemDetailWithOnlyId() {
  console.log( "Testing function getItemDetailWithOnlyId..." );
  var his = await getItemDetailWithOnlyId("CC01");
  var expected = {
    description: '  With less milk than a latte, Iced Cappuccino offers a stronger espresso flavor, a luxurious texture and a velvety, frothy foam with a crisp, cool undercurrent.',
    image: 'https://globalassets.starbucks.com/assets/0388f3540da3441ba182800eae2a83b8.jpg',
    name: 'Iced Cappuccino',
    price: {
      grande: 3.95,
      tall: 3.45,
      venti: 4.75 }
    }

    for (index in his) {
      let content = his[index];
      let exp = expected[index];

      if (index === "price") {
        for (inner in content) {
          if (content[inner] === exp[inner]) {
            console.log("PASSED!\n");
          } else {
            console.log("FAILED!\n");
            console.log(content[inner]);
          }
        }
      }
      else {
        if (content === exp) {
          console.log("PASSED!\n");
        } else {
          console.log("FAILED!\n");
          console.log(content);
        }
      }
    }
}


async function testChangeUserName() {
  console.log( "Testing function changeUserName..." );
  var his = await changeUserName("test_change", "newname");
  var profile = await getProfileById("test_change");

  if (profile.username === "newname") {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
}


async function testChangeProfilePhoto() {
  console.log( "Testing function changeProfilePhoto..." );
  var his = await changeProfilePhoto("test_change", "www.baidu.com");
  var profile = await getProfileById("test_change");

  if (profile.photo === "www.baidu.com") {
    console.log("PASSED!\n");
  } else {
    console.log("FAILED!\n");
  }
}


async function testacceptOrder() {

}
