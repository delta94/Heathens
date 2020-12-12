import { Request, Response } from 'express';
import { ISession } from './interfaces';
import { usersLoader, messagesLoader, channelLoader, } from './dataLoaders';

export type MyContext = {
    req: Request,
    res: Response;
    session: ISession,
    usersLoader: ReturnType<typeof usersLoader>;
    messagesLoader: ReturnType<typeof messagesLoader>;
    channelLoader: ReturnType<typeof channelLoader>;
};