import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

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

    @Field( () => String )
    @CreateDateColumn()
    createdAt: Date;
}