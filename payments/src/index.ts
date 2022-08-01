import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { app } from "./app";

const port = process.env.PORT || 3000;

const start = async () => {
  console.log(process.env.NATS_CLUSTER_ID, process.env.NATS_URL);

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("Cluster id variable not provided");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS url variable not provided");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo uri variable not provided");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("Client id variable not provided");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCancelledListener(natsWrapper.client).listen();
    new OrderCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log("Listening on port 3000");
  });
};

start();
