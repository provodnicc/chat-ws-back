import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class User {
    @PrimaryColumn()
    u_id: number

    @ManyToMany(()=>Chat, (chat)=>chat.users)
    @JoinTable()
    chats: Chat[]

}
