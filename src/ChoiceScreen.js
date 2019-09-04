import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ChoiceScreen extends React.Component{
    constructor(props){
        super(props)
    }

    
    render(){
        return(
            <div>
                <button type='button' onClick={this.props.handleJoinRoom}>Join Room</button>
                
                <Link to='/create' onClick={this.props.handleCreateRoom}>Create Room</Link>
            </div>
        )
    };
}

export default ChoiceScreen;