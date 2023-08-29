import { redis } from './../redis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatRoomDTO } from './DTO/CreateChatRoom.DTO';
import { UpdateChatRoomDTO } from './DTO/UpdateChatRoom.DTO';

@Injectable()
export class ChatService {
  private readonly redis = redis.client;

  async getChatRooms(max?: string) {
    if (max) return await this.redis.json.get('chatRooms', { path: `.${max}` });
    return await this.redis.json.get('chatRooms');
  }
  /*
  chatService 에 존재할 이유가 있는가?
  redis 자체를 gateway에 DI 하면 해결 되지 않나?
  */
  async createChatRoom(data: CreateChatRoomDTO, user: object) {
    try {
      await this.createRoomOnRedis(
        data.name,
        data.maxNumberOfPerson,
        user.nickname,
        data.password,
      );
    } catch (e) {
      throw new BadRequestException('fail to create room');
    }
    return true;
  }

  async updateChatRoom(data: UpdateChatRoomDTO, user: object) {
    return;
  }

  async closeChatRoom(user: object) {
    return;
  }

  /*
  방의 요소
  roomId, roomOwner, name, password?, maxNumberOfPerson, currentUser
  */
  async createRoomOnRedis(
    name: string,
    max: number,
    nickname: string,
    password?: string,
  ) {
    const roomCnt = await this.redis.get('roomCnt');

    if (password) {
      await this.redis.json.arrAppend('chatRooms', `.${max}`, {
        roomId: roomCnt,
        // roomOwner: nickname,
        password,
        currentUser: 1,
      });
    } else {
      await this.redis.json.arrAppend('chatRooms', `.${max}`, {
        roomId: roomCnt,
        name,
        currentUser: 1,
      });
    }
    await this.redis.incr('roomCnt');
    return;
  }
}
