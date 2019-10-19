import React from 'react';
import { StickyNoteProps } from './types/stickyNote';

const StickyNote = ({
  id, screenX, screenY, onDrag,
}:StickyNoteProps) => (
  <div
    style={{
      width: '100px', height: '100px', background: '#f00', left: screenX, top: screenY, position: 'absolute',
    }}
    draggable
    onDragStart={(e) => onDrag(e, id)}
  />
);
export default StickyNote;
