import { cookies } from "next/headers";

export async function getCurrentUser() {

  const token = (await cookies()).get("auth_token")?.value;

  if (!token) return null;

  // const res = await fetch("https://api.prismplus.ai/v1/me", {
  const res = await fetch("http://localhost:1100/v1/me", {
    headers: {
      cookie: `auth_token=${token}`
    },
    cache: "no-store"
  });

  if (!res.ok) return null;

  return res.json();
}
