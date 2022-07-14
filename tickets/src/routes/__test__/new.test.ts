import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});
it("can only be accessed if the user is signed in", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).toEqual(401);
});
it("returns a status other than 401 if the user is signed in", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({});
  expect(res.status).not.toEqual(401);
});
it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "", price: 10 })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ price: 10 })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "asdasda" })
    .expect(400);
});