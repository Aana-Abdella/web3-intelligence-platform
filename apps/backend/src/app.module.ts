import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { RedisModule } from './infrastructure/cache/redis.module';
import { HealthModule } from './modules/health/health.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AirdropModule } from './modules/airdrop/airdrop.module';
import { AuthModule } from './modules/auth/auth.module';

/**
 * Root application module.
 * Wires together infrastructure and feature modules following Clean Architecture.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../../.env'] }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60', 10) * 1000,
        limit: parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
      },
    ]),
    PrismaModule,
    RedisModule,
    HealthModule,
    AuthModule,
    WalletModule,
    PortfolioModule,
    AirdropModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
