import mongoose from "mongoose";

import { app } from "./app";

const port = process.env.PORT || 3000;

const start = async () => {
  console.log("starting up...");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log("Listening on port 3000");
  });
};

start();
