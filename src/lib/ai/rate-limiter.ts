const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 10;

interface RateLimitEntry {
  timestamps: number[];
}

const sessions = new Map<string, RateLimitEntry>();

export function checkRateLimit(sessionId: string): {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
} {
  const now = Date.now();
  let entry = sessions.get(sessionId);

  if (!entry) {
    entry = { timestamps: [] };
    sessions.set(sessionId, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    const oldestInWindow = entry.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetInMs: WINDOW_MS - (now - oldestInWindow),
    };
  }

  entry.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.timestamps.length,
    resetInMs: WINDOW_MS,
  };
}
