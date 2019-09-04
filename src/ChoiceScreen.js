import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ChoiceScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    handleRoomNameUpdate = (event) =>{
        this.setState({roomName:event.target.value});
    }

    handleJoinRoom = (e) =>{
        this.props.handleJoinRoom(this.state.roomName);
    }
    
    render(){
        return(
            <div>
                <button type='button'onClick={this.handleJoinRoom}>Join Room</button>
                <input type="text" name="name" onChange={this.handleRoomNameUpdate}/>
                <Link to='/create' onClick={this.props.handleCreateRoom}>Create Room</Link>
            </div>
        )
    };
}

export default ChoiceScreen;