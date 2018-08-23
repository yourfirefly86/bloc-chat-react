import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList.js';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCOC_Y3gPUjCpFxbLOM2kFFVKsZz5vHyA8",
    authDomain: "bloc-chat-react-9aeee.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-9aeee.firebaseio.com",
    projectId: "bloc-chat-react-9aeee",
    storageBucket: "bloc-chat-react-9aeee.appspot.com",
    messagingSenderId: "569353514187"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bloc Chat</h1>
        </header>
        <p className="App-intro">
          <RoomList firebase={firebase}/>
        </p>
      </div>
    );
  }
}

export default App;
