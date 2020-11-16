import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity
{
    @Field( () => Number )
    @PrimaryColumn()
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