import { createClient } from "redis";

const redisClient = createClient({
    url: "rediss://default:ASqeAAIjcDEzZDdlMmQzNmE2OWU0NzY5OWU5NzcyNWU5MTZhZTc0Y3AxMA@open-ant-10910.upstash.io:6379",
  });
await redisClient.connect();

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.log("❌ Redis Error:", err));

export default redisClient;
