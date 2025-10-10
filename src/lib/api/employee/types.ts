/**
 * Employee API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface GetEmployeesRequest {
  size?: number;
  page?: number;
  nameContains?: string;
  status?: "ACTIVE" | "INACTIVE";
  [key: string]: string | number | undefined; // Index signature for query params
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface GetEmployeeStatsResponse {
  totalEmployees: number;
  validDocumentEmployees: number;
  expiringSoonEmployees: number;
  expiredDocumentEmployees: number;
}

export interface GetEmployeesResponse {
  content: {
    passportNumber: string;
    fullName: string;
    currentEmployer: string;
    status: "ACTIVE" | "INACTIVE";
    documentStatuses: {
      ใบรับรองแพทย์: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
      ใบอนุญาตทำงาน: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
      ประกันสุขภาพ: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
      "เอกสาร CI": "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
      บัตรชมพู: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
    };
  }[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface GetEmployeeResponse {
  passportNumber: string;
  firstname: string;
  lastname: string;
  nationality: "เมียนมา" | "ลาว" | "กัมพูชา";
  bloodType: "A" | "B" | "AB" | "O";
  status: "ACTIVE" | "INACTIVE";
  address: {
    id: string;
    addrDetailTh: string;
    subDistrictTh: string;
    districtTh: string;
    provinceTh: string;
    postalCode: string;
  };
  documents: {
    id: string;
    type: string;
    expiryDate: string;
  }[];
  currentEmployer: {
    employerId: string;
    fullName: string;
    companyName: string;
  };
}
