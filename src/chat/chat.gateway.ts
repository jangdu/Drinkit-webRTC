import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { redis } from 'src/redis';
import { JoinMessage } from './types/Socket.message';

@WebSocketGateway(8000, {
  namespace: 'chat',
  cookie: true,
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  protected redis = redis.client;

  @SubscribeMessage('drinkitRoom')
  joinRoom(
    @MessageBody() data: JoinMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { nickname, roomName } = data;
    client.join(roomName);

    client.emit('welcome', `${nickname}님이 입장하셨습니다.`);
  }

  @SubscribeMessage('sendChat')
  broadcastRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = Array.from(client.rooms)[1];

    client.to(roomName).emit('broadcastMessage', data);
  }

  @SubscribeMessage('candidate')
  connectMediaStream(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = Array.from(client.rooms)[1];

    client.to(roomName).emit('candidateReciver', data);
  }
}

// DAU ?
// 원채널!

// @WebSocketGateway(8002, {
//   namespace: 'chat-two',
//   cookie: true,
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// })
// export class ChatGatewayForTwo extends ChatGateway {}

// @WebSocketGateway(8003, {
//   namespace: 'chat-three',
//   cookie: true,
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// })
// export class ChatGatewayForThree extends ChatGateway {}

// @WebSocketGateway(8004, {
//   namespace: 'chat-four',
//   cookie: true,
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// })
// export class ChatGatewayForFour extends ChatGateway {}
