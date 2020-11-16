import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from '../entities/User';

@Resolver()
export class AuthResolver
{
    @Query( () => [ UserEntity ] )
    getUsers (): Promise<UserEntity[]>
    {
        return UserEntity.find();
    }

    @Query( () => UserEntity )
    getSingleUser (
        @Arg( 'id' )
        id: number
    ): Promise<UserEntity | undefined>
    {
        return UserEntity.findOne( id );
    }

    @Mutation( () => UserEntity )
    registerUser (
        @Arg( 'username' )
        username: string,
        @Arg( 'name' )
        name: string,
        @Arg( 'email' )
        email: string,
        @Arg( 'password' )
        password: string,
    ): UserEntity
    {
        return UserEntity.create( { name, email, password, username } );
    }

    @Mutation( () => Boolean )
    deleteUser (
        @Arg( 'id' )
        id: number
    ): boolean
    {
        UserEntity.delete( id );
        return true;
    }
}