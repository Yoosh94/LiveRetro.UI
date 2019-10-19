import React from 'react';
import StickyNote from './StickyNote';
import { RoomProps, RoomState } from './types/room';

class Room extends React.Component<RoomProps, RoomState> {
    public onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    }

    public onDrop = (event: React.DragEvent<HTMLDivElement>) => {
      const { roomCode, handleNoteDropped } = this.props;
      const id = event.dataTransfer.getData('id');
      const author = event.dataTransfer.getData('author');
      console.log(event.screenX);
      console.log(event.screenY);
      handleNoteDropped(roomCode, {
        author,
        id: Number(id),
        positionX: event.screenX,
        positionY: event.screenY,
      });
    }

    public onDragStart = (event: React.DragEvent<HTMLDivElement>, id: number,author:string) => {
      const { participant } = this.props;
      event.dataTransfer.setData('id', String(id));
      event.dataTransfer.setData('author', author);
    }

    calculateYPosition = (screenY:number):number => {
      let yCoord = screenY - 100;
      if(yCoord < 0 ) return 0;
      return yCoord;
    }

    public render() {
      const { roomCode, createNote, notes } = this.props;
      return (
        <div onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
          <h3>
Room Code :
            {roomCode}
          </h3>
          <button type="button" onClick={createNote}>+</button>
          <div style={{ width: '700px', height: '1000px' }}>
            {notes.map((note) => (
              <StickyNote
                key={`${note.id}${note.author}`}
                author={note.author}
                id={note.id}
                screenX={note.positionX}
                screenY={this.calculateYPosition(note.positionY)}
                onDrag={this.onDragStart}
              />
            ))}
          </div>
        </div>
      );
    }
}

export default Room;
