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
