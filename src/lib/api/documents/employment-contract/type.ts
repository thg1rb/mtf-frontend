/**
 * Employee API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface GetEmploymentContractHistoryRequest {
  passportNo: string;
  employerId: string;
  limit?: number;
  [key: string]: string | number | undefined; // Index signature for query params
}

export interface CreateEmploymentContractRequest {
  passportNo: string;
  employerId: string;
  typeOfWorkTh: string;
  typeOfWorkEn: string;
  incomePerDay: number;
  paidIncomeAt: number;
  employmentPeriodMonth: number;
  workingHourLimit: number;
  workingDayPerWeek: number;
  dayOffWeeklyTh: string;
  dayOffWeeklyEn: string;
  dayOffHolidayTh: string;
  dayOffHolidayEn: string;
  daysAnnualLeaveTh: string;
  daysAnnualLeaveEn: string;
  overtimeRateTh: string;
  overtimeRateEn: string;
  holidayOvertimeRateTh: string;
  holidayOvertimeRateEn: string;
}

// ============================================
// Response Types (Data received from API)
// ============================================

export type GetEmploymentContractHistoryResponse = {
  id: string;
  createdAt: string;
}[];

export interface GetEmploymentContractResponse {
  id: string;
  typeOfWorkTh: string;
  typeOfWorkEn: string;
  incomePerDay: number;
  paidIncomeAt: number;
  workingHourLimit: number;
  workingDayPerWeek: number;
  employmentPeriodMonth: number;
  dayOffWeeklyTh: string;
  dayOffWeeklyEn: string;
  dayOffHolidayTh: string;
  dayOffHolidayEn: string;
  daysAnnualLeaveTh: string;
  daysAnnualLeaveEn: string;
  overtimeRateTh: string;
  overtimeRateEn: string;
  holidayOvertimeRateTh: string;
  holidayOvertimeRateEn: string;
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

export interface CreateEmploymentContractResponse {
  documentId: string;
  message: string;
}
