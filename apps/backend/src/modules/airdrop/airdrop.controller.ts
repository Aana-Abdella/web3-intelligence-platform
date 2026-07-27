import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AirdropService } from './airdrop.service';
import { AirdropEligibilityDto } from './dto/airdrop.dto';

@ApiTags('airdrop')
@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Get('eligibility')
  @ApiOperation({ summary: 'Analyze wallet airdrop eligibility' })
  async getEligibility(@Query() query: AirdropEligibilityDto) {
    return this.airdropService.analyzeEligibility(query.address, query.chainId);
  }
}
