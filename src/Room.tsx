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


    CreateNote = () =>{
        // let newNote = <Note key={this.state.notes.length}
        //  id={this.state.notes.length}} />
        let newNote : Note = {
            positionX : 0,
            positionY : 0,
            id : this.state.notes.length
        };
        var notes = this.state.notes.concat(newNote);

        this.setState({
            notes : notes
        });
    };


    onDragOver = (e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
    }

    onDrop = (event : React.DragEvent<HTMLDivElement>) =>{
        let id = event.dataTransfer.getData("id");
        this.props.handleNewNote(this.props.roomCode,{
            id:Number(id),
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
                    {this.state.notes.map(note=> 
                    <StickyNote key={note.id} 
                    id={note.id}
                     />
                     )}
                </div>
            </div>           
        )
    }
}

export default Room;