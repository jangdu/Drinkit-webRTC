import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import 'dotenv/config';

export class RedisClient {
  readonly client = createClient({ url: process.env.REDIS_URL });

  async init() {
    await this.client.connect();
    return;
  }
}

export const redis = new RedisClient();
