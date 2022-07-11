import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";

declare global {
  var signup: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const validEmail = "test@test.com";
  const correctPassword = "password";
  const res = await request(app).post("/api/users/signup").send({
    email: validEmail,
    password: correctPassword,
  });

  const cookie = res.get("Set-Cookie");

  return cookie;
};
