"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { AuthContextType, AuthState, User } from "@/lib/api/auth/types";
import { loginQueryOption } from "@/lib/api/auth/auth";
import {
  setAuthToken,
  getAuthToken,
  setAuthUser,
  getAuthUser,
  clearAuthData,
} from "@/lib/auth/storage";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Initialize auth state from storage
  useEffect(() => {
    const token = getAuthToken();
    const user = getAuthUser();

    if (token && user) {
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      // Clear any invalid auth data
      clearAuthData();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const loginMutation = useMutation({
    ...loginQueryOption(),
    onSuccess: (data) => {
      // Store token and user data
      setAuthToken(data.token);

      const user: User = {
        id: data.agentId,
        fullname: data.fullname,
        email: data.email,
        role: data.role,
        status: data.status,
      };

      setAuthUser(user);

      // Update auth state
      setAuthState({
        user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      // Redirect based on role
      if (data.role === "ADMIN") {
        router.push("/agents");
      } else if (data.role === "AGENT") {
        router.push("/employers");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    },
  });

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = (): void => {
    clearAuthData();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    router.push("/");
  };

  const refreshToken = async (): Promise<void> => {
    // TODO: Implement token refresh logic if needed
    // For now, just check if current token is still valid
    const token = getAuthToken();
    const user = getAuthUser();

    if (!token || !user) {
      logout();
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
