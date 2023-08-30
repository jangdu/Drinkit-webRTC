export type JoinMessage = {
  nickname: string;
  roomName: string;
  maxNumberOfPerson: number; // Max <=4
  password?: string;
};
