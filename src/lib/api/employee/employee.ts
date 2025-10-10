import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { GetEmployeeResponse, GetEmployeesRequest, GetEmployeesResponse, GetEmployeeStatsResponse } from "./types";

// ============================================
// Query Options (for React Query)
// ============================================

// GET: Employee Stats
export const getEmployeeStatsQueryOption = () => {
  return queryOptions({
    queryKey: ["employee-stats"],
    queryFn: getEmployeeStats,
  });
};

// GET: All Employees
export const getEmployeesQueryOption = (params?: GetEmployeesRequest) => {
  return queryOptions({
    queryKey: ["employees", params],
    queryFn: () => getEmployees(params),
  });
};

// GET: Single Employee
export const getEmployeeQueryOption = (passportNumber: string) => {
  return queryOptions({
    queryKey: ["employees", passportNumber],
    queryFn: () => getEmployee(passportNumber),
  });
};

// ============================================
// API Functions
// ============================================

// GET: Employee Statistics
const getEmployeeStats = async (): Promise<GetEmployeeStatsResponse> => {
  return apiClient.get<GetEmployeeStatsResponse>(
    ENDPOINTS.employees.statistics
  );
};

// GET: All Employees (with filters/pagination)
const getEmployees = async (
  params?: GetEmployeesRequest
): Promise<GetEmployeesResponse> => {
  return apiClient.get<GetEmployeesResponse>(ENDPOINTS.employees.base, params);
};

// GET: Single Employee By ID
const getEmployee = async (passportNumber: string): Promise<GetEmployeeResponse> => {
  return apiClient.get<GetEmployeeResponse>(ENDPOINTS.employees.detail(passportNumber));
};