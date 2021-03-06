import { MessageEntity } from "../entities/Message";
import { Arg, Ctx, FieldResolver, Mutation, PubSub, PubSubEngine, Resolver, Root, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../middlewares/protect";
import { ErrorResponse } from "../utils/ErrorResponse";
import { MyContext } from "../utils/types";
import { ChannelEntity } from "../entities/Channel";
import { UserEntity } from "../entities/User";
import { getConnection } from "typeorm";
import { NEW_MESSAGE } from "../utils/topics";

@Resolver( MessageEntity )
export class MessageResolver
{
    @FieldResolver( () => ChannelEntity )
    channel (
        @Root()
        message: MessageEntity,
        @Ctx()
        { channelLoader }: MyContext,
    ): Promise<ChannelEntity>
    {
        return channelLoader.load( message.channelId );
    }

    @FieldResolver( () => UserEntity )
    poster (
        @Root()
        message: MessageEntity,
        @Ctx()
        { usersLoader }: MyContext,
    ): Promise<UserEntity>
    {
        return usersLoader.load( message.posterId );
    }


    @UseMiddleware( isAuthenticated )
    @Mutation( () => MessageEntity )
    async postMessage (
        @Arg( 'content' )
        content: string,
        @Arg( 'channelId' )
        channelId: number,
        @Ctx()
        { session, }: MyContext,
        @PubSub()
        pubsub: PubSubEngine
    ): Promise<MessageEntity>
    {
        const channel = await ChannelEntity.findOne( channelId );
        if ( !channel )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }
        if ( !channel.userIds || !channel.userIds.includes( session.user as number ) )
        {
            throw new ErrorResponse( 'You must join the channel first', 404 );
        }
        const newMessage = await MessageEntity.create( { content, posterId: session.user as number, channelId } ).save();
        await getConnection().query( ( `
                UPDATE channel_entity
                SET "messageIds" = "messageIds" || ${ newMessage.id }
                WHERE id = ${ channelId }
            `) );

        await pubsub.publish( NEW_MESSAGE, newMessage );

        return newMessage;
    }

    @UseMiddleware( isAuthenticated )
    @Mutation( () => Boolean )
    async deleteMessage (
        @Arg( 'id' )
        id: number,
        @Ctx()
        { session }: MyContext
    ): Promise<boolean>
    {
        const message = await MessageEntity.findOne( id );

        if ( !message )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        if ( message.posterId !== session.user )
        {
            throw new ErrorResponse( 'Not Authorized', 400 );
        }

        const channel = await ChannelEntity.findOne( message.channelId );

        if ( !channel?.userIds.includes( message.posterId ) )
        {
            throw new ErrorResponse( 'You must join the channel first', 404 );
        }

        await getConnection().transaction( async tn =>
        {
            await tn.query( ( `
                UPDATE channel_entity SET "messageIds" = (SELECT ARRAY(SELECT UNNEST("messageIds")
                EXCEPT
                SELECT UNNEST(ARRAY[${ message.id }])))
                WHERE id = ${ message.channelId };
            `) );

            await tn.query( `
                DELETE FROM message_entity
                WHERE id = ${ message.id };
            `);

        } );
        return true;
    }
}