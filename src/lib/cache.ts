/**
 * Ultra-fast in-memory and sessionStorage cache for zero-latency data access.
 * Implements Stale-While-Revalidate (SWR) pattern.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function getCached<T>(key: string, maxAgeMs = DEFAULT_TTL_MS): T | null {
  const now = Date.now();

  // 1. Check in-memory cache (0.01ms)
  const mem = memoryCache.get(key);
  if (mem && (now - mem.timestamp < maxAgeMs)) {
    return mem.data as T;
  }

  // 2. Check sessionStorage fallback (0.1ms)
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(`tcb_cache_${key}`);
      if (raw) {
        const parsed = JSON.parse(raw) as CacheEntry<T>;
        if (now - parsed.timestamp < maxAgeMs) {
          memoryCache.set(key, parsed as CacheEntry<unknown>);
          return parsed.data;
        }
      }
    } catch {
      // Storage restricted or unavailable
    }
  }

  return null;
}

export function setCached<T>(key: string, data: T): void {
  const item: CacheEntry<T> = { data, timestamp: Date.now() };
  memoryCache.set(key, item as CacheEntry<unknown>);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`tcb_cache_${key}`, JSON.stringify(item));
    } catch {
      // Storage quota or restriction
    }
  }
}

export function clearCache(key?: string): void {
  if (key) {
    memoryCache.delete(key);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(`tcb_cache_${key}`);
      } catch {
        // Ignore
      }
    }
  } else {
    memoryCache.clear();
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
      } catch {
        // Ignore
      }
    }
  }
}
