import { MessageEntity } from "../entities/Message";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAdmin, isAuthenticated } from "../middlewares/protect";
import { ErrorResponse } from "../utils/ErrorResponse";

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
    async getSingleMessage (
        @Arg( 'id' )
        id: number
    ): Promise<MessageEntity | undefined>
    {
        const message = await MessageEntity.findOne( id );

        if ( !message )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }
        return message;
    }

    @UseMiddleware( isAuthenticated )
    @Mutation( () => MessageEntity )
    async postMessage (
        @Arg( 'content' )
        content: string
    ): Promise<MessageEntity>
    {
        const message = await MessageEntity.create( { content } ).save();
        return message;
    }

    @UseMiddleware( isAuthenticated )
    @Mutation( () => Boolean )
    async deleteMessage (
        @Arg( 'id' )
        id: number
    ): Promise<boolean>
    {
        const message = await MessageEntity.findOne( id );

        if ( !message )
        {
            throw new ErrorResponse( 'Resource does not exits', 404 );
        }

        MessageEntity.delete( { id } );
        return true;
    }
}