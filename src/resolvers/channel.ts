import { ErrorResponse } from "../utils/ErrorResponse";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ChannelEntity } from '../entities/Channel';
import { isAdmin, isAuthenticated } from "../middlewares/protect";

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
    getSingleChannel (
        @Arg( 'id' )
        id: number
    ): Promise<ChannelEntity | undefined>
    {
        return ChannelEntity.findOne( id );
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
        // @Arg( 'id' )
        // id: number
    ): Promise<boolean>
    {
        throw new ErrorResponse( 'Resource does not exists', 400 );
    }
}