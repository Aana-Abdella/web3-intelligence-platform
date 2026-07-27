import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { PortfolioQueryDto } from './dto/portfolio.dto';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Get wallet portfolio with token balances' })
  async getPortfolio(@Query() query: PortfolioQueryDto) {
    return this.portfolioService.getPortfolio(query.address, query.chainId);
  }
}
