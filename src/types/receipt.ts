export interface Receipt {
  id: string;
  taskId: string;
  step: number;
  amount: number;
  status: "PAID" | "UNPAID";
  paymentMethod: "cash" | "transfer" | "promptpay" | null;
  createdAt: Date | string;
  paidAt: Date | string | null;
}
