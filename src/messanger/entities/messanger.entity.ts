export class Chat {
    chat_id: string
    messages?: Message[] 
    constructor(){
        this.chat_id = '',
        this.messages = []
    }
}

export class Message{
    u_id: string
    uname: string
    message: string
}