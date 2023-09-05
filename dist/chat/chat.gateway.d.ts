import { Socket } from 'socket.io';
import { JoinMessage, UpdateMessage } from './types/Socket.message';
import { ChatUser } from './types/ChatUser.type';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChatRooms(data: string, client: Socket): Promise<string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | any | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    })[] | {
        [x: string]: string | number | boolean | Date | any | any;
        [x: number]: string | number | boolean | Date | any | any;
    }>;
    openChatRoom(data: JoinMessage, client: Socket, user: ChatUser): Promise<{
        message: string;
    }>;
    updateChatRoom(data: UpdateMessage | Array<any>, client: Socket): Promise<void>;
    closeChatRoom(data: UpdateMessage, client: Socket): Promise<void>;
    outChatRoom(client: Socket): Promise<void>;
    broadcastRoom(data: string, client: Socket, user: any): string;
    connectMediaStream(data: any, client: Socket): void;
    joinChatRoom(data: any, client: Socket, user: ChatUser): Promise<void>;
    shared(data: any, client: Socket, user: ChatUser): Promise<void>;
}
