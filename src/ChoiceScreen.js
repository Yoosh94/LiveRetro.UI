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
        const isValid = this.validateJoinRoom();
        if(isValid){
            this.props.handleJoinRoom(this.state.roomName);
        }
    }

    handleCreateRoom = (e) =>{
        const isValid = this.validateCreateRoom();
        if(isValid){
            this.props.handleCreateRoom();
        } 
    }

    validateJoinRoom =() =>{   
        return this.state.displayName.length > 0 && this.state.roomName.length > 0;
    }

    validateCreateRoom =() =>{   
        return this.state.displayName.length > 0;
    }
    
    render(){
        const selectionComponent = (<div>
            <label>
                Display Name: 
            </label>
            <input type="text" name="displayName" onChange={this.handleDisplayNameUpdate}/>
            <br/>
            <button type='button'onClick={this.handleJoinRoom}>Join Room</button>
            <input type="text" name="roomCode" onChange={this.handleRoomNameUpdate}/>
            <Link to='/create' onClick={this.handleCreateRoom}>Create Room</Link>
            </div>
        )

        

        return(
            <div>
            {selectionComponent}

            </div>
        )
    };
}

export default ChoiceScreen;