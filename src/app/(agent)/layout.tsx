"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="AGENT">
      {children}
    </ProtectedRoute>
  );
}