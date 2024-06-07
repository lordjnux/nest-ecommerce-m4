import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  try {
    console.info(
      `Method: ${req.method.toUpperCase()} Path: ${req.url} Event: ${new Date()}`,
    );
    next();
  } catch (error: any) {
    next(error);
  }
}
