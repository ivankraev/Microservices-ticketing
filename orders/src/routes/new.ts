import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@myticketsorganisation/common";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Ticket id is required"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    // Find the ticket the user is trying to order in the database

    // Make sure that the ticket is not already reserved

    

    res.send({});
  }
);

export { router as newOrderRouter };
