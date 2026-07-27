import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

/**
 * Global Redis cache module.
 */
@Global()
@Module({
  providers: [
    {
      provide: RedisService,
      useFactory: (config: ConfigService) => {
        return new RedisService(config.get<string>('REDIS_URL') ?? 'redis://localhost:6379');
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
