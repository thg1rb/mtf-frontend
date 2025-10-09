import { Agent } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  CreateAgentRequest,
  CreateAgentResponse,
  UpdateAgentRequest,
  UpdateAgentResponse,
  GetAgentsRequest,
  GetAgentsResponse,
  GetAgentStatsResponse,
  DeleteAgentResponse,
  GetAgentResponse,
} from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: Agent Stats
export const getAgentStatsQueryOption = () => {
  return queryOptions({
    queryKey: ["agent-stats"],
    queryFn: getAgentStats,
  });
};

// GET: All Agents
export const getAgentsQueryOption = (params?: GetAgentsRequest) => {
  return queryOptions({
    queryKey: ["agents", params],
    queryFn: () => getAgents(params),
  });
};

// GET: Single Agent
export const getAgentQueryOption = (id: string) => {
  return queryOptions({
    queryKey: ["agents", id],
    queryFn: () => getAgent(id),
  });
};

// ============================================
// API Functions
// ============================================

// GET: Agent Statistics
const getAgentStats = async (): Promise<GetAgentStatsResponse> => {
  return apiClient.get<GetAgentStatsResponse>(ENDPOINTS.agents.statistics);
};

// GET: All Agents (with filters/pagination)
const getAgents = async (
  params?: GetAgentsRequest
): Promise<GetAgentsResponse> => {
  return apiClient.get<GetAgentsResponse>(ENDPOINTS.agents.base, params);
};

// GET: Single Agent by ID
const getAgent = async (id: string): Promise<GetAgentResponse> => {
  return apiClient.get<GetAgentResponse>(ENDPOINTS.agents.detail(id));
};

// POST: Create Agent
export const createAgent = async (
  data: CreateAgentRequest
): Promise<CreateAgentResponse> => {
  return apiClient.post<CreateAgentResponse>(ENDPOINTS.agents.create, data);
};

// PUT: Update Agent
export const updateAgent = async (
  id: string,
  data: UpdateAgentRequest
): Promise<UpdateAgentResponse> => {
  return apiClient.put<UpdateAgentResponse>(ENDPOINTS.agents.update(id), data);
};

// DELETE: Delete Agent
export const deleteAgent = async (id: string): Promise<DeleteAgentResponse> => {
  return apiClient.delete<DeleteAgentResponse>(ENDPOINTS.agents.delete(id));
};
