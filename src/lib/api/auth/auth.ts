import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  LoginRequest,
  LoginResponse,
} from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// POST: Login
export const loginQueryOption = () => {
  return {
    mutationFn: (data: LoginRequest) => login(data),
  };
};

// ============================================
// API Functions
// ============================================

// POST: Login
const login = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse>(ENDPOINTS.auth.login, data);
};