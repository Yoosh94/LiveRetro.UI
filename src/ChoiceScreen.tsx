import React from 'react';
import Button from 'antd/es/button';
import { Input } from 'antd';
import { ChoiceRoomProps, ChoiceRoomState } from './types/choiceRoom';
import './ChoiceScreen.css';


class ChoiceScreen extends React.Component<ChoiceRoomProps, ChoiceRoomState> {
  constructor(props: ChoiceRoomProps) {
    super(props);
    this.state = {
      displayName: '',
      roomName: '',
      borderColorDisplayName: '',
      borderColorRoomName: '',
    };
  }

  handleRoomNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { borderColorRoomName } = this.state;
    if (borderColorRoomName === '2px solid red' && event.target.value.length > 0) {
      this.setState({ borderColorRoomName: '' });
    }
    this.setState({ roomName: event.target.value });
  };

  handleDisplayNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { borderColorDisplayName } = this.state;
    if (borderColorDisplayName === '2px solid red' && event.target.value.length > 0) {
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

  handleJoinRoom = () => {
    const { handleJoinRoom } = this.props;
    const { roomName, displayName } = this.state;
    const isValid = this.validateJoinRoom();
    if (isValid) {
      handleJoinRoom(roomName, displayName);
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
      <div className="ChoiceScreen">
        <Input placeholder="Display Name" onChange={this.handleDisplayNameUpdate} style={{ border: this.state.borderColorDisplayName }} />
        <br />
        <Button type="primary" onClick={this.handleJoinRoom}>Join Room</Button>
        <input
          type='text'
          name='roomCode'
          onChange={this.handleRoomNameUpdate}
          style={{ border: this.state.borderColorRoomName }}
        />
        <button onClick={this.handleCreateRoom}>Create Room</button>
      </div >
    );

    return <div>{selectionComponent}</div>;
  }
}

export default ChoiceScreen;
