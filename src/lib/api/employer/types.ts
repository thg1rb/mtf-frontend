/**
 * Employer API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

import { Employer } from "@/types";

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface CreateEmployerRequest {
  taxId: string;
  firstname: string;
  lastname: string;
  companyName: string;
  businessType: string;
  phoneNumber: string;
  email: string;
  financialStatusYear: number;
  financialStatusIncome: number;
  financialStatusTax: number;
  currentIncome: number;
  currentIncomeDuration: number;
  addressDetailsTh: string;
  addressDetailsEn: string;
  districtTh: string;
  districtEn: string;
  subDistrictTh: string;
  subDistrictEn: string;
  provinceTh: string;
  provinceEn: string;
  postalCode: string;
  // Note: status is set by backend, not in create request
}

export interface UpdateEmployerRequest {
  firstname?: string;
  lastname?: string;
  companyName?: string;
  businessType?: string;
  phoneNumber?: string;
  email?: string;
  financialStatusYear?: number;
  financialStatusIncome?: number;
  financialStatusTax?: number;
  currentIncome?: number;
  currentIncomeDuration?: number;
  addressDetailsTh?: string;
  addressDetailsEn?: string;
  districtTh?: string;
  districtEn?: string;
  subDistrictTh?: string;
  subDistrictEn?: string;
  provinceTh?: string;
  provinceEn?: string;
  postalCode?: string;
  status?: "ACTIVE" | "INACTIVE";
  // Note: All fields optional for partial updates
}

export interface GetEmployersRequest {
  size?: number;
  page?: number;
  nameContains?: string;
  status?: "ACTIVE" | "INACTIVE";
  [key: string]: string | number | undefined; // Index signature for query params
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface GetEmployerStatsResponse {
  totalEmployers: number;
  activeEmployers: number;
  inactiveEmployers: number;
}

export interface GetEmployerResponse {
  taxId: string;
  firstname: string;
  lastname: string;
  companyName: string;
  businessType: string;
  phoneNumber: string;
  email: string;
  financialStatusYear: number;
  financialStatusIncome: number;
  financialStatusTax: number;
  currentIncome: number;
  currentIncomeDuration: number;
  status: "ACTIVE" | "INACTIVE";
  address: {
    addrDetailTh: string;
    addrDetailEn: string;
    districtTh: string;
    districtEn: string;
    subDistrictTh: string;
    subDistrictEn: string;
    provinceTh: string;
    provinceEn: string;
    postalCode: string;
  };
}

export interface GetEmployersResponse {
  content: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    activeEmployeeCount: number;
    status: "ACTIVE" | "INACTIVE";
  }[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface CreateEmployerResponse extends Employer {
  // Can extend if API returns additional fields on creation
}

export interface UpdateEmployerResponse extends Employer {
  // Can extend if API returns additional fields on update
}

export interface DeleteEmployerResponse {
  success: boolean;
  message: string;
}
