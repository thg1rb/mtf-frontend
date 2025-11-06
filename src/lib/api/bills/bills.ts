import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import {
  BillResponse,
  GetBillDetailsRequest,
  PayBillResponse,
  GetBillsRequest,
  GetBillsResponse,
  BillStatsResponse,
  PostPrintedBillResponse,
  PostPrintedBillRequest,
} from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: Bill by ID
export const getBillByIdQueryOption = (billId: string) => {
  return queryOptions({
    queryKey: ["bill", billId],
    queryFn: () => getBillById(billId),
  });
};

// GET: Bill Details by Work ID and optional Step Index
export const getBillDetailsQueryOption = (params?: GetBillDetailsRequest) => {
  return queryOptions({
    queryKey: ["bill-details", params],
    queryFn: () => getBillDetails(params),
  });
};

// GET: All Bills with pagination and filters
export const getBillsQueryOption = (params?: GetBillsRequest) => {
  return queryOptions({
    queryKey: ["bills", params],
    queryFn: () => getBills(params),
  });
};

// GET: Bills Statistics
export const getBillStatsQueryOption = () => {
  return queryOptions({
    queryKey: ["bill-stats"],
    queryFn: getBillStats,
  });
};

// ============================================
// Mutation Options (for React Query)
// ============================================

// Pay Bill Mutation
export const payBillMutationOptions = {
  mutationFn: (billId: string) => payBillById(billId),
};

// Printed Bill Mutation
export const printedBillMutationOptions = {
  mutationFn: (agentId: string, data: PostPrintedBillRequest) =>
    postPrintedBillById(agentId, data),
};

// ============================================
// API Functions
// ============================================

// GET: Bill by ID
const getBillById = async (billId: string): Promise<BillResponse> => {
  return apiClient.get<BillResponse>(ENDPOINTS.bills.detail(billId));
};

// GET: Bill Details by Work ID and optional Step Index
const getBillDetails = async (
  params?: GetBillDetailsRequest
): Promise<BillResponse[]> => {
  return apiClient.get<BillResponse[]>(ENDPOINTS.bills.details, params);
};

// POST: Print Bill by ID
export const postPrintedBillById = async (
  billId: string,
  data: PostPrintedBillRequest
): Promise<PostPrintedBillResponse> => {
  return apiClient.post<PostPrintedBillResponse>(
    ENDPOINTS.bills.print(billId),
    data
  );
};

// POST: Pay Bill by ID
const payBillById = async (billId: string): Promise<PayBillResponse> => {
  return apiClient.post<PayBillResponse>(ENDPOINTS.bills.pay(billId));
};

// GET: All Bills with pagination and filters
const getBills = async (
  params?: GetBillsRequest
): Promise<GetBillsResponse> => {
  return apiClient.get<GetBillsResponse>(ENDPOINTS.bills.base, params);
};

// GET: Bills Statistics
const getBillStats = async (): Promise<BillStatsResponse> => {
  return apiClient.get<BillStatsResponse>(ENDPOINTS.bills.statistics);
};
