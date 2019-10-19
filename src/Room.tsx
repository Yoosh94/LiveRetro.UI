import React from 'react'
import { RoomProps, RoomState } from './types/room';
import StickyNote from './StickyNote';
class Room extends React.Component<RoomProps,RoomState>{
    constructor(props : RoomProps){
        super(props);
    }

    onDragOver = (e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
    }

    onDrop = (event : React.DragEvent<HTMLDivElement>) =>{
        let id = event.dataTransfer.getData("id");
        let author = event.dataTransfer.getData("author");
        this.props.handleNoteDropped(this.props.roomCode,{
            id:Number(id),
            positionX : event.screenX,
            positionY: event.screenY,
            author: author
        });
    };

    onDragStart = (event:React.DragEvent<HTMLDivElement>,id:number) =>{
        console.log("dragId" + id);
        event.dataTransfer.setData("id",String(id));
        event.dataTransfer.setData("author",this.props.participant);
    };

    render(){
        return(
            <div onDragOver={e=>this.onDragOver(e)} onDrop={e=> this.onDrop(e)}>
                <h3>Room Code : {this.props.roomCode}</h3>
                <button onClick={this.props.createNote}>+</button>
                <div style={{width:'700px',height:'1000px'}}>
                     {this.props.notes.map(note=> 
                    <StickyNote  key={`${note.id}${note.author}`}
                    id={note.id}
                    screenX={note.positionX}
                    screenY={note.positionY}
                    onDrag={this.onDragStart}
                     />
                     )}
                </div>
            </div>           
        )
    }
}

export default Room;