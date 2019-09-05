import React, { Component } from 'react';

class Room extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div><h3>Room Code : {this.props.roomCode}</h3>
            {this.props.adminMode ? null : <div><h2>WAITING FOR ACCESS</h2></div>}
            </div>
            
        )
    }
}

export default Room;