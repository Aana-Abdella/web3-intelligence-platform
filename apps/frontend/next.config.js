const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',
  
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@web3-intelligence/shared'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

module.exports = nextConfig;
