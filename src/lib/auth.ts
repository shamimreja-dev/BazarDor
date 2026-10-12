import { betterAuth } from "better-auth";
import { headers } from "next/headers";

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
});

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}