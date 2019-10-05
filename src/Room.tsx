import React from 'react'
import { RoomProps, RoomState } from './types/room';
// import Note from './Note';
import {Note} from './types/app'
import StickyNote from './StickyNote';
class Room extends React.Component<RoomProps,RoomState>{
    constructor(props : RoomProps){
        super(props);
        this.state = {
            notes: []
        };
    }

    onDragOver = (e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
    }

    onDrop = (event : React.DragEvent<HTMLDivElement>) =>{
        let id = event.dataTransfer.getData("id");
        let author = event.dataTransfer.getData("author");
        this.props.handleNewNote(this.props.roomCode,{
            id:Number(id),
            positionX : event.screenX,
            positionY: event.screenY,
            author: author
        });
    }

    render(){
        return(
            <div onDragOver={e=>this.onDragOver(e)} onDrop={e=> this.onDrop(e)}>
                <h3>Room Code : {this.props.roomCode}</h3>
                <button onClick={this.props.createNote}>+</button>
                <div style={{position:'absolute'}}>
                     {this.props.notes.map(note=> 
                    <StickyNote key={`${note.id}${note.author}`} 
                    id={note.id}
                    author={note.author}
                     />
                     )}
                </div>
            </div>           
        )
    }
}

export default Room;