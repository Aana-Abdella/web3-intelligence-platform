import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { ChainId } from '@web3-intelligence/shared';
import { Transform } from 'class-transformer';

export class WalletSearchDto {
  @ApiProperty({ example: '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6' })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiPropertyOptional({ enum: ChainId })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsEnum(ChainId)
  chainId?: ChainId;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  refresh?: boolean;
}

export class WalletOverviewDto extends WalletSearchDto {}
