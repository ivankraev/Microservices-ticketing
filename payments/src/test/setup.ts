import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signup: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// for some reasons 1 of the suits fail when closing mongo connection

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = (id?: string) => {
  // build a JWT payload {id,email}
  const payload = {
    id: id ?? new mongoose.Types.ObjectId().toHexString(),
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
