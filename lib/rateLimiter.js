import rateLimit from "next-rate-limit";

export const limiter = rateLimit({
  interval: 10 * 1000, // 10 seconds window
  uniqueTokenPerInterval: 500, // Max 500 IPs per 10s
});
