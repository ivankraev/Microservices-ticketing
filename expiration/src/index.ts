import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("Cluster id variable not provided");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS url variable not provided");
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
  } catch (error) {
    console.error(error);
  }
};

start();
