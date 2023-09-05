"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../common/guard/auth.guard");
const user_decorator_1 = require("../common/decorator/user.decorator");
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChatRooms(data, client) {
        if (data)
            return await this.chatService.getChatRooms(data);
        return await this.chatService.getChatRooms();
    }
    async openChatRoom(data, client, user) {
        const roomInfo = {
            roomOwner: client.id,
            roomName: data.roomName,
            maxNumberOfPerson: data.maxNumberOfPerson,
            currentUser: [user.nickname],
        };
        if (data.password)
            roomInfo.password = data.password;
        const createResult = await this.chatService.createChatRoom(roomInfo);
        if (!createResult)
            return {
                message: 'fail to create room. Please try again few minutes later',
            };
        client.join(data.roomName);
        client.emit('welcome', `${data.nickname}님이 입장하셨습니다.`);
    }
    async updateChatRoom(data, client) {
        if (data[0].roomOwner !== client.id)
            throw new common_1.BadRequestException('Only can change information by room owner');
        await this.chatService.updateChatRoom(data[0], data[1]);
        return;
    }
    async closeChatRoom(data, client) {
        const roomName = Array.from(client.rooms)[1];
        client.in(roomName).disconnectSockets();
        client.disconnect(true);
        await this.chatService.closeChatRoom(client.id);
    }
    async outChatRoom(client) {
        const roomName = Array.from(client.rooms)[1];
        client.leave(roomName);
    }
    broadcastRoom(data, client, user) {
        const roomName = Array.from(client.rooms)[1];
        client.to(roomName).emit('broadcastMessage', `${user.nickname}: ${data}`);
        return data;
    }
    connectMediaStream(data, client) {
        const roomName = Array.from(client.rooms)[1];
        client.to(roomName).emit('candidateReciver', data);
        client.to(data.candidateReceiveID).emit('getCandidate', {
            candidate: data.candidate,
            candidateSendID: data.candidateSendID,
        });
    }
    async joinChatRoom(data, client, user) {
        const roomName = data.roomId;
        client.join(roomName);
        client.emit('joinedRoom', `"${user.nickname}"님, "${roomName}" 방에 입장했습니다.`);
        client
            .to(roomName)
            .emit('userJoined', `"${user.nickname}"님, "${roomName}" 방에 입장했습니다.`);
    }
    async shared(data, client, user) {
        console.log(data, user.nickname);
        client.to(Array.from(client.rooms)[1]).emit('sharedId', data);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('getRooms'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getChatRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('drinkitRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "openChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "updateChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "closeChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('outRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "outChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "broadcastRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('candidate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "connectMediaStream", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('shareId'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "shared", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtGuard),
    (0, websockets_1.WebSocketGateway)(8000, {
        namespace: 'chat',
        cookie: true,
        cors: {
            origin: '*',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map