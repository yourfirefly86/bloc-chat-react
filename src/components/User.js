import React, { Component } from 'react';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      username = ""
    }
  }
}

//Display the username IN USER COMPONENT
this.props.user.displayName

//On Click
const provider = new this.props.firebase.auth.GoogleAuthProvider();
this.props.firebase.auth().signInWithPopup( provider );

//Sign Out
this.props.firebase.auth().signOut();

componentDidMount () {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
});
}
