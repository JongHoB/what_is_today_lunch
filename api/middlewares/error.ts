import { NextFunction, Request, Response } from "express";

interface e extends Error {
  statusCode?: number;
  message: string;
}

export const asyncErrorHandler = (func: Function) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await func(request, response).catch((error: e) => next(error));
  };
};

export const errorHandler = (
  err: e,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(err);
  return response.status(err.statusCode || 500).json({ message: err.message });
};
