export type AppState =  {
    roomJoined:boolean,
    roomCode:string,
    isAdmin:boolean,
    notes: Note[]
};

export type AppProps ={};

export type Note = {
    id : number,
    positionX:number,
    positionY:number,
};