export class Chat {
    chat_id: string
    users: User[] 
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

export class User{
    id: number
    uname: string
}