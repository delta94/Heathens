import { MessageEntity } from "src/entities/Message";
import { MyContext } from "src/utils/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ChannelEntity } from '../entities/Channel';
import { isAdmin, isAuthenticated } from "../middlewares/protect";

@Resolver()
export class MessageResolver
{
    @UseMiddleware( isAuthenticated )
    @Query( () => [ MessageEntity ] )
    getMessages (): Promise<MessageEntity[]>
    {
        return MessageEntity.find();
    }

    @UseMiddleware( isAuthenticated )
    @Query( () => MessageEntity )
    getSingleChannel (
        @Arg( 'id' )
        id: number
    ): Promise<MessageEntity | undefined>
    {
        return MessageEntity.findOne( id );
    }

    @UseMiddleware( isAuthenticated )
    @Mutation( () => MessageEntity )
    async postMessage (
        @Arg( 'content' )
        content: string,
        @Arg( 'channel' )
        channel: string,
        @Ctx()
        { session }: MyContext
    ): Promise<MessageEntity>
    {
        const newMessage = await MessageEntity.create( { content   } ).save();

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