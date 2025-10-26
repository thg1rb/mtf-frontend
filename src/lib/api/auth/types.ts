/**
 * Authentication API Request/Response Types
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface LoginResponse {
  token: string;
  agentId: string;
  fullname: string;
  email: string;
  role: "ADMIN" | "AGENT";
  status: "ACTIVE" | "INACTIVE";
}

// ============================================
// Auth State Types (for internal use)
// ============================================

export interface User {
  id: string; // agentId
  fullname: string;
  email: string;
  role: "ADMIN" | "AGENT";
  status: "ACTIVE" | "INACTIVE";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}