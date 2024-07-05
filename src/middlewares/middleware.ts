import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { lstat } from "fs";



@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        const method = req.method;
        const url = req.url;

        console.log(`Method: ${method} Url: ${url}`);

        next();
    }

}

export function loggerFunction (req: Request, res: Response, next: NextFunction){

    const method = req.method;
    const url = req.url;

    console.log(`Method: ${method} Url: ${url}`);

    next();

}

export function userMiddleware (req: Request, res: Response, next: NextFunction){

    const method = req.method;
    const url = req.url;

    console.log(`Method: ${method} Url: ${url}`);

    next();
}