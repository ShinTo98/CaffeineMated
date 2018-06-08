# CaffeineMated -- version:alpha 0.1.0

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). React-Native, Firebase, and Native-Base was used to develop this app. 

Below you'll find information about using our App. Having difficult deciding whether to sleep a couple more minutes or wakeup
early to buy a cup of coffee? Why not have both the coffee and quality sleep time? With CaffeineMated, students can enjoy their favorite drink wherever they want, whenever they want! Through CaffeineMated, we hope to bring convenience to students and let them enjoy the drink of their choice whenever they like, wherever they like. With their favorite drinks, students will be ready to fight through another day of school.

## Table of Contents

* [Requirements for Using This App](#requirements)
* [Installation](#installation-before-using-the-app)
* [Sample Workflow](#sample-workflow)
* [Known Issues](#known-issues)
* [Contact Us](#contact-us)


## Requirements

To demo this app, please make sure that you have the following:
  
  - __Node v9.6.1__ and up [Download here if needed](https://nodejs.org/en/download/current/)
  - Two demo user (one will act as coffee buyer, one will act as coffee carrier).
  - A command line terminal
  - Two IOS device (Iphone 6 Plus and Up) *Our app does not support Android
  - Have the two IOS device download __Expo__ via the Apple app store. [Expo](https://expo.io/)
  
The rest of the requirements will be installed via __npm install__
  
## Installation Before Using the App

1. git clone this repository via ssh: __git@github.com:ShinTo98/CaffeineMated.git__
2. cd into the folder named "CaffeineMated"
3. run the command __npm install__
   - This should install all the required libraries and modules automatically base on the package.json file. 
   - If react-native not installed, run __npm install react-native__. It should install react-native@0.54.4.
   
After installation finishes properly, you should be good to go!

## Sample Workflow
Here will be a basic walk through on how to use our App.

You have to run __npm start -s__ in the terminal (while inside the CaffeineMated folder). Using this, your computer will host the app in the network. You should see something similar in the terminal:

![alt text](https://github.com/ShinTo98/CaffeineMated/blob/master/images/DemoNpmStart.png)

--------------------------------------------------------------------------------------------------------------------

__IMPORTANT__ Please make sure that your devices are in the same Wi-Fi network as the computer, otherwise the device
won't be able to connect to the app hosted by the computer

--------------------------------------------------------------------------------------------------------------------

The ip address boxed inside the terminal is the address of where the app will be hosted. You can type __s__ inside the same
terminal to have a text message containing the app URL and EXPO ios download link sent to your phone.

Now let's run the app on our devices!
1. Open the app URL on your device (it should open up in the Expo app). **If screen flashes black and exit Expo, that is a bug caused by Expo. Simply close Expo in the background and reopen the URL should do the job**
2. After your device successfully connect to the app URL and app finishes building you should see a similar image as the following: 

![alt text](https://github.com/ShinTo98/CaffeineMated/blob/master/images/DemoConnected.png)

3. Now your device should be in the main page of the application! You can now start using CaffeineMated!!
   - Have one person be a carrier, one person be a buyer
   - Please note that due to database size and internet, images and items might take a few seconds to load. Please wait for a few seconds before navigating away! The items will render eventually. In ideal internet speed, items should load and render relatively fast.
   - Follow this demo video to help you further explore the functionalities of our application.
   
Enjoy!! : )

## Known Issues
Below is the list of known bugs and issues:
  - On some occasions, there will be a warning about using flex-direction on View. This was necessary for displaying list of of orders and drinks.
  - On some occasions, there can also be a warning about using setState and calling other functions while component hasn't been mounted or is in the process of unmounting. This is caused by the nature of asynchronous functions from firebase database. The requests was still in progress and the user has navigated to another component. This will result in functions still in process call while component is unmounting.

## Contact Us
Still have more questions? Or need troubleshooting help?

Contact Us!
