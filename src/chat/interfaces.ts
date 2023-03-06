export interface User {
  userId: string;
  socketId: string;
  userName: string;
}

export interface Message {
  message: string;
  senderId: string;
  receiverId: string;
  time: string;
}

export interface Rooms {
  roomName: string;
  users: User[];
  meaages: Message[];
}

export interface RoomMessage {
  roomName: string;
  messages: Message[];
}

export interface JoinRoom {
  roomName: string;
  userId: string;
  senderSocketId: string;
  receiverSocketId: string;
  userName: string;
}

export interface SendMessage {
  roomName: string;
  senderId: string;
  receiverId: string;
  message: string;
  timeSent: string;
}
