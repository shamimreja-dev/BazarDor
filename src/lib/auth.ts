import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  // Production URL and Vercel Preview Domains Allow kora
  baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-beige-one.vercel.app",
  trustedOrigins: [
    "https://bazar-dor-beige-one.vercel.app",
    "https://*.vercel.app", // Shob Vercel preview domain allow korbe[cite: 13]
    "http://localhost:3000"
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});