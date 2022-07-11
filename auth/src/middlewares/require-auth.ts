import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors/not-authorized-error";

// We should use this function only after current-user middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
