const { Ratelimit } = require("@upstash/ratelimit")
const { Redis } = require("@upstash/redis")
require("dotenv").config()

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
})

module.exports = ratelimit
