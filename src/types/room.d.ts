import { Note } from "./app"

export type RoomProps = {
    roomCode: string,
    handleNoteDropped(roomCode:string,note:Note),
    createNote(),
    notes : Note[],
    participant:string
};

export type RoomState = {
    // notes : Note[]
};