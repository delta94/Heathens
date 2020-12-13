import { Publisher, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";

let count = 0;

@Resolver()
export class HelloResolver
{
    @Query( () => String )
    hello ()
    {
        return 'worlds';
    }

    @Subscription(
        () => String,
        {
            topics: 'ok',
        }
    )
    sub (
        @Root()
        payload: String
    )
    {
        return payload;
    }

    @Query( () => String )
    pub (
        @PubSub( 'ok' )
        publish: Publisher<String>
    )
    {
        setInterval( () =>
        {
            publish( 'oh no' );
        }, 1000 );
        return 'published';
    }

}


// import { MyContext } from "../utils/types";
// import { Ctx, Query, Resolver } from "type-graphql";

// @Resolver()
// export class HelloResolver
// {
//     @Query( () => String )
//     hello (
//         @Ctx()
//         { session }: MyContext
//     )
//     {
//         session.destroy( err => console.error( err ) );
//         return 'worlds';
//     }
// }
