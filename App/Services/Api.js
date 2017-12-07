// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { NativeModules } from "react-native";
import firebase from 'firebase';
import Config from 'react-native-config';
import { GoogleSignin } from 'react-native-google-signin';

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const twitterLogin = () => {
    const { RNTwitterSignIn } = NativeModules;
    RNTwitterSignIn.init(Config.TwitterConsumerAPIKey, Config.TwitterConsumerSeceret);

    return new Promise((resolve, reject) => {
      RNTwitterSignIn.logIn()
      .then(function(loginData){
        const accessToken = firebase.auth
        .TwitterAuthProvider
        .credential(
          loginData.authToken,
          loginData.authTokenSecret
        );
        firebase.auth().signInWithCredential(accessToken)
        .then(function(res){
          let user = firebase.auth().currentUser;
          let userinfo = {
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          };
          console.log(userinfo);
          return resolve({status: true, user: userinfo});
        })
        .catch(function(error) {
          return resolve({status: false});
        });
      }).catch(function(error) {
        console.log(error);
        return resolve({status: false});
      });
    });
  }
  
  const facebookLogin = () => {
    const FBSDK = require('react-native-fbsdk');
    const {
      LoginButton,
      AccessToken,
      LoginManager
    } = FBSDK;

    return new Promise((resolve, reject) => {
      LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_about_me']).then(
        function(result) {
          if (result.isCancelled) {
            return resolve({status: false});
          } else {
            AccessToken.getCurrentAccessToken()
              .then(function(data) {
                var accessToken = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                firebase.auth().signInWithCredential(accessToken)
                .then(function(res){
                  let user = firebase.auth().currentUser;
                  let userinfo = {
                    phoneNumber: user.phoneNumber,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                  };
                  return resolve({status: true, user: userinfo});
                })
                .catch(function(error) {
                  console.log(error);
                  return resolve({status: false});
                });
              })
            .catch(function(error){
              console.log(error);
              return resolve({status: false});
            })
          }
        },
        function(error) {
          console.log(error);
          return resolve({status: false});
        }
      );
    });
  }

  const googleLogin = () => {
    return new Promise((resolve, reject) => {
      GoogleSignin.configure({
        //iosClientId: Config.GoogleIosClientID
        iosClientId: '1081430382071-th01l8r5v2hl5rt99g8ghointc4hj5vb.apps.googleusercontent.com'
      })
      .then(() => {
        
        GoogleSignin.signIn()
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        // GoogleSignin.currentUserAsync()
        // .then((user) => {
        //   console.log(user);
        //   var accessToken = firebase.auth.GoogleAuthProvider.credential(token);
        //   firebase.auth().signInWithCredential(accessToken)
        //   .then(function(res){
        //     console.log(res);
        //     const user = firebase.auth().currentUser;
        //     console.log(user);
        //     return resolve({status: true, user: user});
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //     return resolve({status: false});
        //   });
        // })
        // .catch((err) => {
        //   console.log(err);
        //   return resolve({status: false});
        // })
      })
      .catch(function(error) {
        console.log(error);
        return resolve({status: false});
      });
    });
  }

  const phoneLogin = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().useDeviceLanguage();
    });
  }

  const getAirLines = () => {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/airline').once('value')
      .then(function(snapshot) {
        return resolve({status: true, airlines: snapshot.val()});
      })
      .catch((error) => {
        console.log(error)
        return resolve({status: false, message: error.message});
      });
    });
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    twitterLogin,
    facebookLogin,
    googleLogin,
    getAirLines,
  }
}

// let's return back our create method as the default.
export default {
  create
}
