import mongoose from "mongoose";

import { app } from "./app";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log("Listening on port 3000");
  });
};

start();
