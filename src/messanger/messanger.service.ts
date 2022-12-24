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

    const [chat, currentChatId] = this.getChat(createMessangerDto.chat_id)

    if(chat){
      console.log('currentChat ', createMessangerDto.chat_id)
      let message = new Message()
      message.u_id = socket.id
      message.uname = createMessangerDto.uname
      message.message = createMessangerDto.message
        
      this.messanger[currentChatId].messages.push(message)
      this.messanger.map((chat: any)=>{
        console.log('messanger', chat)
      })
      console.log('\n')
      let [currChat, index] = this.getChat(createMessangerDto.chat_id)
      return currChat
    }

    let messanger: Chat = new Chat()
    messanger.chat_id = createMessangerDto.chat_id

    let message = new Message()
    message.u_id = socket.id
    message.uname = createMessangerDto.uname
    message.message = createMessangerDto.message

    messanger.messages.push(message)

    this.messanger.push(messanger)
    
    this.messanger.map((chat: any)=>{
      console.log('messanger', chat)
    })
    console.log('\n')

    return messanger
  }

  getChat(chatId: string){
    let currentChatId
    const chat = this.messanger.filter((chat, index: number)=>{
      if (chat.chat_id === chatId){
        currentChatId = index
        return true
      }
    })[0]

    return [chat, currentChatId]
  }


  findMessage(chat_id: string) {
    const chat = this.messanger.filter((chat: Chat, index: number)=>{
      return chat.chat_id == chat_id
    })

    return chat[0];
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
