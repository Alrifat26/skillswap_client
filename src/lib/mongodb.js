import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI;

if (!uri) {
  throw new Error("MONGO_DB_URI is missing");
}

const client = new MongoClient(uri);

export default client;