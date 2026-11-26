/**
 * Ultra-fast L1 (in-memory) + L2 (localStorage) cache for zero-latency data access.
 * Implements Stale-While-Revalidate (SWR) and in-flight request deduplication.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();
const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes
const MAX_STALE_MS = 24 * 60 * 60 * 1000; // 24 hours SWR window

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    try {
      return window.sessionStorage;
    } catch {
      return null;
    }
  }
}

export function getCached<T>(key: string, maxAgeMs = DEFAULT_TTL_MS): T | null {
  const now = Date.now();

  // 1. L1 in-memory cache (~0.01ms)
  const mem = memoryCache.get(key);
  if (mem && now - mem.timestamp < maxAgeMs) {
    return mem.data as T;
  }

  // 2. L2 persistent storage (~0.1ms)
  const storage = getStorage();
  if (storage) {
    try {
      const raw = storage.getItem(`tcb_cache_${key}`);
      if (raw) {
        const parsed = JSON.parse(raw) as CacheEntry<T>;
        if (now - parsed.timestamp < Math.max(maxAgeMs, MAX_STALE_MS)) {
          memoryCache.set(key, parsed as CacheEntry<unknown>);
          return parsed.data;
        }
      }
    } catch {
      // Storage restricted or corrupted
    }
  }

  return null;
}

export function setCached<T>(key: string, data: T): void {
  const item: CacheEntry<T> = { data, timestamp: Date.now() };
  memoryCache.set(key, item as CacheEntry<unknown>);
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(`tcb_cache_${key}`, JSON.stringify(item));
    } catch {
      // Storage quota exceeded or restricted
    }
  }
}

export function dedupeFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = inFlightRequests.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  const promise = fetcher().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise);
  return promise;
}

export function clearCache(key?: string): void {
  if (key) {
    memoryCache.delete(key);
    const storage = getStorage();
    if (storage) {
      try {
        storage.removeItem(`tcb_cache_${key}`);
      } catch {
        // Ignore
      }
    }
  } else {
    memoryCache.clear();
    const storage = getStorage();
    if (storage) {
      try {
        Object.keys(storage)
          .filter((k) => k.startsWith('tcb_cache_'))
          .forEach((k) => storage.removeItem(k));
      } catch {
        // Ignore
      }
    }
  }
}
