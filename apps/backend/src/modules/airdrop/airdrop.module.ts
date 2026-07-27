import { Module } from '@nestjs/common';
import { AirdropController } from './airdrop.controller';
import { AirdropService } from './airdrop.service';

@Module({
  controllers: [AirdropController],
  providers: [AirdropService],
})
export class AirdropModule {}
