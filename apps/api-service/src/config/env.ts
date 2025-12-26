import z, { treeifyError } from "zod";
import "dotenv/config";
import { config } from "dotenv";

config({ path: "./../../.env" });

const _env = z.object({
  API_PORT: z.coerce.number().min(1, "PORT is required"),
  HOST: z.string().min(1, "HOST is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

function validateEnv() {
  const _parsed = _env.safeParse(process.env);
  if (!_parsed.success) {
    console.error(
      "Invalid environment variables",
      treeifyError(_parsed.error).properties
    );
    throw new Error("Invalid environment variables");
  }
  return _parsed.data;
}
export const env = validateEnv();
