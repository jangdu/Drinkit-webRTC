"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisClient = void 0;
const redis_1 = require("redis");
require("dotenv/config");
class RedisClient {
    constructor() {
        this.client = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    }
    async init() {
        await this.client.connect();
        const roomCnt = await this.client.get('roomCnt');
        const chatRooms = await this.client.json.get('chatRooms');
        const chatRoomsObj = {
            '2': {},
            '3': {},
            '4': {},
        };
        if (!roomCnt && !chatRooms) {
            await this.client.set('roomCnt', '1');
            await this.client.json.set('chatRooms', '$', chatRoomsObj);
        }
        else if (!roomCnt) {
            await this.client.set('roomCnt', '1');
        }
        else if (!chatRooms) {
            await this.client.json.set('chatRooms', '$', chatRoomsObj);
        }
        return;
    }
}
exports.RedisClient = RedisClient;
exports.redis = new RedisClient();
//# sourceMappingURL=redis.js.map