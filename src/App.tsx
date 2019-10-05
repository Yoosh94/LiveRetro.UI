import React, { ReactNode } from 'react'
import { AppState, AppProps, Note } from './types/app';
import Room from './Room';
import ChoiceScreen from './ChoiceScreen';
import socketClient from 'socket.io-client'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
let socket : SocketIOClient.Socket;

class App extends React.Component<AppProps,AppState> {
  constructor(props : AppProps) {
    super(props);
    this.state = {
      roomJoined:false,
      isAdmin:false,
      roomCode:'',
      notes: [],
      participant:''
    }
    socket = socketClient(`localhost:5000/${this.state.roomCode}`);

  }

  componentDidMount(){

    socket.on('roomCreated',(roomCode:string)=>{
      console.log('room has been created' + roomCode);
      this.setState({roomJoined:true,roomCode:roomCode,isAdmin:true});
    });

    socket.on('joinRoomSuccess',(roomCode:string)=>{
      console.log('Room' + roomCode + 'exists and joined');
      this.setState({roomJoined:true,roomCode:roomCode});
    });

    socket.on('joinRoomFailed',()=>{
      console.log('Room does not exisst.')
    });

    socket.on('noteUpdated',(notes:Note[])=>{
      console.log("here are all the notes" + notes);
      this.setState({
          notes:notes
      });
    });
  }

  handleCreateRoom = (adminName:string) => {
    socket.emit('createRoom',adminName);
    this.setState({participant:adminName});
    
  };

  joinRoom = (roomName:string,participantName:string)=>{
    socket.emit('joinRoom',roomName,participantName);
    this.setState({participant:participantName});
  };

  handleNewNote(roomCode:string,note:Note){
    console.log("new note")
    socket.emit("addNote",roomCode,note)
  }

  createNote = () => {
        let newNote : Note = {
            author: this.state.participant,
            positionX : 0,
            positionY : 0,
            id : this.state.notes.length
        };
        var notes = this.state.notes.concat(newNote);

        this.setState({
            notes : notes
        });
    };

  render(){

    const choiceScreen :ReactNode = (<div>{this.state.roomCode ? <h2>Retro TIME</h2>:
      <ChoiceScreen handleCreateRoom={this.handleCreateRoom} handleJoinRoom={this.joinRoom}/>}</div>);
      
    const room = (
      <Redirect to={`/room/${this.state.roomCode}/`}/>
    )



    return(
      <Router>
      <div className="App">
        {this.state.roomJoined ? room: choiceScreen}
        <Route path={`/room/${this.state.roomCode}/`} render={() => <Room roomCode={this.state.roomCode} notes={this.state.notes} participant={this.state.participant} handleNewNote={this.handleNewNote} createNote={this.createNote}/>}/>
      </div>
      </Router>
      
      )
  };
}
export default App;
