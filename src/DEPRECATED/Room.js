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
                <Note key={this.state.notes.length} id={this.state.notes.length} />
            ]
        })
    };

    onDragOver = (e) =>{
        e.preventDefault();
    }

    onDrop = (event) =>{
        let id = event.dataTransfer.getData("id");
        this.props.handleNewNote(this.props.roomCode,{
            id:id,
            positionX : event.screenX,
            positionY: event.screenY
        });
    }

    render(){
        return(
            <div onDragOver={e=>this.onDragOver(e)} onDrop={e=> this.onDrop(e)}>
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