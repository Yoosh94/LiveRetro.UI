import React, { ReactNode } from 'react';
import {
  BrowserRouter as Router, Link, Redirect, Route,
} from 'react-router-dom';
import socketClient from 'socket.io-client';
import ChoiceScreen from './ChoiceScreen';
import Room from './Room';
import { AppProps, AppState, Note } from './types/app';

let socket: SocketIOClient.Socket;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isAdmin: false,
      notes: [],
      participant: '',
      roomCode: '',
      roomJoined: false,
    };
    socket = socketClient(`localhost:5000/${this.state.roomCode}`);
  }

  public componentDidMount() {
    socket.on('roomCreated', (roomCode: string) => {
      console.log(`room has been created${roomCode}`);
      this.setState({ roomJoined: true, roomCode, isAdmin: true });
    });

    socket.on('joinRoomSuccess', (roomCode: string) => {
      console.log(`Room${roomCode}exists and joined`);
      this.setState({ roomJoined: true, roomCode });
    });

    socket.on('joinRoomFailed', () => {
      console.log('Room does not exisst.');
    });

    socket.on('noteUpdated', (notes: Note[]) => {
      this.setState({
        notes,
      });
    });
  }

  public handleCreateRoom = (adminName: string) => {
    socket.emit('createRoom', adminName);
    this.setState({ participant: adminName });
  }

  public joinRoom = (roomName: string, participantName: string) => {
    socket.emit('joinRoom', roomName, participantName);
    this.setState({ participant: participantName });
  }

  public handleNoteDropped = (roomCode: string, note: Note) => {
    console.log('new note');
    socket.emit('addNote', roomCode, note);

    const previousNoteState = this.state.notes;

    const theSameNote = previousNoteState.filter((stateNote) => stateNote.author === note.author && stateNote.id === note.id)[0];
    const allTheOtherNotes = previousNoteState.filter((stateNote) => stateNote.author !== note.author || stateNote.id !== note.id);
    const newNoteWithLocation = { ...theSameNote, ...note };
    this.setState({
      notes: allTheOtherNotes.concat(newNoteWithLocation),
    });
  }

  public createNote = () => {
    const newNote: Note = {
      author: this.state.participant,
      id: this.state.notes.length,
      positionX: 0,
      positionY: 0,
    };
    const notes = this.state.notes.concat(newNote);

    this.setState({
      notes,
    });
  }

  public render() {
    const choiceScreen: ReactNode = (
      <div>
        {this.state.roomCode ? <h2>Retro TIME</h2>
          : <ChoiceScreen handleCreateRoom={this.handleCreateRoom} handleJoinRoom={this.joinRoom} />}
      </div>
    );

    const room = (
      <Redirect to={`/room/${this.state.roomCode}/`} />
    );

    return (
      <Router>
        <div className="App">
          {this.state.roomJoined ? room : choiceScreen}
          <Route
            path={`/room/${this.state.roomCode}/`}
            render={() => (
              <Room
                roomCode={this.state.roomCode}
                notes={this.state.notes}
                participant={this.state.participant}
                handleNoteDropped={this.handleNoteDropped}
                createNote={this.createNote}
              />
            )}
          />
        </div>
      </Router>

    );
  }
}
export default App;
