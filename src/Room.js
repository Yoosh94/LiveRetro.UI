import React, { Component } from 'react';
import Note from './Note'
class Room extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notes:[]
        }
    }


    CreateNote = () =>{
        this.setState({
            notes:[
                ...this.state.notes,
                <Note key={this.state.notes.length}/>
            ]
        })
    };

    render(){
        return(
            <div>
                <h3>Room Code : {this.props.roomCode}</h3>
                <button onClick={this.CreateNote}>+</button>
                <div>
                    {this.state.notes.map(note=> note)}
                </div>
            </div>           
        )
    }
}

export default Room;