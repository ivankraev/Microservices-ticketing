import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });

  await ticket.save();
  return ticket;
};

it("fetches orders for an particular user", async () => {
  // Create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signup();
  const userTwo = global.signup();
  // Create one order as user #1
  const orderUserOne = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as user #2
  const orderOneUserTwo = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const orderTwoUserTwo = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);
  // Make request to get the orders for User #2
  const ordersFromUserTwo = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);
  expect(ordersFromUserTwo.body.length).toEqual(2);
  expect(ordersFromUserTwo.body[0].id).toEqual(orderOneUserTwo.body.id);
  expect(ordersFromUserTwo.body[1].id).toEqual(orderTwoUserTwo.body.id);
  expect(ordersFromUserTwo.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(ordersFromUserTwo.body[1].ticket.id).toEqual(ticketThree.id);

  // Make sure we only got the orders for User #2
});
