import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { ChannelEntity } from "./Channel";

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

    @OneToOne( () => ChannelEntity, { nullable: true } )
    channel: ChannelEntity;

    @Field( () => String )
    @CreateDateColumn()
    createdAt: Date;
}