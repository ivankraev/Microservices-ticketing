import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// Find Express object, find the Request interface and add currentUser optional property to it
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, "privateKey") as UserPayload;
    req.currentUser = payload;
  } catch (error) {
    console.log("Could not verify jwt");
  }
  next();
};
