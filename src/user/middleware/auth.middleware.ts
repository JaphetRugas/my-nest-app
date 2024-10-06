import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // use(req: any, res: any, next: () => void) {
  //   console.log("Auth Middleware Log");
  //   next();
  // }

  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new HttpException("No Authorization Token", HttpStatus.FORBIDDEN);

    if (authorization === 'my-secret-code') {
      console.log("Success")
      next();
    } else {
      console.log("Failed")
      // throw new HttpException("Invalid Authorization Token", HttpStatus.FORBIDDEN);
      res.status(401).send("Unauthorized");
    }
  }
}
