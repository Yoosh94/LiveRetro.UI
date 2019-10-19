import React, { Component, ReactNode } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChoiceScreen from './ChoiceScreen';
import Room from './Room'
import { AppState } from './types/app';
const socket = socketIOClient('localhost:5000');


function About() {
  return <h2>About</h2>;
}

class App extends React.Component<{},AppState>{
  constructor(props) {
    super(props);
    this.state = {
      roomJoined:false,
      roomCode:'',
      isAdmin:false,
      notes:[]
    };

    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.handleNewNote = this.handleNewNote.bind(this);
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

  render = ():ReactNode => {

    const choiceScreen :ReactNode = (<div>{this.state.roomCode ? <h2>Retro TIME</h2>:
    <ChoiceScreen handleCreateRoom={this.handleCreateRoom} handleJoinRoom={this.joinRoom}/>}</div>);

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
