export type StickyNoteProps = {
    id:number,
    author:string,
    screenX:number,
    screenY:number,
    onDrag(event:React.DragEvent<HTMLDivElement>,id:number,author:string)
};

export type StickyNoteState = {
};