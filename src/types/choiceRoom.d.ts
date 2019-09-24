export type ChoiceRoomProps = {
    handleCreateRoom(adminName : string),
    handleJoinRoom(roomName:string,participantName:string)
}

export type ChoiceRoomState = {
    roomName:string,
    displayName:string
}