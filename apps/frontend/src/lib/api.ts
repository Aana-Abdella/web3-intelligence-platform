const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

/** Generic API fetch wrapper with error handling */
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message ?? `API error: ${response.status}`);
  }

  return response.json();
}

/** Wallet API endpoints */
export const walletApi = {
  search: (address: string, chainId?: number) =>
    apiFetch(`/wallets/search?address=${address}${chainId ? `&chainId=${chainId}` : ''}`),
  overview: (address: string, chainId?: number) =>
    apiFetch(`/wallets/overview?address=${address}${chainId ? `&chainId=${chainId}` : ''}`),
  recent: () => apiFetch('/wallets/recent'),
};

/** Portfolio API endpoints */
export const portfolioApi = {
  get: (address: string, chainId?: number) =>
    apiFetch(`/portfolio?address=${address}${chainId ? `&chainId=${chainId}` : ''}`),
};

/** Airdrop API endpoints */
export const airdropApi = {
  eligibility: (address: string, chainId?: number) =>
    apiFetch(`/airdrop/eligibility?address=${address}${chainId ? `&chainId=${chainId}` : ''}`),
};
