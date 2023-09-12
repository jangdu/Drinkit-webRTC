import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JoinMessage, UpdateMessage } from './types/Socket.message';
import { BadRequestException, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard/auth.guard';
import { ChatUser } from './types/ChatUser.type';
import { User } from 'src/common/decorator/user.decorator';
import { ChatService } from './chat.service';
import { RoomInfo } from './types/ChatRoom.type';

@UseGuards(JwtGuard) // 메인서버와 아직 미연동 관계로 주석처리
@WebSocketGateway(8000, {
  namespace: 'chat',
  cookie: true,
  cors: {
    origin: ['http://localhost:8000', 'http://localhost:3200'],
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('disconnect')
  async checkPing(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    return { message: 'disconnected from websocket server' };
  }

  // Read room list by maxNumberOfPerson or null.
  @SubscribeMessage('getRooms')
  async getChatRooms(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (data) return await this.chatService.getChatRooms(data);
    return await this.chatService.getChatRooms();
  }

  // Create room
  @SubscribeMessage('drinkitRoom')
  async openChatRoom(
    @MessageBody() data: JoinMessage,
    @ConnectedSocket() client: Socket,
    @User() user: ChatUser,
  ) {
    const roomInfo: RoomInfo = {
      roomOwner: client.id,
      roomName: data.roomName,
      maxNumberOfPerson: data.maxNumberOfPerson,
      currentUser: [user.nickname],
    };
    if (data.password) roomInfo.password = data.password;

    const createResult = await this.chatService.createChatRoom(roomInfo);

    if (!createResult)
      return {
        message: 'fail to create room. Please try again few minutes later',
      };

    client.join(data.roomName); // join 실행시 client.rooms = [ client.id, data.roomName ]

    // Redis createRoom
    client.emit('welcome', `${data.nickname}님이 입장하셨습니다.`);

    return { roomId: createResult, ...roomInfo };
  }

  // Update room
  @SubscribeMessage('updateRoom')
  async updateChatRoom(
    @MessageBody() data: UpdateMessage | Array<any>,
    @ConnectedSocket() client: Socket,
  ) {
    if (data[0].roomOwner !== client.id)
      throw new BadRequestException(
        'Only can change information by room owner',
      );

    await this.chatService.updateChatRoom(data[0], data[1]);
    return;
  }

  // 방 삭제 ( 연결된 모든 유저 연결 해지 및 방 삭제 )
  @SubscribeMessage('deleteRoom')
  async closeChatRoom(
    @MessageBody() data: UpdateMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = Array.from(client.rooms)[1];

    client.in(roomName).disconnectSockets();
    client.disconnect(true);

    await this.chatService.closeChatRoom(client.id);
  }

  // 방 나오기
  @SubscribeMessage('outRoom')
  async outChatRoom(@ConnectedSocket() client: Socket) {
    const roomName = Array.from(client.rooms)[1];
    client.leave(roomName);
  }

  // Send message to people in the room.
  @SubscribeMessage('sendChat')
  broadcastRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
    @User() user,
  ) {
    const roomName = Array.from(client.rooms)[1];

    client.to(roomName).emit('broadcastMessage', `${user.nickname}: ${data}`);

    return data;
  }

  // Create peerConnection
  @SubscribeMessage('candidate')
  connectMediaStream(@Body() data, @ConnectedSocket() client: Socket) {
    const roomName = Array.from(client.rooms)[1];

    client.to(roomName).emit('candidateReciver', data);
    client.to(data.candidateReceiveID).emit('getCandidate', {
      candidate: data.candidate,
      candidateSendID: data.candidateSendID,
    });
  }

  @SubscribeMessage('joinRoom')
  async joinChatRoom(
    @MessageBody() data,
    @ConnectedSocket() client: Socket,
    @User() user: ChatUser,
  ) {
    const roomName = data.roomId;

    client.join(roomName);

    client.emit(
      'joinedRoom',
      `"${user.nickname}"님, "${roomName}" 방에 입장했습니다.`,
    );

    client
      .to(roomName)
      .emit(
        'userJoined',
        `"${user.nickname}"님, "${roomName}" 방에 입장했습니다.`,
      );
  }

  @SubscribeMessage('shareId')
  async shared(
    @MessageBody() data,
    @ConnectedSocket() client: Socket,
    @User() user: ChatUser,
  ) {
    console.log(data, user.nickname);

    client.to(Array.from(client.rooms)[1]).emit('sharedId', data);
  }
}
