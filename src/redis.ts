import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import 'dotenv/config';

export class RedisClient {
  readonly client = createClient({ url: process.env.REDIS_URL });

  async init() {
    await this.client.connect();
    const roomCnt = await this.client.get('roomCnt');
    const chatRooms = await this.client.json.get('chatRooms');

    const chatRoomsObj = {
      '2': [],
      '3': [],
      '4': [],
    };

    if (!roomCnt && !chatRooms) {
      await this.client.set('roomCnt', '1');
      await this.client.json.set('chatRooms', '$', chatRoomsObj);
    } else if (!roomCnt) {
      await this.client.set('roomCnt', '1');
    } else if (!chatRooms) {
      await this.client.json.set('chatRooms', '$', chatRoomsObj);
    }

    return;
  }
}

export const redis = new RedisClient();
