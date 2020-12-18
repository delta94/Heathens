import { createWithApollo } from "./withApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = ( ctx: NextPageContext ) =>
    new ApolloClient( {
        uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
        credentials: "include",
        headers: {
            cookie:
                ( typeof window === "undefined" ? ( ctx && ctx.req?.headers.cookie ) : undefined ) ||
                "",
        },
        cache: new InMemoryCache(),
    } );

export const withApollo = createWithApollo( createClient );
