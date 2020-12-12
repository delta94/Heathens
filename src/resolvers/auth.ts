import { MyContext } from "../utils/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserEntity } from '../entities/User';
import { ErrorResponse } from "../utils/ErrorResponse";
import argon from 'argon2';
import { isAuthenticated } from "../middlewares/protect";
import { ChannelEntity } from "../entities/Channel";
import { getConnection } from "typeorm";

@Resolver()
export class AuthResolver
{
    // @UseMiddleware( isAuthenticated )
    @Query( () => [ UserEntity ] )
    getUsers (): Promise<UserEntity[]>
    {
        return UserEntity.find();
    }

    @UseMiddleware( isAuthenticated )
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
            throw new ErrorResponse( 'Not Authenticated', 401 );
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
            throw new ErrorResponse( 'Not Authenticated', 401 );
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

    @UseMiddleware( isAuthenticated )
    @Query( () => UserEntity )
    async getMe (
        @Ctx()
        { session }: MyContext
    ): Promise<UserEntity>
    {
        const user = await UserEntity.findOne( session.user );
        return user!;
    }

    @UseMiddleware( isAuthenticated )
    @Mutation( () => Boolean )
    async logoutUser (
        @Ctx()
        { session }: MyContext
    ): Promise<boolean>
    {
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

    @UseMiddleware( isAuthenticated )
    @Mutation( () => Boolean )
    async joinChannel (
        @Ctx()
        { session }: MyContext,
        @Arg( 'channelId' )
        channelId: string
    ): Promise<boolean>
    {
        const channel = await ChannelEntity.findOne( channelId );
        if ( !channel )
        {
            throw new ErrorResponse( 'Channel does not exists', 404 );
        }
        await getConnection().transaction( async tn =>
        {
            await tn.query( `
                UPDATE channel_entity
                SET "userIds" = "userIds" || ${ session.user }
                WHERE id = ${ channelId }
            `);
        } );
        const updatedChannel = await ChannelEntity.findOne( channelId );
        console.log( 'updatedChannel', updatedChannel );
        return true;
    }

    @Mutation( () => Boolean )
    async deleteUser (
        @Ctx()
        { session }: MyContext
    ): Promise<boolean>
    {

        const user = await UserEntity.findOne( session.user );

        if ( !user )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        UserEntity.delete( { id: session.user as any } );

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
}