import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import App from './App';
import * as firebase from 'firebase';
import firebaseconfig from './config';
// import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import './index.css';

const STORAGEKEY = 'KEY_FOR_LOCAL_STORAGE';

firebase.initializeApp(firebaseconfig);
const AUTH = firebase.auth();
const PROVIDER = new firebase.auth.FacebookAuthProvider();

function isAuthenticated() {
  return !!AUTH.currentUser || !!localStorage.getItem(STORAGEKEY);
}

function Authenticate(event) {
  AUTH.signInWithRedirect(PROVIDER)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('Token: ' + token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });
}

class Main extends Component {
  componentDidMount() {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // console.log(user);
        window.localStorage.setItem(STORAGEKEY, user.uid);
        this.setState({
          user: {
            uid: user.uid,
            avatar: user.photoURL,
            name: user.displayName,
          },
        });
      } else {
        // User is signed out.
        window.localStorage.removeItem(STORAGEKEY);
        this.setState({ user: { uid: null } });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <App authenticate={Authenticate} isAuthenticated={isAuthenticated} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
// registerServiceWorker();
