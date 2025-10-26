/**
 * Employer API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface CreateEmployerRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  companyName: string;
  status: "ACTIVE" | "INACTIVE";
  financialStatusYear: number;
  financialStatusIncome: number;
  financialStatusTax: number;
  currentIncome: number;
  incomeDuration: number;
  address: {
    addrDetailTh: string;
    districtTh: string;
    subDistrictTh: string;
    provinceTh: string;
    postalCode: string;
    addrDetailEn: string;
    districtEn: string;
    subDistrictEn: string;
    provinceEn: string;
  };
}

export interface UpdateEmployerRequest {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  businessType?: string;
  phoneNumber?: string;
  email?: string;
  status?: "ACTIVE" | "INACTIVE";
  financialStatusYear?: number;
  financialStatusIncome?: number;
  financialStatusTax?: number;
  currentIncome?: number;
  incomeDuration?: number;
  address: {
    addrDetailTh?: string;
    districtTh?: string;
    subDistrictTh?: string;
    provinceTh?: string;
    postalCode?: string;
    addrDetailEn?: string;
    districtEn?: string;
    subDistrictEn?: string;
    provinceEn?: string;
  };
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
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  companyName: string;
  status: "ACTIVE" | "INACTIVE";
  financialStatusYear: number;
  financialStatusIncome: number;
  financialStatusTax: number;
  currentIncome: number;
  incomeDuration: number;
  address: {
    id: string;
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

export type GetEmployerSelectsResponse = {
  id: string;
  fullName: string;
}[];

export interface CreateEmployerResponse {
  message: string;
  employerId: string;
}

export interface UpdateEmployerResponse {
  message: string;
  employerId: string;
}
export interface DeleteEmployerResponse {
  success: boolean;
  message: string;
}
