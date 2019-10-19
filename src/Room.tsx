import React from 'react';
import { RoomProps, RoomState } from './types/room';
import StickyNote from './StickyNote';

class Room extends React.Component<RoomProps, RoomState> {
    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    }

    onDrop =(event:React.DragEvent<HTMLDivElement>) => {
      const { roomCode, handleNoteDropped } = this.props;
      const id = event.dataTransfer.getData('id');
      const author = event.dataTransfer.getData('author');
      handleNoteDropped(roomCode, {
        id: Number(id),
        positionX: event.screenX,
        positionY: event.screenY,
        author,
      });
    };

    onDragStart = (event:React.DragEvent<HTMLDivElement>, id:number) => {
      const { participant } = this.props;
      event.dataTransfer.setData('id', String(id));
      event.dataTransfer.setData('author', participant);
    };

    render() {
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
                id={note.id}
                screenX={note.positionX}
                screenY={note.positionY}
                onDrag={this.onDragStart}
              />
            ))}
          </div>
        </div>
      );
    }
}

export default Room;
