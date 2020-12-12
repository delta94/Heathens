import { ErrorResponse } from "../utils/ErrorResponse";
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { ChannelEntity } from '../entities/Channel';
import { isAdmin, isAuthenticated } from "../middlewares/protect";
import { MyContext } from "../utils/types";
import { UserEntity } from "../entities/User";
import { MessageEntity } from "../entities/Message";

@Resolver( ChannelEntity )
export class ChannelResolver
{
    @FieldResolver( () => [ UserEntity ], { nullable: true } )
    users (
        @Root()
        channel: ChannelEntity,
        @Ctx()
        { usersLoader }: MyContext,
    ): Promise<( UserEntity | Error )[]> | null
    {
        if ( !channel.userIds )
        {
            return null;
        }
        return usersLoader.loadMany( channel.userIds );
    }

    @FieldResolver( () => [ MessageEntity ], { nullable: true } )
    messages (
        @Root()
        channel: ChannelEntity,
        @Ctx()
        { messagesLoader }: MyContext,
    ): Promise<( MessageEntity | Error )[]> | null
    {
        if ( !channel.messageIds )
        {
            return null;
        }
        return messagesLoader.loadMany( channel.messageIds );
    }

    @UseMiddleware( isAuthenticated )
    @Query( () => [ ChannelEntity ] )
    async getChannels (): Promise<ChannelEntity[]>
    {
        const channels = await ChannelEntity.find();
        return channels;
    }

    @UseMiddleware( isAuthenticated )
    @Query( () => ChannelEntity )
    async getSingleChannel (
        @Arg( 'id' )
        id: number
    ): Promise<ChannelEntity | undefined>
    {
        const channel = await ChannelEntity.findOne( id );

        console.log( channel );

        if ( !channel )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        return channel;
    }

    // @UseMiddleware( isAuthenticated )
    // @Query( () => [ UserEntity ], { nullable: true } )
    // async getUsersInChannel (
    //     @Arg( 'id' )
    //     id: number,
    //     @Ctx()
    //     { channelUsersLoader }: MyContext
    // ): Promise<( UserEntity | Error )[] | null>
    // {
    //     const channel = await ChannelEntity.findOne( id );

    //     if ( !channel )
    //     {
    //         throw new ErrorResponse( 'Resource does not exits', 404 );
    //     }

    //     if ( !channel.userIds )
    //     {
    //         return null;
    //     }

    //     const users = await channelUsersLoader.loadMany( channel.userIds );

    //     return users;
    // }

    // @UseMiddleware( isAuthenticated )
    // @Query( () => [ MessageEntity ], { nullable: true } )
    // async getMessagesInChannel (
    //     @Arg( 'id' )
    //     id: number,
    //     @Ctx()
    //     { channelMessagesLoader }: MyContext
    // ): Promise<( MessageEntity | Error )[] | null>
    // {
    //     const channel = await ChannelEntity.findOne( id );

    //     if ( !channel )
    //     {
    //         throw new ErrorResponse( 'Resource does not exits', 404 );
    //     }

    //     if ( !channel.messageIds )
    //     {
    //         return null;
    //     }

    //     const messages = await channelMessagesLoader.loadMany( channel.messageIds );

    //     return messages;
    // }

    @UseMiddleware( isAuthenticated, isAdmin )
    @Mutation( () => ChannelEntity )
    async addChannel (
        @Arg( 'name' )
        name: string,
        @Arg( 'desc' )
        desc: string,
    ): Promise<ChannelEntity>
    {
        const newChannel = await ChannelEntity.create( { name, desc } ).save();
        return newChannel;
    }

    @UseMiddleware( isAuthenticated, isAdmin )
    @Mutation( () => Boolean )
    async deleteChannel (
        @Arg( 'id' )
        id: number
    ): Promise<boolean>
    {
        const channel = await ChannelEntity.findOne( id );

        if ( !channel )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        ChannelEntity.delete( { id } );

        return true;
    }
}