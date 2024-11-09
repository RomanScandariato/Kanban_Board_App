import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const { verify } = jwt;

// Create a middleware function that blocks unauthicated users from triggering user ONLY routes
export const blockGuests = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Retrieve the token cookie from req.cookies

  // TODO: If the token cookie does not exist, send a 401 json response message and return

  // TODO: If the token exists, validate it with the verify function, ( ie. verify(token, process.env.JWT_SECRET) )

  // TODO: If it verifies, call next to move the request on to the controller function

  // TODO: If it doesn't verify send a 401 json response message and DO NOT call next
};
