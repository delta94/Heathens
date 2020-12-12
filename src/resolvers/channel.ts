import { ErrorResponse } from "../utils/ErrorResponse";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ChannelEntity } from '../entities/Channel';
import { isAdmin, isAuthenticated } from "../middlewares/protect";
import { MyContext } from "../utils/types";
import { UserEntity } from "../entities/User";

@Resolver()
export class ChannelResolver
{
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

        if ( !channel )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        return channel;
    }

    @UseMiddleware( isAuthenticated )
    @Query( () => [ UserEntity ] )
    async getUsersInChannel (
        @Arg( 'id' )
        id: number,
        @Ctx()
        { channelUsersLoader }: MyContext
    ): Promise<( UserEntity | Error )[]>
    {
        const channel = await ChannelEntity.findOne( id );

        if ( !channel )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        const users = await channelUsersLoader.loadMany( channel.userIds );

        console.log( users );

        return users;
    }

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