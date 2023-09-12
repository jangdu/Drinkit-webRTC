import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export type RoomInfo = {
  roomOwner: string;
  roomName: string;
  maxNumberOfPerson: number;
  currentUser: Array<string>;
  password?: string;
};

export class CreateChatRoomDTO {
  @IsString()
  roomOwner: string;

  @IsString()
  roomName: string;

  @IsNumber()
  maxNumberOfPerson: number;

  @IsArray()
  currentUser: Array<string>; // currentNumberOfPerson: number;

  @IsOptional()
  @IsString()
  password?: string;
}

export class UpdateChatRoomDTO {
  @IsString()
  roomOwner: string;

  @IsString()
  roomName?: string;

  @IsNumber()
  maxNumberOfPerson: number;

  @IsNumber()
  currentNumberOfPerson: number;

  @IsOptional()
  @IsNumber()
  changeMax?: number;

  @IsOptional()
  @IsString()
  password?: string;
}

export type UpdateRoom = {
  roomName?: string;
  changeMax?: number;
  password?: string;
};
