import { Note } from "./app"

export type RoomProps = {
    roomCode: string,
    handleNewNote(roomCode:string,note:Note),
    createNote(),
    notes : Note[],
    participant:string
};

export type RoomState = {
    notes : Note[]
};