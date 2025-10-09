/**
 * Agent API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

import { Agent } from "@/types";

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface CreateAgentRequest {
  citizenId: string;
  email: string;
  firstname: string;
  lastname: string;
  addressDetails: string;
  subDistrict: string;
  district: string;
  province: string;
  postelCode: string;
  // Note: status is set by backend, not in create request
}

export interface UpdateAgentRequest {
  email?: string;
  firstname?: string;
  lastname?: string;
  status?: "active" | "inactive";
  addressDetails?: string;
  subDistrict?: string;
  district?: string;
  province?: string;
  postelCode?: string;
  // Note: All fields optional for partial updates
}

export interface GetAgentsRequest {
  page?: number;
  size?: number;
  fullName?: string;
  status?: "ACTIVE" | "INACTIVE";
  [key: string]: string | number | undefined; // Index signature for query params
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface GetAgentStatsResponse {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
}

export interface GetAgentsResponse {
  content: {
    id: string;
    fullName: string;
    email: string;
    status: "ACTIVE" | "INACTIVE";
  }[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface CreateAgentResponse extends Agent {
  // Can extend if API returns additional fields on creation
}

export interface UpdateAgentResponse extends Agent {
  // Can extend if API returns additional fields on update
}

export interface DeleteAgentResponse {
  success: boolean;
  message: string;
}
