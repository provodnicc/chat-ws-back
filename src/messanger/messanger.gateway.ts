import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer, 
  ConnectedSocket, 
  OnGatewayDisconnect, 
  OnGatewayConnection, 
  OnGatewayInit 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io' 

import { MessangerService } from './messanger.service';
import { CreateMessangerDto } from './dto/create-messanger.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { ATGuard } from 'src/auth/guards/AT.guard';

@WebSocketGateway({cors: '*'})
export class MessangerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly messangerService: MessangerService) {}
  logger: Logger = new Logger(MessangerGateway.name)
  
  users: string[] = []

  @WebSocketServer()
  server: Server

  @SubscribeMessage('setMessage')
  create(
    @ConnectedSocket()
    socket: Socket,

    @MessageBody()
    data: string,
  ) {
    const createMessangerDto: CreateMessangerDto = JSON.parse(data)

    const res = this.messangerService.create(createMessangerDto, socket)
    console.log('message: ', createMessangerDto)
    console.log('-------------------------------------------------')
    this.server.to(String(createMessangerDto.chat_id)).emit('messanger', res)
  }

  @SubscribeMessage('leave')
  leave(
    @ConnectedSocket()
    socket: Socket,

    @MessageBody() 
    data: any,
  ){
    data = JSON.parse(data)
    socket.leave(String(data.room_id))
    console.log('leave', data.room_id)
    this.server.emit('leave', 'user leave from room: ' + data.room_id)

  }

  // @UseGuards(ATGuard)
  @SubscribeMessage('connection')
  conn(
    @ConnectedSocket()
    socket: Socket,

    @MessageBody() 
    data: any,
  ){
    data = JSON.parse(data)
    console.log('conn', data.room_id)
    socket.join(String(data.room_id))
    console.log(socket.rooms)
    this.server.to(String(data.room_id)).emit('connection', 'user connected to room: ' + data.room_id)
    const chat = this.messangerService.findMessage(data.room_id)
    this.server.to(String(data.room_id)).emit('messanger', chat)
  }

  afterInit(server: any) {
    this.logger.verbose('socket.io initialized')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('connected ' + client.id)
  }

  handleDisconnect(client: Socket) {
    this.logger.warn('disconnected ' + client.id, client.rooms)
  }

}
