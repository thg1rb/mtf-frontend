export const API_CONFIG = {
  // Base URL - changes based on environment
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',

  // Request timeout (10 seconds)
  timeout: 10000,

  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

// Environment helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
