import { ChainId } from '@web3-intelligence/shared';

export const SAMPLE_WALLET_ADDRESS = '0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6';

export const PLATFORM_METRICS = [
  { label: 'Tracked chains', value: '8', detail: 'EVM + Solana coverage' },
  { label: 'Cache TTL', value: '2-10m', detail: 'Fast repeat analysis' },
  { label: 'API modules', value: '5', detail: 'Wallet, portfolio, airdrop, auth, health' },
  { label: 'Version', value: 'v0.1.0', detail: 'Under active development' },
];

export const DASHBOARD_OVERVIEW = [
  { label: 'Indexed wallets', value: '128.4K', change: '+12.8%' },
  { label: 'Assets tracked', value: '$42.7M', change: '+4.1%' },
  { label: 'Risk scans', value: '18.9K', change: '+8.5%' },
  { label: 'Airdrop checks', value: '31.2K', change: '+15.2%' },
];

export const CHAIN_DISTRIBUTION = [
  { name: 'Ethereum', value: 38, color: '#22d3ee' },
  { name: 'Base', value: 18, color: '#34d399' },
  { name: 'Arbitrum', value: 15, color: '#f59e0b' },
  { name: 'Optimism', value: 12, color: '#f43f5e' },
  { name: 'Polygon', value: 9, color: '#a78bfa' },
  { name: 'Other', value: 8, color: '#94a3b8' },
];

export const PORTFOLIO_HISTORY = [
  { date: 'Jan', value: 82000, pnl: 4200 },
  { date: 'Feb', value: 91000, pnl: 6100 },
  { date: 'Mar', value: 108000, pnl: 9400 },
  { date: 'Apr', value: 104000, pnl: 7200 },
  { date: 'May', value: 126500, pnl: 12100 },
  { date: 'Jun', value: 139400, pnl: 16800 },
  { date: 'Jul', value: 151900, pnl: 21400 },
];

export const TOKEN_HOLDINGS = [
  {
    symbol: 'ETH',
    name: 'Ether',
    chain: 'Ethereum',
    allocation: 42,
    balance: '38.42',
    valueUsd: 129360,
    performance: 12.4,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    chain: 'Base',
    allocation: 21,
    balance: '64,300.00',
    valueUsd: 64300,
    performance: 0.1,
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
    chain: 'Arbitrum',
    allocation: 14,
    balance: '42,100.00',
    valueUsd: 43152,
    performance: 8.6,
  },
  {
    symbol: 'OP',
    name: 'Optimism',
    chain: 'Optimism',
    allocation: 10,
    balance: '19,850.00',
    valueUsd: 31820,
    performance: -3.2,
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    chain: 'Polygon',
    allocation: 8,
    balance: '32,400.00',
    valueUsd: 24948,
    performance: 4.9,
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    chain: 'Ethereum',
    allocation: 5,
    balance: '192.00',
    valueUsd: 15360,
    performance: 18.7,
  },
];

export const WALLET_ANALYTICS = [
  { label: 'Wallet age', value: '3,216 days', score: 92 },
  { label: 'Transaction count', value: '14,892', score: 88 },
  { label: 'Gas spent', value: '$38,420', score: 83 },
  { label: 'Protocols used', value: '67', score: 91 },
  { label: 'DEX interactions', value: '1,284', score: 86 },
  { label: 'Bridge interactions', value: '219', score: 78 },
  { label: 'NFT activity', value: '346 events', score: 64 },
  { label: 'DeFi activity', value: 'High', score: 89 },
  { label: 'Token diversity', value: '124 assets', score: 81 },
  { label: 'Wallet score', value: '87/100', score: 87 },
];

export const ACTIVITY_HEATMAP = Array.from({ length: 84 }, (_, index) => {
  const day = index % 7;
  const week = Math.floor(index / 7);
  return {
    day,
    week,
    value: (index * 17 + week * 11 + day * 5) % 100,
  };
});

export const PROTOCOL_USAGE = [
  { protocol: 'Uniswap', interactions: 382, category: 'DEX' },
  { protocol: 'Aave', interactions: 144, category: 'Lending' },
  { protocol: 'LayerZero', interactions: 96, category: 'Bridge' },
  { protocol: 'OpenSea', interactions: 72, category: 'NFT' },
  { protocol: 'Safe', interactions: 41, category: 'Account' },
];

export const TRANSACTIONS = [
  {
    hash: '0x7f91...a21c',
    method: 'Swap',
    chain: 'Ethereum',
    counterparty: 'Uniswap Universal Router',
    value: '$12,840.22',
    gas: '$38.12',
    status: 'Success',
    time: '12 min ago',
  },
  {
    hash: '0x983e...9b03',
    method: 'Bridge',
    chain: 'Base',
    counterparty: 'LayerZero Endpoint',
    value: '$4,200.00',
    gas: '$1.04',
    status: 'Success',
    time: '2 hr ago',
  },
  {
    hash: '0x0a42...f118',
    method: 'Approve',
    chain: 'Arbitrum',
    counterparty: 'Aave Pool',
    value: '$0.00',
    gas: '$0.62',
    status: 'Success',
    time: '5 hr ago',
  },
  {
    hash: '0xf4b1...c901',
    method: 'Mint',
    chain: 'Optimism',
    counterparty: 'Zora Creator Contract',
    value: '$22.00',
    gas: '$0.18',
    status: 'Success',
    time: '1 day ago',
  },
  {
    hash: '0x39aa...725d',
    method: 'Transfer',
    chain: 'Polygon',
    counterparty: 'Known exchange hot wallet',
    value: '$1,040.00',
    gas: '$0.04',
    status: 'Success',
    time: '2 days ago',
  },
];

export const NFT_COLLECTIONS = [
  { name: 'ENS Domains', items: 3, floor: '$82', chain: 'Ethereum', status: 'Verified' },
  { name: 'Zora Editions', items: 18, floor: '$12', chain: 'Base', status: 'Creator minted' },
  { name: 'Lens Handles', items: 2, floor: '$34', chain: 'Polygon', status: 'Social graph' },
  { name: 'OP Attestations', items: 11, floor: '$0', chain: 'Optimism', status: 'Soulbound' },
];

export const AIRDROP_FACTORS = [
  { name: 'Wallet age', score: 96, status: 'Complete' },
  { name: 'L2 activity', score: 86, status: 'Complete' },
  { name: 'Bridge usage', score: 78, status: 'Complete' },
  { name: 'Protocol diversity', score: 74, status: 'Improve' },
  { name: 'Governance activity', score: 32, status: 'Missing' },
  { name: 'Liquidity duration', score: 58, status: 'Improve' },
];

export const AIRDROP_OPPORTUNITIES = [
  {
    protocol: 'LayerZero',
    estimate: 'High',
    tasks: ['Bridge on 3+ chains', 'Use official bridge', 'Maintain non-dust volume'],
  },
  {
    protocol: 'Base ecosystem',
    estimate: 'Medium',
    tasks: ['Use apps monthly', 'Hold native assets', 'Avoid wash activity'],
  },
  {
    protocol: 'Intent networks',
    estimate: 'Watchlist',
    tasks: ['Route swaps', 'Provide solver volume', 'Return over multiple weeks'],
  },
];

export const HISTORICAL_AIRDROPS = [
  {
    name: 'Arbitrum',
    criteria: 'L2 usage, bridging, volume, active months',
    lesson: 'Sustained real usage mattered.',
  },
  {
    name: 'Optimism',
    criteria: 'Governance, Gitcoin, OP Mainnet activity',
    lesson: 'Public goods and governance were rewarded.',
  },
  {
    name: 'Uniswap',
    criteria: 'Historical protocol interaction',
    lesson: 'Early direct protocol usage was decisive.',
  },
];

export const RISK_FLAGS = [
  {
    title: 'Unlimited token approval',
    severity: 'Medium',
    target: 'Legacy DEX router',
    detail: 'Review active spend approvals and revoke unused allowances.',
  },
  {
    title: 'New counterparty exposure',
    severity: 'Low',
    target: 'Unverified contract',
    detail: 'One recent transaction touched a contract with limited history.',
  },
  {
    title: 'Phishing domain match',
    severity: 'Clear',
    target: 'No matches found',
    detail: 'No known phishing contract interaction in the concept scanner data.',
  },
];

export const SECURITY_TIPS = [
  'Use a hardware wallet for treasury assets.',
  'Revoke stale unlimited approvals after completing protocol actions.',
  'Separate minting, trading, and cold-storage wallets.',
  'Verify contract addresses from official protocol channels.',
];

export const NOTIFICATIONS = [
  {
    title: 'Airdrop score improved',
    detail: 'Base ecosystem score increased by 8 points.',
    time: '18 minutes ago',
  },
  {
    title: 'New approval detected',
    detail: 'Aave Pool received a USDC allowance.',
    time: '2 hours ago',
  },
  {
    title: 'Portfolio threshold crossed',
    detail: 'Total portfolio value moved above $300,000.',
    time: '1 day ago',
  },
  {
    title: 'Risk watchlist updated',
    detail: 'No new high-severity flags were found.',
    time: '2 days ago',
  },
];

export const NETWORK_OPTIONS = [
  { id: ChainId.ETHEREUM, name: 'Ethereum' },
  { id: ChainId.BASE, name: 'Base' },
  { id: ChainId.ARBITRUM, name: 'Arbitrum' },
  { id: ChainId.OPTIMISM, name: 'Optimism' },
  { id: ChainId.POLYGON, name: 'Polygon' },
  { id: ChainId.BNB, name: 'BNB Chain' },
  { id: ChainId.AVALANCHE, name: 'Avalanche' },
  { id: ChainId.SOLANA, name: 'Solana' },
];
