import React from 'react';
import { ChoiceRoomProps, ChoiceRoomState } from './types/choiceRoom';

class ChoiceScreen extends React.Component<ChoiceRoomProps, ChoiceRoomState> {
  constructor(props: ChoiceRoomProps) {
    super(props);
    this.state = {
      displayName: '',
      roomName: '',
      borderColorDisplayName: '',
      borderColorRoomName: ''
    };
  }

  handleRoomNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomName: event.target.value });
  };

  handleDisplayNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ displayName: event.target.value });
  };

  emptyDisplayName = () => {
    let colour = '';
    const isValid = this.validateCreateRoom();
    if (!isValid) {
      colour = '2px solid red';
    }
    return this.setState({ borderColorDisplayName: colour });
  };

  emptyJoinName = () => {
    return this.setState({ borderColorRoomName: '2px solid red' });
  };

  handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = this.validateJoinRoom();
    if (isValid) {
      this.props.handleJoinRoom(this.state.roomName, this.state.displayName);
    } else {
      this.emptyJoinName();
      this.emptyDisplayName();
    }
  };

  handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = this.validateCreateRoom();
    if (isValid) {
      this.props.handleCreateRoom(this.state.displayName);
    } else {
      this.emptyDisplayName();
    }
  };

  validateJoinRoom = () => {
    return this.state.displayName.length > 0 && this.state.roomName.length > 0;
  };

  validateCreateRoom = () => {
    return this.state.displayName.length > 0;
  };

  render() {
    const selectionComponent = (
      <div>
        <label>Display Name:</label>
        <input
          type='text'
          name='displayName'
          onChange={this.handleDisplayNameUpdate}
          style={{ border: this.state.borderColorDisplayName }}
        />
        <br />
        <button type='button' onClick={this.handleJoinRoom}>
          Join Room
        </button>
        <input
          type='text'
          name='roomCode'
          onChange={this.handleRoomNameUpdate}
          style={{ border: this.state.borderColorRoomName }}
        />
        <button onClick={this.handleCreateRoom}>Create Room</button>
      </div>
    );

    return <div>{selectionComponent}</div>;
  }
}

export default ChoiceScreen;
