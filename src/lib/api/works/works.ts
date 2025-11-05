import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import {
  CreateWorkRequest,
  CreateWorkResponse,
  GetWorksRequest,
  GetWorksResponse,
  GetWorkStatsResponse,
  GetWorkResponse,
} from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: Work Stats
export const getWorkStatsQueryOption = () => {
  return queryOptions({
    queryKey: ["work-stats"],
    queryFn: getWorkStats,
  });
};

// GET: All Works
export const getWorksQueryOption = (params?: GetWorksRequest) => {
  return queryOptions({
    queryKey: ["employers", params],
    queryFn: () => getWorks(params),
  });
};

// GET: Work by ID
export const getWorkQueryOption = (workId: string) => {
  return queryOptions({
    queryKey: ["work", workId],
    queryFn: () => getWork(workId),
  });
};

// ============================================
// Mutation Options (for React Query)
// ============================================

// Create Employee Mutation
export const createWorkMutationOptions = {
  mutationFn: (data: CreateWorkRequest) => createWork(data),
};

// ============================================
// API Functions
// ============================================

// GET: Employer Statistics
const getWorkStats = async (): Promise<GetWorkStatsResponse> => {
  return apiClient.get<GetWorkStatsResponse>(ENDPOINTS.works.statistics);
};

// GET: All Works (with filters/pagination)
const getWorks = async (
  params?: GetWorksRequest,
): Promise<GetWorksResponse> => {
  return apiClient.get<GetWorksResponse>(ENDPOINTS.works.base, params);
};

// POST: Create Employee
const createWork = async (
  data: CreateWorkRequest,
): Promise<CreateWorkResponse> => {
  return apiClient.post<CreateWorkResponse>(ENDPOINTS.works.create, data);
};

// GET: Work by ID
const getWork = async (workId: string): Promise<GetWorkResponse> => {
  return apiClient.get<GetWorkResponse>(ENDPOINTS.works.detail(workId));
};
