import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      content: "",
      sentAt: "",
      roomId: "",
      messages: [],
      username: "",
    }

    this.messagesRef = this.props.firebase.database().ref("Messages");
    this.handleChange = this.handleChange.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( messages ) });
      console.log(this.state.messages)
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    })
  }

  createNewMessage(e) {
    console.log(this.props.activeRoom)
    this.messagesRef.push({
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.props.activeRoom.key
    });
    this.setState({
      content: "",
      sentAt: "",
      roomId: ""
    });
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    this.createNewMessage();
    this.setState({ content: "" });
  }

  formatTime(time) {
  console.log(time);
  var date = new Date(time);
  if( this.hours >12 )
  { this.hours = this.hours - 12; }
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() % 12)+ ":" + date.getMinutes();
}

  render(){
    return (
      <div className="message-list">
        <div className="message-group">
          <h3>Messages</h3>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
            <div key={message.key} className="messages">
              <p id="username">Username: {message.username}</p>
              <p id="content">Message: {message.content}</p>
              <p id="timestamp">Timestamp: {this.formatTime(message.sentAt)}</p>
            </div>
            )}
        </div>
        <div  className="form-inline" id="new-message">
        { this.props.activeRoom && this.props.user !== null ?
          <form className="form-group" onSubmit={this.handleMessageSubmit}>
              <label> New Message:
                <input className="form-control" type="text" value={this.state.content} onChange={this.handleChange} placeholder="Enter Message" />
              </label>
              <input className="btn-submit" type="submit" value="submit" />
          </form>:
            <h3>Happy Chatting!</h3>
          }
        </div>
        </div>
  );
}
}

export default MessageList;
