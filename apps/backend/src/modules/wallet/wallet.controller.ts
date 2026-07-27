import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { WalletSearchDto, WalletOverviewDto } from './dto/wallet.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search and analyze a wallet address' })
  @ApiQuery({
    name: 'address',
    required: true,
    example: '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6',
  })
  @ApiQuery({ name: 'chainId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Wallet overview returned' })
  @ApiResponse({ status: 400, description: 'Invalid address' })
  async search(@Query() query: WalletSearchDto) {
    return this.walletService.searchWallet(query.address, query.chainId, query.refresh);
  }

  @Get('overview')
  @ApiOperation({ summary: 'Get wallet dashboard overview' })
  async getOverview(@Query() query: WalletOverviewDto) {
    return this.walletService.getOverview(query.address, query.chainId, query.refresh);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent wallet searches' })
  async getRecentSearches() {
    return this.walletService.getRecentSearches();
  }
}
