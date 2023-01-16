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

  async handleConnection(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    this.users.set(user.id, { socketId: socket.id, name: `${user.name}` });

    if (this.users.has(user.id)) {
      this.users.delete(user.id);
    }

    const onlineUsers = Array.from(this.users, (entry) => {
      return { userId: entry[0], data: entry[1] };
    });
    this.server.sockets.emit('onlineUsers', { users: onlineUsers });
    console.log(`user ${user.name} is connectd`);
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    const myMap: any = this.users;
    if (myMap.has(user?.id)) {
      myMap.delete(user?.id);
    }
    const onlineUsers = Array.from(myMap, (entry) => {
      return { userId: entry[0], data: entry[1] };
    });
    this.server.sockets.emit('onlineUsers', { users: onlineUsers });
    console.log(`user ${user.name} is disconnected`);
  }

  @SubscribeMessage('private')
  async handlePrivateMessage(socket: Socket, message: { to: string; content: string }) {
    const user = await this.chatService.getUserFromSocket(socket);
    const senderId = user.userId;
    const users: object | undefined | any = this.users.get(message.to);
    const { socketId } = users;
    if (!!socketId) {
      this.server.to(socketId).emit('private', { message: message.content, senderId: senderId });
    }
  }

  @SubscribeMessage('sendMessage')
  async listenForMessages(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const author = await this.chatService.getUserFromSocket(socket);
    this.server.sockets.emit('receiveMessage', { data, author });
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string): void {
    socket.join(room);
    socket.emit('joinRoom', room);
  }
}
