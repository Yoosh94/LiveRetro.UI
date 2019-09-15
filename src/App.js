import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import SocketContext from './socket-context'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChoiceScreen from './ChoiceScreen';
import Room from './Room'
const socket = socketIOClient('localhost:5000');


function About() {
  return <h2>About</h2>;
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      roomJoined:false,
      roomCode:'',
      isAdmin:false,
      notes:[]
    };
  }

  componentDidMount(){

    socket.on('roomCreated',(msg)=>{
      console.log('room has been created' + msg);
      this.setState({roomJoined:true,roomCode:msg,isAdmin:true});
    });

    socket.on('joinRoomSuccess',(msg)=>{
      console.log('Room' + msg + 'exists and joined');
      this.setState({roomJoined:true,roomCode:msg});
    });

    socket.on('joinRoomFailed',()=>{
      console.log('Room does not exisst.')
    });

    // socket.on('noteUpdated',notes=>{
    //   this.setState({
    //       notes:notes
    //   });
    // });
  }

  handleCreateRoom(adminName) {
    socket.emit('createRoom',adminName);
  };

  joinRoom(roomName,participantName){
    socket.emit('joinRoom',roomName,participantName);
  };

  handleNewNote(roomCode,note){
    console.log("new note")
    socket.emit("addNote",roomCode,note)
  }

  render(){
    const choiceScreen = (<div>{this.state.roomCode ? <h2>Retro TIME</h2>:
      <ChoiceScreen handleCreateRoom={this.handleCreateRoom} handleJoinRoom={this.joinRoom}/>}
      <Route path="/create" component={About} /></div>);

const room = (
  <Room adminMode={this.state.isAdmin} roomCode={this.state.roomCode} notes={this.state.notes} handleNewNote={this.handleNewNote}/>
)

    return (
      <Router>
      <div className="App">
        {this.state.roomJoined ? room: choiceScreen}
      </div>
      </Router>
    );
  }
}

export default App;
