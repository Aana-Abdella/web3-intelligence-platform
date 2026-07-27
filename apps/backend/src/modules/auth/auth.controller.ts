import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce/:address')
  @ApiOperation({ summary: 'Get authentication nonce for wallet signing' })
  async getNonce(@Param('address') address: string) {
    return this.authService.getNonce(address);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify wallet signature and get JWT token' })
  async verify(@Body() body: { walletAddress: string; signature: string }) {
    return this.authService.verifySignature(body.walletAddress, body.signature);
  }
}
