import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed demo wallet data
  const demoWallet = await prisma.wallet.upsert({
    where: {
      address_chain: {
        address: '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6',
        chain: 'ETHEREUM',
      },
    },
    update: {},
    create: {
      address: '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6',
      chain: 'ETHEREUM',
      ensName: 'vitalik.eth',
      portfolioValueUsd: 850000,
      walletAgeDays: 3200,
      tokenCount: 45,
      nftCount: 12,
      riskScore: 15,
      reputationScore: 95,
      transactionCount: 2847,
      totalGasSpentUsd: 12500,
      firstActivityAt: new Date('2015-08-07'),
      lastActivityAt: new Date(),
      labels: ['Whale', 'OG Wallet', 'Active Trader'],
      isWhale: true,
      lastSyncedAt: new Date(),
    },
  });

  console.log(`Seeded wallet: ${demoWallet.ensName ?? demoWallet.address}`);

  // Seed airdrop analysis for demo wallet
  await prisma.airdropAnalysis.upsert({
    where: { id: 'seed-airdrop-1' },
    update: {},
    create: {
      id: 'seed-airdrop-1',
      walletId: demoWallet.id,
      score: 92,
      level: 'excellent',
      factors: [
        { name: 'Wallet Age', score: 100, maxScore: 100, weight: 0.15, description: '3200 days' },
        { name: 'Transaction Count', score: 100, maxScore: 100, weight: 0.1, description: '2847 txs' },
        { name: 'Bridge Usage', score: 85, maxScore: 100, weight: 0.15, description: 'Active bridge user' },
        { name: 'Layer 2 Usage', score: 90, maxScore: 100, weight: 0.15, description: 'Heavy L2 activity' },
        { name: 'DeFi Activity', score: 95, maxScore: 100, weight: 0.15, description: 'Extensive DeFi usage' },
      ],
      suggestions: [
        'Maintain current activity levels',
        'Continue exploring new L2 ecosystems',
      ],
      potentialCampaigns: [
        {
          name: 'LayerZero',
          protocol: 'LayerZero',
          likelihood: 'high',
          requirements: ['Bridge usage', 'Multi-chain activity'],
        },
      ],
      status: 'COMPLETED',
    },
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
