import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets${id}`)
    .set("Cookie", global.signup())
    .send({ title: "asdasd", price: 20 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "asdasd", price: 20 })
    .expect(401);
});

it("returns a 404 if the user does not own a ticket", async () => {
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signup())
    .send({ title: "asdasd", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signup())
    .send({ title: "asdasdas", price: 10 })
    .expect(401);
});

it("returns 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signup();
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdasdas", price: 10 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "asdasdas", price: "" })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signup();
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdasdas", price: 10 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "ssssss", price: 20 })
    .expect(200);

  const ticketRes = await request(app).get(`/api/tickets/${res.body.id}`);
  expect(ticketRes.body.title).toEqual("ssssss");
  expect(ticketRes.body.price).toEqual(20);
});

it("publishes an event", async () => {
  const cookie = global.signup();
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdasdas", price: 10 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "ssssss", price: 20 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
