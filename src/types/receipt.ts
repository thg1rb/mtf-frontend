export interface Receipt {
  id: string;
  taskId: string;
  amount: number;
  status: "paid" | "unpaid";
  paymentMethod: "cash" | "transfer" | "promptpay" | null;
  createdAt: Date | string;
  paidAt: Date | string | null;
}
