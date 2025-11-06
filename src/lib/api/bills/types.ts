/**
 * Bills API Request/Response Types (DTOs)
 * These types are specifically for API communication
 */

// ============================================
// Request Types (Payloads sent to API)
// ============================================

export interface GetBillDetailsRequest {
  workId?: string;
  stepIndex?: number;
  [key: string]: string | number | undefined; // Index signature for query params
}

export interface PostPrintedBillRequest {
  agentId: string;
  reason: string;
}

// ============================================
// Response Types (Data received from API)
// ============================================

export interface BillResponse {
  id: string;
  stepIndex: number;
  stepName: string;
  price: number;
  status: "NOT_PAID" | "PAID";
  createdAt: string;
  paidAt: string | null;
  workId: string;
}

export interface PostPrintedBillResponse {
  bill: {
    id: string;
    stepIndex: number;
    stepName: string;
    price: number;
    status: "NOT_PAID" | "PAID";
    createdAt: string;
    paidAt: string | null;
    workId: string;
    printCount: number;
    lastPrintedAt: string;
    printStatus: "NOT_PRINTED" | "PRINTED" | "REPRINTED";
  };
  printRound: number;
  printedAt: string;
  printedByAgentName: string;
  printReason: string;
}

export interface PayBillResponse {
  work: {
    id: string;
    currentStepIndex: number;
    currentStepName: string;
    workType: "ขึ้นทะเบียนใหม่" | "ต่ออายุใบอนุญาตทำงาน";
    detail: string;
    status: "FINISHED" | "NOT_FINISHED";
    totalPrice: number;
    employerId: string;
    underRespAgent: string;
  };
  bill: BillResponse;
}

export interface GetBillsRequest {
  size?: number;
  page?: number;
  billId?: string;
  employerName?: string;
  paymentStatus?: "PAID" | "NOT_PAID";
  [key: string]: string | number | undefined; // Index signature for query params
}

export interface BillListItem {
  billId: string;
  employerName: string;
  workType: "ขึ้นทะเบียนใหม่" | "ต่ออายุใบอนุญาตทำงาน";
  stepIndex: number;
  stepName:
    | "รวบรวมเอกสารเพิ่มเติม"
    | "ตรวจสอบโรคและซื้อประกันสุขภาพ"
    | "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)"
    | "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)"
    | "ยื่น Calling Visa กับกรมแรงงาน"
    | "ซื้อใบอนุญาตการทำงานกับกรมแรงงาน"
    | "ตีซ่าตรวจคนเข้าเมือง";
  price: number;
  paymentStatus: "PAID" | "NOT_PAID";
}

export interface GetBillsResponse {
  content: BillListItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface BillStatsResponse {
  totalBills: number;
  paidBills: number;
  unpaidBills: number;
}
