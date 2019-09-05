import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ChoiceScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={roomName:"",displayName:""};
    }

    handleRoomNameUpdate = (event) =>{
        this.setState({roomName:event.target.value});
    }

    handleDisplayNameUpdate = (event) =>{
        this.setState({displayName:event.target.value});
    }

    handleJoinRoom = (e) =>{
        this.validateDetails();
        this.props.handleJoinRoom(this.state.roomName);
    }

    validateDetails =() =>{   
        return this.state.displayName.length > 0 && this.state.roomName.length > 0;
    }
    
    render(){
        return(
            <div>
                <label>
                    Display Name: 
                </label>
                <input type="text" name="displayName" onChange={this.handleDisplayNameUpdate}/>
                <br/>
                <button type='button'onClick={this.handleJoinRoom}>Join Room</button>
                <input type="text" name="roomCode" onChange={this.handleRoomNameUpdate}/>
                <Link to='/create' onClick={this.props.handleCreateRoom}>Create Room</Link>
            </div>
        )
    };
}

export default ChoiceScreen;