export interface Receipt {
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
