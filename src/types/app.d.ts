export type AppState =  {
    roomJoined:boolean,
    roomCode:string,
    isAdmin:boolean,
    notes: Note[],
    participant:string
};

export type AppProps ={};

export type Note = {
    id : number,
    author:string,
    positionX:number,
    positionY:number,
};