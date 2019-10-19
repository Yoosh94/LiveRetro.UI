export type StickyNoteProps = {
    id:number,
    // author:string,
    screenX:number,
    screenY:number,
    onDrag(event:React.DragEvent<HTMLDivElement>,id:number)
};

export type StickyNoteState = {
};