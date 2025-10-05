import { Receipt, TableHeader } from "@/types";

export const receiptTableHeaders: TableHeader[] = [
  {
    index: "header-1",
    headerName: "เลขที่ใบเสร็จ",
  },
  {
    index: "header-2",
    headerName: "นายจ้าง",
  },
  {
    index: "header-3",
    headerName: "ประเภทงาน",
  },
  {
    index: "header-4",
    headerName: "จำนวนเงิน",
  },
  {
    index: "header-5",
    headerName: "สถานะ",
  },
];

export const mockReceipts: Receipt[] = [
  // TSK001 - register (4 steps total, completed 3)
  {
    id: "RCP001-1",
    taskId: "TSK001",
    step: 1,
    amount: 15000,
    status: "paid",
    paymentMethod: "transfer",
    createdAt: new Date("2024-09-15"),
    paidAt: new Date("2024-09-16"),
  },
  {
    id: "RCP001-2",
    taskId: "TSK001",
    step: 2,
    amount: 15000,
    status: "paid",
    paymentMethod: "cash",
    createdAt: new Date("2024-09-22"),
    paidAt: new Date("2024-09-23"),
  },
  {
    id: "RCP001-3",
    taskId: "TSK001",
    step: 3,
    amount: 15000,
    status: "paid",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-09-30"),
    paidAt: new Date("2024-10-01"),
  },
  {
    id: "RCP001-4",
    taskId: "TSK001",
    step: 4,
    amount: 15000,
    status: "unpaid",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-09-30"),
    paidAt: new Date("2024-10-01"),
  },
];

export const getReceipts = (): Receipt[] => mockReceipts;

export const getReceiptById = (id: string) =>
  mockReceipts.find((receipt) => receipt.id === id);

export const getReceiptsByTaskId = (id: string) =>
  mockReceipts.filter((receipt) => receipt.taskId === id);

export const isPaidByTaskIdAndStep = (
  id: string,
  currentStep: number
): boolean =>
  getReceiptsByTaskId(id).find((receipt) => receipt.step === currentStep)
    ?.status === "paid";
