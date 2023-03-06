import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JoinRoom, RoomMessage, Rooms, SendMessage } from './interfaces';

@WebSocketGateway(8000, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  private users: Map<string, object> = new Map();
  private rooms: Rooms[] = [];
  private roomsMessages: RoomMessage[] = [];
  private logger = new Logger('ChatGateway');

  async handleConnection(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    this.users.set(user.id, { socketId: socket.id, name: `${user.name}` });
    const onlineUsers = Array.from(this.users, (entry) => {
      return { userId: entry[0], data: entry[1] };
    });
    console.log('------>onlineUsers', onlineUsers);
    this.server.sockets.emit('onlineUsers', { users: onlineUsers });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() payload: JoinRoom) {
    console.log('chat user click payload to backend', payload);
    const { roomName, userId, senderSocketId, receiverSocketId, userName } = payload;
    const alreadyHaveRoom = this.checkRoomAlreadyExists(roomName);
    if (alreadyHaveRoom) {
      console.log('your room exists');
      const index = this.rooms.findIndex((element) => element.roomName === roomName);
      this.server.to(senderSocketId).emit('groupChat', { roomName: roomName, messages: this.rooms[index].meaages });
    } else {
      const roomArr = roomName.split('&');
      const roomNewName = `${roomArr[1]}&${roomArr[0]}`;

      if (this.checkRoomAlreadyExists(roomNewName)) {
        console.log('here room exits for 2nd');
        const index = this.rooms.findIndex((element) => element.roomName === roomNewName);
        if (this.rooms[index].users.length < 2) {
          this.rooms[index].users.push({ userId: userId, userName: userName, socketId: senderSocketId });
          this.server.to(senderSocketId).emit('groupChat', { roomName: roomNewName, messages: this.rooms[index].meaages });
        } else {
          console.log('you are already in room');
          this.server.to(senderSocketId).emit('groupChat', { roomName: roomNewName, messages: this.rooms[index].meaages });
        }
      } else {
        console.log('created new room');
        this.server.in(senderSocketId).socketsJoin(roomName);
        this.server.in(receiverSocketId).socketsJoin(roomName);
        this.rooms.push({ roomName: roomName, users: [{ userId: userId, userName: userName, socketId: senderSocketId }], meaages: [] });
        const index = this.rooms.findIndex((element) => element.roomName === roomName);
        this.server.to(senderSocketId).emit('groupChat', { roomName: roomName, messages: this.rooms[index].meaages });
      }
    }
    console.log('rooms', this.rooms);
  }

  @SubscribeMessage('sendMessage')
  async listenForMessages(@MessageBody() payload: SendMessage) {
    console.log('----send msg payload', payload);
    if (this.checkRoomAlreadyExists(payload.roomName)) {
      //
      const index = this.rooms.findIndex((element) => element.roomName === payload.roomName);
      this.rooms[index].meaages.push({
        message: payload.message,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        time: payload.timeSent,
      });

      this.server.to(payload.roomName).emit('chat', { roomName: payload.roomName, messages: this.rooms[index].meaages });
    } else {
      const roomArr = payload.roomName.split('&');
      const newRoomName = `${roomArr[1]}&${roomArr[0]}`;
      const index = this.rooms.findIndex((element) => element.roomName === newRoomName);
      this.rooms[index].meaages.push({
        message: payload.message,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        time: payload.timeSent,
      });
      this.server.to(newRoomName).emit('chat', { roomName: newRoomName, messages: this.rooms[index].meaages });
    }
    console.log('rooms', this.rooms);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    console.log(`user ${user.name} is disconnected`);
  }

  checkRoomAlreadyExists(name: string) {
    const roomsArray = this.rooms;
    const existedRoom = roomsArray.filter((element) => element.roomName === name);
    return !!existedRoom?.length;
  }
}
