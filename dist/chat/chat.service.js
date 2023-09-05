"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const redis_1 = require("./../redis");
const common_1 = require("@nestjs/common");
let ChatService = class ChatService {
    constructor() {
        this.redis = redis_1.redis.client;
    }
    async getChatRooms(max) {
        if (max)
            return await this.redis.json.get('chatRooms', { path: `.${max}` });
        return await this.redis.json.get('chatRooms');
    }
    async getOneChatRoomByClientId(clientId) {
        const data = await this.redis.json.get('chatRooms', {
            path: `$.*[?(@.roomOwner=='${clientId}')]`,
        });
        const room = JSON.parse(JSON.stringify(data));
        const result = room.length !== 0 ? room[0] : null;
        return result;
    }
    async createChatRoom(data) {
        try {
            const result = await this.createRoomOnRedis(data);
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException('fail to create room');
        }
    }
    async updateChatRoom(dto, roomId) {
        const datas = {};
        dto.changeMax === undefined ? null : (datas.changeMax = dto.changeMax);
        dto.roomName === undefined ? null : (datas.roomName = dto.roomName);
        dto.password === undefined ? null : (datas.password = dto.password);
        if (Object.keys(datas).length === 0)
            throw new common_1.BadRequestException('There is no data to update.');
        const room = (await this.redis.json.get('chatRooms', {
            path: `$.${dto.maxNumberOfPerson}.${roomId}`,
        }))[0];
        const includeChangeMax = Object.keys(datas).includes('changeMax');
        if (includeChangeMax) {
            if (dto.currentNumberOfPerson > datas.changeMax &&
                datas.changeMax > 4 &&
                datas.changeMax < 2)
                throw new common_1.BadRequestException('Because of wrong number of Max, it is not possible to change');
            Object.entries(datas).forEach((data) => {
                room[data[0]] = data[1];
            });
            await this.redis.json.del('chatRooms', `$.${dto.maxNumberOfPerson}.${roomId}`);
            await this.redis.json.set('chatRooms', `$.${datas.changeMax}.${roomId}`, room);
        }
        else {
            Object.entries(datas).forEach((data) => {
                room[data[0]] = data[1];
            });
            await this.redis.json.set('chatRooms', `$.${dto.maxNumberOfPerson}.${roomId}`, room);
        }
        return;
    }
    async closeChatRoom(clientId) {
        try {
            await this.redis.json.del(`chatRooms','$.*[?(@.roomOwner==${clientId})]`);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async createRoomOnRedis(data) {
        try {
            const roomCnt = await this.redis.get('roomCnt');
            await this.redis.json.set('chatRooms', `.${data.maxNumberOfPerson}.${roomCnt}`, JSON.stringify(data));
            await this.redis.incr('roomCnt');
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=chat.service.js.map