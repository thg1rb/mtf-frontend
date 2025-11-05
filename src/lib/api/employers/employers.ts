import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  CreateEmployerRequest,
  CreateEmployerResponse,
  UpdateEmployerRequest,
  UpdateEmployerResponse,
  GetEmployersRequest,
  GetEmployersResponse,
  GetEmployerStatsResponse,
  DeleteEmployerResponse,
  GetEmployerResponse,
  GetEmployerSelectsResponse,
} from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: Employer Stats
export const getEmployerStatsQueryOption = () => {
  return queryOptions({
    queryKey: ["employer-stats"],
    queryFn: getEmployerStats,
  });
};

// GET: All Employers
export const getEmployersQueryOption = (params?: GetEmployersRequest) => {
  return queryOptions({
    queryKey: ["employers", params],
    queryFn: () => getEmployers(params),
  });
};

// GET: ALL Employer Selects
export const getEmployerSelectsQueryOption = () => {
  return queryOptions({
    queryKey: ["employer-selects"],
    queryFn: getEmployerSelects,
  });
};

// GET: Single Employer
export const getEmployerQueryOption = (id: string) => {
  return queryOptions({
    queryKey: ["employers", id],
    queryFn: () => getEmployer(id),
  });
};

// ============================================
// API Functions
// ============================================

// GET: Employer Statistics
const getEmployerStats = async (): Promise<GetEmployerStatsResponse> => {
  return apiClient.get<GetEmployerStatsResponse>(
    ENDPOINTS.employers.statistics,
  );
};

// GET: All Employers (with filters/pagination)
const getEmployers = async (
  params?: GetEmployersRequest,
): Promise<GetEmployersResponse> => {
  return apiClient.get<GetEmployersResponse>(ENDPOINTS.employers.base, params);
};

// GET: All Employer Selects
const getEmployerSelects = async (): Promise<GetEmployerSelectsResponse> => {
  return apiClient.get<GetEmployerSelectsResponse>(ENDPOINTS.employers.selects);
};

// GET: Single Employer by ID
const getEmployer = async (id: string): Promise<GetEmployerResponse> => {
  return apiClient.get<GetEmployerResponse>(ENDPOINTS.employers.detail(id));
};

// POST: Create Employer
export const createEmployer = async (
  data: CreateEmployerRequest,
): Promise<CreateEmployerResponse> => {
  return apiClient.post<CreateEmployerResponse>(
    ENDPOINTS.employers.create,
    data,
  );
};

// PUT: Update Employer
export const updateEmployer = async (
  id: string,
  data: UpdateEmployerRequest,
): Promise<UpdateEmployerResponse> => {
  return apiClient.put<UpdateEmployerResponse>(
    ENDPOINTS.employers.update(id),
    data,
  );
};

// DELETE: Delete Employer
export const deleteEmployer = async (
  id: string,
): Promise<DeleteEmployerResponse> => {
  return apiClient.delete<DeleteEmployerResponse>(
    ENDPOINTS.employers.delete(id),
  );
};
