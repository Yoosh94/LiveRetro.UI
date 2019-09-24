export type AppState = {
    roomJoined:boolean,
    roomCode:string,
    isAdmin:boolean,
    notes: Note[]
};

type Note = {
    id : number,
    positionX:number,
    positionY:number,
};