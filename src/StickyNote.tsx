import React from 'react'
import { StickyNoteProps, StickyNoteState } from './types/stickyNote';

class StickyNote extends React.Component<StickyNoteProps,StickyNoteState>{
    constructor(props:StickyNoteProps){
        super(props);
        this.state = {
            screenX : 0,
            screenY : 0
        };
    }

    onDragStart = (event:React.DragEvent<HTMLDivElement>,id:number) =>{
        console.log("dragId" + id);
        event.dataTransfer.setData("id",String(id));
        event.dataTransfer.setData("author",this.props.author);
    }

    render(){
        return(
                <div style={{width:'100px',height:'100px',background:'#f00',left:this.state.screenX}}
                 draggable
                 onDragStart={(e) => this.onDragStart(e,this.props.id)}>
            </div>
        )
    }
}

export default StickyNote;