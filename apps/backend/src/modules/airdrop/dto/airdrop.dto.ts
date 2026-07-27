import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ChainId } from '@web3-intelligence/shared';

export class AirdropEligibilityDto {
  @ApiProperty({ example: '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6' })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiPropertyOptional({ enum: ChainId })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  })
  @IsEnum(ChainId)
  chainId?: ChainId;
}
