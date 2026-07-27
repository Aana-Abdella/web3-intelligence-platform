import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * Redis caching service with JSON serialization support.
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.client.connect().catch((err) => {
      this.logger.warn(`Redis connection failed: ${err.message}. Caching disabled.`);
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  /**
   * Gets a cached value by key.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  }

  /**
   * Sets a cached value with TTL in seconds.
   */
  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    try {
      await this.client.setex(key, ttlSeconds, JSON.stringify(value));
    } catch {
      this.logger.warn(`Cache set failed for key ${key}`);
    }
  }

  /**
   * Deletes a cached value.
   */
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch {
      // Silently fail cache invalidation
    }
  }

  /**
   * Gets or sets a cached value using a factory function.
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, ttlSeconds: number): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) return cached;

    const value = await factory();
    await this.set(key, value, ttlSeconds);
    return value;
  }
}
