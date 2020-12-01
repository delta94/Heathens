import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from './User';

@ObjectType()
@Entity()
export class ChannelEntity extends BaseEntity
{
    @Field( () => Number )
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( () => String )
    @Column( { unique: true } )
    name!: string;

    @Column( () => String )
    description!: string;

    @OneToMany( () => UserEntity, user => user.channel, { nullable: true } )
    @Field( () => [ UserEntity ] )
    users: UserEntity[];

    @Field( () => String )
    @CreateDateColumn()
    createdAt: Date;
}