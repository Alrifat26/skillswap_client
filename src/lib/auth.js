import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import client from "./mongodb";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(
    client.db(process.env.AUTH_DB_NAME),
    {
      client,
    }
  ),

  emailAndPassword: {
    enabled: true,
  },

  // ⚡ এই অংশটুকু যুক্ত করা হয়েছে কাস্টম রোল এবং বাকি ফিল্ডগুলো MongoDB-তে সেভ করার জন্য
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true, 
        defaultValue: "Client", // কিছু না পাঠালে ডিফল্ট হিসেবে Client রোল সেট হবে
      },
      skills: {
        type: "string[]",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
});