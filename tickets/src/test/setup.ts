import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";

import { app } from "../app";

declare global {
  var signup: () => string[];
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

global.signup = () => {
  // build a JWT payload {id,email}
  const payload = {
    id: "sadj2jd287",
    email: "fakeemail@test.com",
  };
  // Create the JWT
  const token = jwt.sign(payload, "privateKey");
  // Build session object. {jwt: MyJWT}
  const session = { jwt: token };
  // Turn session into json
  const sessionJSON = JSON.stringify(session);
  // Take json and encode it into 64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string thets the cookie with encoded data
  return [`session=${base64}`];
};
