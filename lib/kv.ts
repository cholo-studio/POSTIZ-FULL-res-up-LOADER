import { createClient, type VercelKV } from '@vercel/kv'

// Accept both Vercel-KV-style and Upstash-Marketplace-style env var names,
// so the app works no matter how the Redis store injects its credentials.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

export const kv: VercelKV = createClient({
  url: url as string,
  token: token as string,
})
