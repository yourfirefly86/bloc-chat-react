import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import * as firebase from 'firebase';
import User from './components/User.js';

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
  constructor(props) {
    super(props);
    this.changeActiveRoom = this.changeActiveRoom.bind(this);
    this.state = {
        activeRoom: "",
        user: null
    };
  }

  changeActiveRoom(roomId) {
    this.setState({activeRoom: roomId});
  }

  setUser(user) {
    this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bloc Chat</h1>
        </header>
        <div className="App-intro">
          {this.state.activeRoom.name}
          <RoomList firebase={firebase} changeActiveRoom={this.changeActiveRoom}/>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
          <User firebase={firebase} user={this.state.user} setUser={this.setUser.bind(this)}/>
        </div>
      </div>
    );
  }
}


export default App;
