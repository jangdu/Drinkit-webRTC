export type JoinMessage = {
  nickname: string;
  roomName: string;
  maxNumberOfPerson: number; // Max <=4
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
