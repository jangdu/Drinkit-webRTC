export type JoinMessage = {
    nickname: string;
    roomName: string;
    maxNumberOfPerson: number;
    password?: string;
};
export type UpdateMessage = {
    roomOwner: string;
    maxNumberOfPerson: number;
    currentNumberOfPerson: number;
    roomName?: string;
    changeMax?: number;
    password?: string;
};
