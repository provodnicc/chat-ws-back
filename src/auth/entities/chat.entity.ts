import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./auth.entity";

@Entity()
export class Chat{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    alt_name: string
    
    @Column()
    userTo: string

    @ManyToMany(()=>User, (user)=>user.chats)
    users: User[]
}
