import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from 'src/schemas/log.schema';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', async () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;

      const log = new this.logModel({
        method,
        url: originalUrl,
        statusCode,
        responseTime,
      });

      await log.save();
    });

    next();
  }
}
