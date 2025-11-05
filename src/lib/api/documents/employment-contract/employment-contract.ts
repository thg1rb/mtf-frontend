import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../../client";
import { ENDPOINTS } from "../../endpoints";
import { 
  CreateEmploymentContractRequest, 
  CreateEmploymentContractResponse, 
  GetEmploymentContractHistoryRequest, 
  GetEmploymentContractHistoryResponse, 
  GetEmploymentContractResponse 
} from "./type";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: All Employment Contracts History
export const getEmploymentContractHistoryQueryOption = (params?: GetEmploymentContractHistoryRequest) => {
  return queryOptions({
    queryKey: ["employment-contract-history", params],
    queryFn: () => getEmploymentContractHistory(params),
  });
};

// GET: Single Employment Contract
export const getEmploymentContractQueryOption = (id: string) => {
  return queryOptions({
    queryKey: ["employment-contract", id],
    queryFn: () => getEmploymentContract(id),
    enabled: !!id,
  });
};

// ============================================
// Mutation Options (for React Query)
// ============================================

// POST: Create Employment Contract Mutation
export const createEmploymentContractMutationOptions = {
  mutationFn: (data: CreateEmploymentContractRequest) => createEmploymentContract(data),
};

// ============================================
// API Functions
// ============================================

// GET: All Employment Contracts By Passport Number and Employer ID
const getEmploymentContractHistory = async (
  params?: GetEmploymentContractHistoryRequest
): Promise<GetEmploymentContractHistoryResponse> => {
  return apiClient.get<GetEmploymentContractHistoryResponse>(ENDPOINTS.employmentContracts.history, params);
};

// GET: Single Employment Contract By Contract Id
const getEmploymentContract = async (id: string): Promise<GetEmploymentContractResponse> => {
  return apiClient.get<GetEmploymentContractResponse>(ENDPOINTS.employmentContracts.detail(id));
};

// POST: Create Employment Contract
export const createEmploymentContract = async (
  data: CreateEmploymentContractRequest
): Promise<CreateEmploymentContractResponse> => {
  return apiClient.post<CreateEmploymentContractResponse>(ENDPOINTS.employmentContracts.create, data);
};
