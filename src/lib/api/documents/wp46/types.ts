/**
 * Employee API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface GetWorkPermit46HistoryRequest {
  passportNo: string;
  employerId: string;
  limit?: number;
  [key: string]: string | number | undefined; // Index signature for query params
}

export interface CreateWorkPermit46Request {
  passportNo: string;
  employerId: string;
  documentInput: {
    typeOfWork: string;
    natureOfWork: string;
    empYear: number;
    empMonth: number;
    empDay: number;
    empValidUntil: string;
    incomePerDay: number;
    benefitPerDay: number;
    highestEdu: string;
    workExp: number;
    reasonNotEmpTh: string;
  };
}

// ============================================
// Response Types (Data received from API)
// ============================================

export type GetWorkPermit46HistoryResponse = {
  id: string;
  createdAt: string;
}[];

export interface GetWorkPermit46Response {
  id: string;
  typeOfWork: string;
  natureOfWork: string;
  periodOfEmploymentYear: number;
  periodOfEmploymentMonth: number;
  periodOfEmploymentDay: number;
  employmentValidUntil: string;
  incomePerDay: number;
  benefitPerDay: number;
  highestEducation: string;
  workExperience: number;
  reasonForNotEmployingThaiPerson: string;
  createdAt: string;
  employeeSnapshot: {
    status: "ACTIVE" | "INACTIVE";
    address: {
      id: string;
      districtEn: string;
      districtTh: string;
      postalCode: string;
      provinceEn: string;
      provinceTh: string;
      addrDetailEn: string;
      addrDetailTh: string;
      subDistrictEn: string;
      subDistrictTh: string;
    };
    lastname: string;
    bloodType: "A" | "B" | "AB" | "O";
    firstname: string;
    nationality: "เมียนมา" | "กัมพูชา" | "ลาว";
    passportNumber: string;
  };
  employerSnapshot: {
    id: string;
    email: string;
    status: "ACTIVE" | "INACTIVE";
    address: {
      id: string;
      districtEn: string;
      districtTh: string;
      postalCode: string;
      provinceEn: string;
      provinceTh: string;
      addrDetailEn: string;
      addrDetailTh: string;
      subDistrictEn: string;
      subDistrictTh: string;
    };
    lastname: string;
    firstname: string;
    companyName: string;
    phoneNumber: string;
    businessType: string;
    currentIncome: number;
    incomeDuration: number;
    financialStatusTax: number;
    financialStatusYear: number;
    financialStatusIncome: number;
  };
}

export interface CreateWorkPermit46Response {
  documentId: string;
  message: string;
}
