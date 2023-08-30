import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export type RoomInfo = {
  roomId: string;
  roomOwner: string;
  name: string;
  maxNumberOfPerson: number;
  currentUser: Array<string>;
  password?: string;
};

export class CreateChatRoomDTO {
  @IsString()
  roomId: string;

  @IsString()
  roomOwner: string;

  @IsString()
  name: string;

  @IsNumber()
  maxNumberOfPerson: number;

  @IsArray()
  currentUser: Array<string>;

  @IsOptional()
  @IsString()
  password?: string;
}
