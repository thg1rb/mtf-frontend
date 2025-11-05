import type { User } from "@/lib/api/auth/types";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const TOKEN_TIMESTAMP_KEY = "auth_token_timestamp";

// Token management
export const setAuthToken = (token: string): void => {
  // Use cookies for better security, expires in 1 day (persistent across browser sessions)
  const isSecure = process.env.NODE_ENV === 'production';
  const sameSite = process.env.NODE_ENV === 'production' ? 'strict' : 'lax';
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24}; ${isSecure ? 'secure;' : ''} samesite=${sameSite};`;

  // Store token creation timestamp for expiration checking
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
};

export const getAuthToken = (): string | null => {
  // Read token from cookies
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === AUTH_TOKEN_KEY) {
      // Check if token has expired (1 day = 24 * 60 * 60 * 1000 ms)
      const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
      if (timestamp) {
        const tokenAge = Date.now() - parseInt(timestamp);
        const oneDayMs = 24 * 60 * 60 * 1000;
        if (tokenAge > oneDayMs) {
          // Token expired, clear it
          clearAuthData();
          return null;
        }
      }
      return value || null;
    }
  }
  return null;
};

export const removeAuthToken = (): void => {
  // Remove token from cookies
  const isSecure = process.env.NODE_ENV === 'production';
  const sameSite = process.env.NODE_ENV === 'production' ? 'strict' : 'lax';
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; ${isSecure ? 'secure;' : ''} samesite=${sameSite};`;
};

// User data management
export const setAuthUser = (user: User): void => {
  // Store user data in localStorage (non-sensitive info only)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const removeAuthUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// Clear all auth data
export const clearAuthData = (): void => {
  removeAuthToken();
  removeAuthUser();
  localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
};

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  return !!getAuthToken() && !!getAuthUser();
};