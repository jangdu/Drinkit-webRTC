import { CreateChatRoomDTO, UpdateChatRoomDTO } from './types/ChatRoom.type';
export declare class ChatService {
    private readonly redis;
    getChatRooms(max?: string): Promise<string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | (string | number | boolean | Date | any | {
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
    getOneChatRoomByClientId(clientId: string): Promise<any>;
    createChatRoom(data: CreateChatRoomDTO): Promise<boolean>;
    updateChatRoom(dto: UpdateChatRoomDTO, roomId: string): Promise<void>;
    closeChatRoom(clientId: string): Promise<boolean>;
    createRoomOnRedis(data: CreateChatRoomDTO): Promise<boolean>;
}
