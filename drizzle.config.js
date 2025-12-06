import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_yT4qVRbM3hmi@ep-lucky-cherry-ahhhu7at-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});