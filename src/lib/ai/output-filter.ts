const BLOCKED_PATTERNS = [
  /\b(address|phone|email|school|teacher|parent|mom|dad|password)\b.*\?/i,
  /what(?:'s| is) your (name|age|grade|school)/i,
  /where do you (live|go to school)/i,
  /tell me about your (family|friends|home)/i,
];

const MAX_RESPONSE_LENGTH = 300;

export function filterResponse(response: string): {
  safe: boolean;
  filtered: string;
  reason?: string;
} {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(response)) {
      return {
        safe: false,
        filtered:
          "Oops, I got a little confused! Let's get back to coding. What would you like to build?",
        reason: "Response contained personal information request",
      };
    }
  }

  let filtered = response;
  if (filtered.length > MAX_RESPONSE_LENGTH) {
    const lastSentence = filtered.lastIndexOf(".", MAX_RESPONSE_LENGTH);
    filtered =
      lastSentence > 0
        ? filtered.slice(0, lastSentence + 1)
        : filtered.slice(0, MAX_RESPONSE_LENGTH) + "...";
  }

  return { safe: true, filtered };
}
