import { Subscription, Root, Mutation, PubSub, Arg } from "type-graphql";
import { PubSubEngine } from 'graphql-subscriptions';

const TRIGGER = 'noti';
const notis = [];

export class SampleResolver
{
    @Subscription( () => String, {
        // topics: TRIGGER,
        subscribe: ( root, _, ctx, info ) =>
        {
            console.log( 'root, _, ctx, info', root, _, ctx, info );
            return ctx;
        }
    } )
    async newNotification (
        @Root()
        payload: any,
        @PubSub() pubSub: PubSubEngine
    )
    {
        const ok = pubSub.asyncIterator( TRIGGER );
        console.log( 'ok', ok );
        return payload[ TRIGGER ];
    }

    @Mutation( _ => Boolean )
    async addNewNoti (
        @Arg( 'noti' )
        noti: string,
        @PubSub() pubSub: PubSubEngine
    )
    {
        notis.push( noti );
        await pubSub.publish( TRIGGER, { [ TRIGGER ]: noti } );
        return true;
    }

}