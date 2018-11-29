import React, { Component } from 'react';

class User extends Component{
  constructor(props){
    super(props);
  }


//Display the username IN USER COMPONENT
//this.props.user.displayName

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  })
}

render() {
  return(
    <div>
      <p className="username">{ this.props.user ? this.props.user.displayName : "Guest"}</p>
      <button className="signin" onClick={ this.signIn.bind(this)}>Sign In</button>
      <button className="signout" onClick={ this.signOut.bind(this)}>Sign Out</button>
    </div>
  )
}
}

export default User;
