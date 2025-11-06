export interface NotPrintedReceipt {
  id: string;
  taskId: string;
  step: number;
  amount: number;
  status: "PAID" | "NOT_PAID";
  createdAt: Date | string;
  paidAt: Date | string | null;
  employerName?: string;
  typeOfTaskLabel?: string;
  employees?: Array<{
    passportNumber: string;
    fullName: string;
    nationality?: string;
  }>;
  agentName?: string;
  agentEmail?: string;
}

export interface PrintedReceipt {
  id: string;
  taskId: string;
  step: number;
  amount: number;
  reason: string;
  printCount: number;
  printDate: string;
  status: "PAID" | "NOT_PAID";
  createdAt: Date | string;
  paidAt: Date | string | null;
  employerName?: string;
  typeOfTaskLabel?: string;
  employees?: Array<{
    passportNumber: string;
    fullName: string;
    nationality?: string;
  }>;
  agentName?: string;
  agentEmail?: string;
}