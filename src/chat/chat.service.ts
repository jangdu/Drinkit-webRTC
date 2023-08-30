import { redis } from './../redis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateChatRoomDTO } from './DTO/UpdateChatRoom.DTO';
import { CreateChatRoomDTO } from './types/ChatRoom.type';

@Injectable()
export class ChatService {
  private readonly redis = redis.client;

  async getChatRooms(max?: string) {
    if (max) return await this.redis.json.get('chatRooms', { path: `.${max}` });
    return await this.redis.json.get('chatRooms');
  }

  async createChatRoom(data: CreateChatRoomDTO) {
    try {
      const result = await this.createRoomOnRedis(data);
      return result;
    } catch (e) {
      throw new BadRequestException('fail to create room');
    }
  }

  async updateChatRoom(data: UpdateChatRoomDTO, user: object) {
    return;
  }

  async closeChatRoom(user: object) {
    return;
  }

  async createRoomOnRedis(data: CreateChatRoomDTO): Promise<boolean> {
    try {
      await this.redis.json.arrAppend(
        'chatRooms',
        `.${data.maxNumberOfPerson}`,
        JSON.stringify(data),
      );

      await this.redis.incr('roomCnt');
      return true;
    } catch (e) {
      return false;
    }
  }
}
