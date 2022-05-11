import { NhostClient } from "@nhost/nhost-js";
import { type Session, type User } from "@nhost/hasura-auth-js";

export const nhost = new NhostClient({
  backendUrl: import.meta.env.VITE_NHOST_URL || "http://localhost:1337",
});

export { Session, User };
