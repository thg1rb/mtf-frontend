import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../../client";
import { ENDPOINTS } from "../../endpoints";
import { CreateWorkPermit46Request, CreateWorkPermit46Response, GetWorkPermit46HistoryRequest, GetWorkPermit46HistoryResponse } from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: All Work Permits 46
export const getWorkPermit46HistoryQueryOption = (params?: GetWorkPermit46HistoryRequest) => {
  return queryOptions({
    queryKey: ["wp46-history", params],
    queryFn: () => getWorkPermit46History(params),
  });
};

// ============================================
// API Functions
// ============================================

// GET: All Work Permits 46 By Passport Number and Employer ID
const getWorkPermit46History = async (
  params?: GetWorkPermit46HistoryRequest
): Promise<GetWorkPermit46HistoryResponse> => {
  return apiClient.get<GetWorkPermit46HistoryResponse>(ENDPOINTS.workPermits46.history, params);
};

// POST: Create Work Permit 46
export const createWorkPermit46 = async (
  data: CreateWorkPermit46Request
): Promise<CreateWorkPermit46Response> => {
  return apiClient.post<CreateWorkPermit46Response>(ENDPOINTS.workPermits46.create, data);
};