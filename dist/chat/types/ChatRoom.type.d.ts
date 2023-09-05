export type RoomInfo = {
    roomOwner: string;
    roomName: string;
    maxNumberOfPerson: number;
    currentUser: Array<string>;
    password?: string;
};
export declare class CreateChatRoomDTO {
    roomOwner: string;
    roomName: string;
    maxNumberOfPerson: number;
    currentUser: Array<string>;
    password?: string;
}
export declare class UpdateChatRoomDTO {
    roomOwner: string;
    roomName?: string;
    maxNumberOfPerson: number;
    currentNumberOfPerson: number;
    changeMax?: number;
    password?: string;
}
export type UpdateRoom = {
    roomName?: string;
    changeMax?: number;
    password?: string;
};
