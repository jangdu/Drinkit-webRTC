import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export type RoomInfo = {
  roomOwner: string;
  name: string;
  maxNumberOfPerson: number;
  currentUser: Array<string>;
  password?: string;
};

export class CreateChatRoomDTO {
  @IsString()
  roomId?: string;

  @IsString()
  roomOwner: string;

  @IsString()
  name: string;

  @IsNumber()
  maxNumberOfPerson: number;

  @IsArray()
  currentUser: Array<string>; // currentNumberOfPerson: number;

  @IsOptional()
  @IsString()
  password?: string;
}

export class UpdateChatRoomDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  maxNumberOfPerson?: number;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNumber()
  currentNumberOfPerson: number;
}
