import { MyContext } from "../utils/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from '../entities/User';
import { ErrorResponse } from "../utils/ErrorResponse";
import argon from 'argon2';

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
    async registerUser (
        @Arg( 'username' )
        username: string,
        @Arg( 'name' )
        name: string,
        @Arg( 'email' )
        email: string,
        @Arg( 'password' )
        password: string,
        @Ctx()
        { session }: MyContext
    ): Promise<UserEntity>
    {
        if ( session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }

        const hashedPassword = await argon.hash( password );

        const newUser = await UserEntity.create( { name, email, password: hashedPassword, username } ).save();

        session.user = newUser.id;

        return newUser;
    }

    @Mutation( () => UserEntity )
    async loginUser (
        @Arg( 'username' )
        username: string,
        @Arg( 'password' )
        password: string,
        @Ctx()
        { session }: MyContext
    ): Promise<UserEntity>
    {
        if ( session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }

        const user = await UserEntity.findOne( { username } );

        if ( !user )
        {
            throw new ErrorResponse( 'Invalid Credentials', 401 );

        }

        const isValidPassword = await argon.verify( user.password, password );

        if ( !isValidPassword )
        {
            throw new ErrorResponse( 'Invalid Credentials', 401 );
        }

        session.user = user.id;

        return user;
    }

    @Query( () => UserEntity )
    async getMe (
        @Ctx()
        { session }: MyContext
    ): Promise<UserEntity>
    {
        if ( !session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        const user = await UserEntity.findOne( session.user );

        if ( !user )
        {
            throw new ErrorResponse( 'Invalid Credentials', 401 );
        }
        if ( user.id !== session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        return user;
    }

    @Mutation( () => Boolean )
    async logoutUser (
        @Ctx()
        { session }: MyContext
    ): Promise<boolean>
    {
        if ( !session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        const user = await UserEntity.findOne( session.user );
        if ( !user )
        {
            throw new ErrorResponse( 'Invalid Credentials', 401 );
        }
        if ( user.id !== session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        session.destroy( err =>
        {
            if ( err )
            {
                console.log( `Session destruction error:`.red.bold );
                console.error( err );
            }
        } );
        return true;
    }

    @Mutation( () => Boolean )
    async deleteUser (
        @Ctx()
        { session }: MyContext
    ): Promise<boolean>
    {
        if ( !session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        const user = await UserEntity.findOne( session.user );
        if ( !user )
        {
            throw new ErrorResponse( 'Invalid Credentials', 401 );
        }
        if ( user.id !== session.user )
        {
            throw new ErrorResponse( 'Not Auth', 401 );
        }
        session.destroy( err =>
        {
            if ( err )
            {
                console.log( `Session destruction error:`.red.bold );
                console.error( err );
            }
        } );
        UserEntity.delete( { id: user.id } );
        return true;
    }
}