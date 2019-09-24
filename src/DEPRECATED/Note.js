import React, { Component } from 'react';
export default class Note extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    onDragStart = (event,id) =>{
        console.log("dragId" + id);
        event.dataTransfer.setData("id",id);
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