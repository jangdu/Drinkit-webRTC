import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDTO {
  @IsString()
  name: string;

  @IsNumber()
  maxNumberOfPerson: number; // Max <=4

  @IsOptional()
  @IsString()
  password?: string;
}
