import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CreateMessangerDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { Message, Chat } from './entities/messanger.entity';

@Injectable()
export class MessangerService {
  messanger: Chat[] = []
  create(createMessangerDto: CreateMessangerDto, socket: Socket) {
      console.log('\n')
      let currentChatId

    const chat = this.messanger.filter((chat: Chat, index: number)=>{
      console.log(chat, (chat.chat_id == createMessangerDto.chat_id))
      currentChatId = index
      return chat.chat_id == createMessangerDto.chat_id
    })

    if(chat.length){
      console.log('currentChat ', currentChatId)
      let message = new Message()
      message.u_id = socket.id
      message.message = createMessangerDto.message
        
      this.messanger[currentChatId].messages.push(message)
      this.messanger.map((chat: any)=>{
        console.log('messanger', chat)
      })
      console.log('\n')
      return this.messanger[currentChatId].messages
    }

    let messanger: Chat = new Chat()
    messanger.chat_id = createMessangerDto.chat_id

    let message = new Message()
    message.u_id = socket.id
    message.message = createMessangerDto.message

    messanger.messages.push(message)

    this.messanger.push(messanger)
    
    this.messanger.map((chat: any)=>{
      console.log('messanger', chat)
    })
    console.log('\n')

    return messanger.messages
  }

  findMessage(chat_id: string) {
    const chat = this.messanger.filter((chat: Chat, index: number)=>{
      return chat.chat_id == chat_id
    })

    return chat[0].messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} messanger`;
  }

  update(id: number, updateMessangerDto: UpdateMessangerDto) {
    return `This action updates a #${id} messanger`;
  }

  remove(id: number) {
    return `This action removes a #${id} messanger`;
  }
}
