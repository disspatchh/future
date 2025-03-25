import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request log
    console.log(`req:`, {
      originalUrl: req.originalUrl,
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    if (next) {
      next();
    }
  }
}
