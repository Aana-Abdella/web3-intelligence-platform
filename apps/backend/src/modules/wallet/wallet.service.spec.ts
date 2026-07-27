import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { RedisService } from '@/infrastructure/cache/redis.service';

describe('WalletService', () => {
  let service: WalletService;

  const mockWalletRepo = {
    upsert: jest.fn(),
    saveRecentSearch: jest.fn(),
    getRecentSearches: jest.fn().mockResolvedValue([]),
  };

  const mockRedis = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn(),
    getOrSet: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: WalletRepository, useValue: mockWalletRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reject invalid wallet address', async () => {
    await expect(service.searchWallet('invalid-address')).rejects.toThrow(
      'Invalid wallet address format',
    );
  });

  it('should reject empty address', async () => {
    await expect(service.searchWallet('')).rejects.toThrow(
      'Invalid wallet address format',
    );
  });
});
