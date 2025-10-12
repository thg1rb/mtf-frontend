import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { CreateEmployeeRequest, CreateEmployeeResponse, GetEmployeeResponse, GetEmployeesRequest, GetEmployeesResponse, GetEmployeeStatsResponse, UpdateEmployeeRequest, UpdateEmployeeResponse } from "./types";

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
// Mutation Options (for React Query)
// ============================================

// Create Employee Mutation
export const createEmployeeMutationOptions = {
  mutationFn: (data: CreateEmployeeRequest) => createEmployee(data),
};

// Update Employee Mutation
export const updateEmployeeMutationOptions = {
  mutationFn: (data: { id: string; payload: UpdateEmployeeRequest }) =>
    updateEmployee(data.id, data.payload),
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

// POST: Create Employee
export const createEmployee = async (
  data: CreateEmployeeRequest
): Promise<CreateEmployeeResponse> => {
  return apiClient.post<CreateEmployeeResponse>(ENDPOINTS.employees.create, data);
};

// PUT: Update Employee
export const updateEmployee = async (
  id: string,
  data: UpdateEmployeeRequest
): Promise<UpdateEmployeeResponse> => {
  return apiClient.put<UpdateEmployeeResponse>(ENDPOINTS.employees.update(id), data);
};