import React, { Component } from 'react';

class Room extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }


    render(){
        return(
            <div>
                <h3>Room Code : {this.props.roomCode}</h3>
                <button>+</button>
            </div>           
        )
    }
}

export default Room;