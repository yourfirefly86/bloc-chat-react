import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return};
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({newRoomName: ""});
  }

  handleRoomChange(e) {
    this.setState({newRoomName: e.target.value});
  }

  render() {
     const roomList = this.state.rooms.map((room) =>
       <li key = {room.key} onClick={this.props.changeActiveRoom}>{room.name}</li>
     );
     const createRoomForm = (
       <form onSubmit={this.createRoom}>
         <input type="text" value={this.state.newRoomName} placeholder="Enter Room Name" onChange={this.handleRoomChange} />
         <input type="submit" value="Create New Chat Room"/>
       </form>
     )

     return(
       <div>
       <div>{createRoomForm}</div>
       <ul>{roomList}</ul>
       </div>
     );
     }
   }

export default RoomList;
