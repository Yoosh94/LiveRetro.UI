import React from 'react';
import { ChoiceRoomProps, ChoiceRoomState } from './types/choiceRoom';

class ChoiceScreen extends React.Component<ChoiceRoomProps, ChoiceRoomState> {
  constructor(props : ChoiceRoomProps) {
    super(props);
    this.state = {
      displayName: '',
      roomName: '',
    };
  }

    handleRoomNameUpdate = (event:React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ roomName: event.target.value });
    }

    handleDisplayNameUpdate = (event:React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ displayName: event.target.value });
    }

    handleJoinRoom = (e:React.MouseEvent<HTMLButtonElement>) => {
      const isValid = this.validateJoinRoom();
      if (isValid) {
        this.props.handleJoinRoom(this.state.roomName, this.state.displayName);
      }
    }

    handleCreateRoom = (e:React.MouseEvent<HTMLButtonElement>) => {
      const isValid = this.validateCreateRoom();
      if (isValid) {
        this.props.handleCreateRoom(this.state.displayName);
      }
    }

    validateJoinRoom =() => this.state.displayName.length > 0 && this.state.roomName.length > 0

    validateCreateRoom =() => this.state.displayName.length > 0

    render() {
      const selectionComponent = (
        <div>
          <label>
                Display Name:
          </label>
          <input type="text" name="displayName" onChange={this.handleDisplayNameUpdate} />
          <br />
          <button type="button" onClick={this.handleJoinRoom}>Join Room</button>
          <input type="text" name="roomCode" onChange={this.handleRoomNameUpdate} />
          <button onClick={this.handleCreateRoom}>Create Room</button>
        </div>
      );

      return (
        <div>
          {selectionComponent}
        </div>
      );
    }
}

export default ChoiceScreen;
