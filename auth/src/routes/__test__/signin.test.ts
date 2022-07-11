import request from "supertest";
import { app } from "../../app";

const validEmail = "test@test.com";
const correctPassword = "password";
const wrongPassword = "wrongpassword";

it("fails with email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: validEmail,
      password: correctPassword,
    })
    .expect(400);
});

it("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: validEmail,
      password: correctPassword,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: validEmail,
      password: wrongPassword,
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: validEmail,
      password: correctPassword,
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: validEmail,
      password: correctPassword,
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
