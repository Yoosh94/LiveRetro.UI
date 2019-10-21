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

  public handleRoomNameUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      this.state.borderColorRoomName === '2px solid red' &&
      event.target.value.length > 0
    ) {
      this.setState({ borderColorRoomName: '' });
    }
    this.setState({ roomName: event.target.value });
  };

  public handleDisplayNameUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      this.state.borderColorDisplayName === '2px solid red' &&
      event.target.value.length > 0
    ) {
      this.setState({ borderColorDisplayName: '' });
    }
    this.setState({ displayName: event.target.value });
  };

  emptyDisplayName = () => {
    return this.setState({ borderColorDisplayName: '2px solid red' });
  };

  emptyJoinName = () => {
    return this.setState({ borderColorRoomName: '2px solid red' });
  };

  public handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = this.validateJoinRoom();
    if (isValid) {
      this.props.handleJoinRoom(this.state.roomName, this.state.displayName);
    } else {
      this.emptyJoinName();
      this.emptyDisplayName();
    }
  };

  public handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = this.validateCreateRoom();
    if (isValid) {
      this.props.handleCreateRoom(this.state.displayName);
    } else {
      this.emptyDisplayName();
    }
  };

  public validateJoinRoom = () =>
    this.state.displayName.length > 0 && this.state.roomName.length > 0;

  public validateCreateRoom = () => this.state.displayName.length > 0;

  public render() {
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
