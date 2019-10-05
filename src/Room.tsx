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
        this.props.handleNewNote(this.props.roomCode,{
            id:Number(id),
            positionX : event.screenX,
            positionY: event.screenY,
            author: this.props.participant
        });
    }

    render(){
        return(
            <div onDragOver={e=>this.onDragOver(e)} onDrop={e=> this.onDrop(e)}>
                <h3>Room Code : {this.props.roomCode}</h3>
                <button onClick={this.props.createNote}>+</button>
                <div>
                     {this.props.notes.map(note=> 
                    <StickyNote key={`${note.id}${note.author}`} 
                    id={note.id}
                     />
                     )}
                </div>
            </div>           
        )
    }
}

export default Room;