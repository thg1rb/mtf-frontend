"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "AGENT";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/");
      return;
    }

    // If authenticated but doesn't have required role, redirect to login
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push("/");
      return;
    }

    // If authenticated but account is inactive, redirect to login
    if (!isLoading && isAuthenticated && user?.status !== "ACTIVE") {
      router.push("/");
      return;
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have permission
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole) || user?.status !== "ACTIVE") {
    return null;
  }

  return <>{children}</>;
};