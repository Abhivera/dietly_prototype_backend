import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect();

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.log("❌ Redis Error:", err));

export default redisClient;
