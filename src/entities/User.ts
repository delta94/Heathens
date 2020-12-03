import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { ChannelEntity } from "./Channel";
import { MessageEntity } from "./Message";

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity
{
    @Field( () => Number )
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( () => String )
    @Column( { unique: true } )
    username!: string;

    @Field( () => String )
    @Column()
    name!: string;

    @Field( () => String )
    @Column( { unique: true } )
    email!: string;

    @Column()
    password!: string;

    @Column( { default: 'user' } )
    role!: string;

    @OneToOne( () => ChannelEntity )
    @Field( { nullable: true } )
    channel: ChannelEntity;

    @OneToMany( () => MessageEntity, message => message.poster )
    @Field( { nullable: true } )
    messages: MessageEntity[];

    @Field( () => String )
    @CreateDateColumn()
    createdAt: Date;
}