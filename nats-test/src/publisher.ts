import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"));

stan.on("connect", () => {
  console.log("Publisher connected to nats");
  const data = JSON.stringify({
    id: "2dad2aqwda",
    title: "asdasd",
    price: 20,
  });

  stan.publish("ticket:created", data, (err, guid) => {
    try {
      console.log("Event published", guid);
    } catch (error) {
      console.log(error);
    }
  });
});
