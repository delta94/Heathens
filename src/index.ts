import 'reflect-metadata';
import express, { Request, Response } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import 'colors';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from "typeorm";
import { AuthResolver } from './resolvers/auth';
import { UserEntity } from './entities/User';
import { ChannelEntity } from './entities/Channel';
import { isProd } from './utils/constants';
import { MyContext } from './utils/types';
import { ChannelResolver } from './resolvers/channel';
import { MessageEntity } from './entities/Message';
import { MessageResolver } from './resolvers/message';
import { usersLoader, messagesLoader, channelLoader } from './utils/dataLoaders';
import { createPubSub } from './utils/pubsub';
import { createServer } from 'http';
import { ErrorResponse } from './utils/ErrorResponse';
import { GraphQLError } from 'graphql';
import { errorFormatter } from './utils/formatter';
import rateLimit from 'express-rate-limit';
import queryComplexity, { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';
import path from 'path';

const main = async () =>
{
    dotenv.config( { path: '.env.local' } );

    const RedisClient = new Redis();
    const RedisStore = connectRedis( session );

    await createConnection( {
        type: 'postgres',
        database: 'slack',
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [ UserEntity, ChannelEntity, MessageEntity ]
    } );

    console.log( `Postgres is here`.blue.bold );

    const app = express();

    app.use( cors( {
        origin: process.env.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200
    } ) );

    const limiter = rateLimit( {
        windowMs: 10 * 60 * 1000,   // 10 minutes
        max: 100
    } );

    app.use( limiter );

    app.use( '/', express.static( path.join( __dirname, '/docs' ) ) );

    const sessionParser = session( {
        store: new RedisStore( { client: RedisClient } ),
        name: 'quid',
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: isProd(),
            maxAge: 1000 * 60 * 60
        }
    } );

    const apolloServer = new ApolloServer( {
        schema: await buildSchema( {
            resolvers: [ HelloResolver, AuthResolver, ChannelResolver, MessageResolver ],
            validate: false,
            pubSub: createPubSub()
        } ),
        context: ( { req, res } ): MyContext => ( { req, res, session: req?.session, usersLoader: usersLoader(), messagesLoader: messagesLoader(), channelLoader: channelLoader(), pubsub: createPubSub() } ),
        subscriptions: {
            onConnect: ( _, ws: any ) =>
            {
                sessionParser( ws.upgradeReq as Request, {} as Response, () =>
                {
                    if ( !ws.upgradeReq.session.user )
                    {
                        throw new ErrorResponse( 'Fuck You!', 401 );
                    }
                } );
            }
        },
        validationRules: [
            queryComplexity( {
                maximumComplexity: 16,
                variables: {},
                onComplete: ( complexity: number ) =>
                {
                    if ( complexity > 16 )
                    {
                        console.log( `Query complexity = `.red.bold );
                    } else
                    {
                        console.log( `Query complexity = `.green.bold );
                    }
                    console.log( complexity );
                },
                estimators: [
                    fieldExtensionsEstimator(),
                    simpleEstimator( {
                        defaultComplexity: 1
                    } )
                ]
            } )
        ],
        formatError: ( err: GraphQLError ) =>
        {
            const customError = errorFormatter( err );
            return customError;
        }
    } );

    app.use( sessionParser );

    apolloServer.applyMiddleware( { app, cors: false } );

    // app.use( errorHandler );

    const ws = createServer( app );
    apolloServer.installSubscriptionHandlers( ws );

    const PORT = process.env.PORT || 5000;

    ws.listen( PORT, async () =>
    {
        console.log( `Server started on port ${ PORT }`.green.bold );
    } );

};

main().catch( err => console.error( err ) );