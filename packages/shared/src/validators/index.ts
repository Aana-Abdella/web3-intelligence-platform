import { z } from 'zod';
import { ChainId } from '../constants/index.js';

/** EVM address validation schema */
export const evmAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address format');

/** Solana address validation schema */
export const solanaAddressSchema = z
  .string()
  .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, 'Invalid Solana address format');

/** Wallet address validation (EVM or Solana) */
export const walletAddressSchema = z.string().refine(
  (val) => {
    return evmAddressSchema.safeParse(val).success || solanaAddressSchema.safeParse(val).success;
  },
  { message: 'Invalid wallet address' },
);

/** Chain ID validation schema */
export const chainIdSchema = z.nativeEnum(ChainId);

/** Pagination query schema */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** Wallet search query schema */
export const walletSearchSchema = z.object({
  address: walletAddressSchema,
  chainId: chainIdSchema.optional(),
});

/** Wallet overview query schema */
export const walletOverviewSchema = z.object({
  address: walletAddressSchema,
  chainId: chainIdSchema.optional(),
  refresh: z.coerce.boolean().optional().default(false),
});

/** Bookmark wallet schema */
export const bookmarkWalletSchema = z.object({
  address: walletAddressSchema,
  chainId: chainIdSchema,
  label: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

/** Wallet comparison schema */
export const walletComparisonSchema = z.object({
  addresses: z.array(walletAddressSchema).min(2).max(5),
  chainId: chainIdSchema.optional(),
});

/** Export format schema */
export const exportFormatSchema = z.enum(['csv', 'pdf']);

/** Date range filter schema */
export const dateRangeSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type WalletSearchInput = z.infer<typeof walletSearchSchema>;
export type WalletOverviewInput = z.infer<typeof walletOverviewSchema>;
export type BookmarkWalletInput = z.infer<typeof bookmarkWalletSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
