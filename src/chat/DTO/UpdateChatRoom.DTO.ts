import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
