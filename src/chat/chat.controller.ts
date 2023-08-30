import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomDTO } from './DTO/CreateChatRoom.DTO';
import { UpdateChatRoomDTO } from './DTO/UpdateChatRoom.DTO';
import { JwtGuard } from 'src/common/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';

@Controller('chat')
// @UseGuards(JwtGuard) // 메인 어플리케이션과 연동 안된 관계로 로그인 쿠키 존재가 없어 주석 처리
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Patch()
  async updateRoom(@Body() body: UpdateChatRoomDTO, @User() user: object) {
    return;
  }

  @Delete()
  async closeRoom(@User() user: object) {
    return;
  }
}
