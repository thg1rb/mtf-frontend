import type { User } from "@/lib/api/auth/types";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

// Token management
export const setAuthToken = (token: string): void => {
  // Use cookies for better security, expires in 1 day
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;
};

export const getAuthToken = (): string | null => {
  // Read token from cookies
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === AUTH_TOKEN_KEY) {
      return value || null;
    }
  }
  return null;
};

export const removeAuthToken = (): void => {
  // Remove token from cookies
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; secure; samesite=strict`;
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
};

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  return !!getAuthToken() && !!getAuthUser();
};