import request from "supertest";
import { app } from "../../app";

const validEmail = "test@test.com";
const correctPassword = "password";

it("responds with details about the current user", async () => {
  const cookie = await global.signup();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.currentUser.email).toEqual(validEmail);
});
