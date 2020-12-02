import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ChannelEntity } from '../entities/Channel';
import { isAdmin, isAuthenticated } from "../middlewares/protect";

@Resolver()
export class ChannelResolver
{
    @UseMiddleware( isAuthenticated )
    @Query( () => [ ChannelEntity ] )
    getChannels (): Promise<ChannelEntity[]>
    {
        return ChannelEntity.find();
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

    @UseMiddleware( isAuthenticated )
    @UseMiddleware( isAdmin )
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

    @UseMiddleware( isAuthenticated )
    @UseMiddleware( isAdmin )
    @Mutation( () => Boolean )
    async deleteChannel (
        @Arg( 'id' )
        id: number
    ): Promise<boolean>
    {
        ChannelEntity.delete( { id } );
        return true;
    }
}