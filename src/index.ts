import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import 'colors';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from "typeorm";
import { AuthResolver } from './resolvers/auth';
import { UserEntity } from './entities/User';
import { errorHandler } from './middlewares/errorHandler';

const main = async () =>
{
    dotenv.config( { path: 'config.env' } );

    await createConnection( {
        type: 'postgres',
        database: 'slack',
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        logging: true,
        // synchronize: true,
        entities: [ UserEntity ]
    } );

    console.log( `Postgres is here`.blue.bold );

    const app = express();

    const apolloServer = new ApolloServer( {
        schema: await buildSchema( {
            resolvers: [ HelloResolver, AuthResolver ],
            validate: false
        } ),
        context: ( { req, res } ) => ( { req, res } )
    } );

    apolloServer.applyMiddleware( { app } );

    app.use( errorHandler );

    const PORT = process.env.PORT || 5000;
    app.listen( PORT, () =>
    {
        console.log( `Server started on port ${ PORT }`.green.bold );
    } );
};

main();