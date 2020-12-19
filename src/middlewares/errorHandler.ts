import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "src/utils/ErrorResponse";

export const errorHandler = ( err: ErrorResponse, _: Request, res: Response, next: NextFunction ) =>
{
    console.log( '===============' );
    console.log( err );
    console.log( '===============' );
    res.status( err.statusCode ).json( { success: false, error: err.message } );
    res.end();
    next();
};