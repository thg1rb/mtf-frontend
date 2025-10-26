/**
 * Agent API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface CreateAgentRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  address: {
    addrDetailTh: string;
    subDistrictTh: string;
    districtTh: string;
    provinceTh: string;
    postalCode: string;
  };
}

export interface UpdateAgentRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: "ACTIVE" | "INACTIVE";
  address?: {
    addrDetailTh?: string;
    subDistrictTh?: string;
    districtTh?: string;
    provinceTh?: string;
    postalCode?: string;
  };
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

export interface GetAgentResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  address: {
    id: string;
    addrDetailTh: string;
    subDistrictTh: string;
    districtTh: string;
    provinceTh: string;
    postalCode: string;
  };
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

export interface CreateAgentResponse {
  password: string;
  message: string;
  agentId: string;
}

export interface UpdateAgentResponse {
  agentId: string;
  message: string;
}
