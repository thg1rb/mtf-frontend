/**
 * Work API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface CreateWorkRequest {
  agentId: string;
  employerId: string;
  workType: "ขึ้นทะเบียนใหม่" | "ต่ออายุใบอนุญาตทำงาน";
  currentStepIndex: number;
  detail: string;
  employeeIds: string[];
}

export interface GetWorksRequest {
  size?: number;
  page?: number;
  employerName?: string;
  status?: "FINISHED" | "NOT_FINISHED";
  [key: string]: string | number | undefined; // Index signature for query params
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface CreateWorkResponse {
  message: string;
  workId: string;
}

export interface CompleteStepResponse {
  message: string;
  workId: string;
}

export interface GetWorkStatsResponse {
  totalWorks: number;
  finishedWorks: number;
  inProgressWorks: number;
}

export interface GetWorksResponse {
  content: {
    id: string;
    workType: "ขึ้นทะเบียนใหม่" | "ต่ออายุใบอนุญาตทำงาน";
    employerName: string;
    companyName: string;
    currentStep:
      | "รวบรวมเอกสารเพิ่มเติม"
      | "ตรวจสอบโรคและซื้อประกันสุขภาพ"
      | "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)"
      | "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)"
      | "ยื่น Calling Visa กับกรมแรงงาน"
      | "ซื้อใบอนุญาตการทำงานกับกรมแรงงาน"
      | "ตีซ่าตรวจคนเข้าเมือง";
    status: "FINISHED" | "NOT_FINISHED";
    updatedAt: string;
  }[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface GetWorkResponse {
  id: string;
  currentStepIndex: number;
  currentStep:
    | "รวบรวมเอกสารเพิ่มเติม"
    | "ตรวจสอบโรคและซื้อประกันสุขภาพ"
    | "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)"
    | "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)"
    | "ยื่น Calling Visa กับกรมแรงงาน"
    | "ซื้อใบอนุญาตการทำงานกับกรมแรงงาน"
    | "ตีซ่าตรวจคนเข้าเมือง";
  workType: "ขึ้นทะเบียนใหม่" | "ต่ออายุใบอนุญาตทำงาน";
  detail: string;
  status: "FINISHED" | "NOT_FINISHED";
  totalPrice: number;
  employer: {
    id: string;
    fullName: string;
    companyName: string;
    phoneNumber: string;
  };
  employeesInWork: {
    passportNumber: string;
    fullName: string;
    nationality: "เมียนมา" | "กัมพูชา" | "ลาว";
  }[];
  agent: {
    id: string;
    fullName: string;
    email: string;
  };
}
