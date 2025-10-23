import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import {
  GetWorksRequest,
  GetWorksResponse,
  GetWorkStatsResponse,
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
