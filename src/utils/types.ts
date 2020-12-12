import { Request, Response } from 'express';
import { ISession } from './interfaces';
import { channelUsersLoader } from './dataLoaders';

export type MyContext = {
    req: Request,
    res: Response;
    session: ISession,
    channelUsersLoader: ReturnType<typeof channelUsersLoader>;
};