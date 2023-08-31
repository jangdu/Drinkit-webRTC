export type JoinMessage = {
  nickname: string;
  roomName: string;
  maxNumberOfPerson: number; // Max <=4
  password?: string;
};

export type UpdateMessage = {
  roomId: string;
  roomOwner: string;
  roomName: string;
  maxNumberOfPerson: number;
  password?: string;
  currentNumberOfPerson: number;
};
