import CONFIG from "@/config/CONFIG";
import Redis from "ioredis";

// const redis = new Redis()
const redis = new Redis({
  host: CONFIG.REDIS_HOST,
  port: Number(CONFIG.REDIS_PORT),
  password: CONFIG.REDIS_PASSWORD,
});

export default redis;
