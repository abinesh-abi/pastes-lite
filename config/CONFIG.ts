export default {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,

  SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
};
