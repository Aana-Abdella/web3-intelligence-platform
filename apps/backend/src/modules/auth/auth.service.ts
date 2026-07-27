import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { randomBytes } from 'crypto';

/**
 * Authentication service supporting wallet-based sign-in (SIWE pattern).
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Generates a nonce for wallet signature verification.
   */
  async getNonce(walletAddress: string) {
    const nonce = randomBytes(16).toString('hex');
    const normalized = walletAddress.toLowerCase();

    await this.prisma.user.upsert({
      where: { walletAddress: normalized },
      update: { nonce },
      create: { walletAddress: normalized, nonce },
    });

    return {
      nonce,
      message: `Sign this message to authenticate with Web3 Intelligence Platform.\n\nNonce: ${nonce}`,
    };
  }

  /**
   * Verifies wallet signature and issues JWT token.
   * Production: implement full SIWE verification with viem/ethers.
   */
  async verifySignature(walletAddress: string, _signature: string) {
    const normalized = walletAddress.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { walletAddress: normalized } });

    if (!user || !user.nonce) {
      throw new Error('Invalid authentication request');
    }

    // TODO: Verify signature against nonce using viem verifyMessage
    // For now, accept any signature in development

    await this.prisma.user.update({
      where: { id: user.id },
      data: { nonce: null, lastLoginAt: new Date() },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      walletAddress: user.walletAddress,
      role: user.role,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        ensName: user.ensName,
        role: user.role.toLowerCase(),
      },
    };
  }
}
