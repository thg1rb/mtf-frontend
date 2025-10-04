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
  {
    id: "RCP001",
    taskId: "TSK001",
    amount: 15000,
    status: "paid",
    paymentMethod: "transfer",
    createdAt: new Date("2024-09-15"),
    paidAt: new Date("2024-09-20"),
  },
  {
    id: "RCP002",
    taskId: "TSK002",
    amount: 22500,
    status: "paid",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-08-20"),
    paidAt: new Date("2024-08-25"),
  },
  {
    id: "RCP003",
    taskId: "TSK003",
    amount: 22500,
    status: "unpaid",
    paymentMethod: null,
    createdAt: new Date("2024-07-10"),
    paidAt: null,
  },
  {
    id: "RCP004",
    taskId: "TSK004",
    amount: 22500,
    status: "paid",
    paymentMethod: "cash",
    createdAt: new Date("2024-06-01"),
    paidAt: new Date("2024-06-05"),
  },
  {
    id: "RCP005",
    taskId: "TSK005",
    amount: 15000,
    status: "unpaid",
    paymentMethod: null,
    createdAt: new Date("2024-05-15"),
    paidAt: null,
  },
  {
    id: "RCP006",
    taskId: "TSK006",
    amount: 22500,
    status: "paid",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-04-01"),
    paidAt: new Date("2024-05-02"),
  },
  {
    id: "RCP007",
    taskId: "TSK007",
    amount: 22500,
    status: "paid",
    paymentMethod: "transfer",
    createdAt: new Date("2024-03-20"),
    paidAt: new Date("2024-04-20"),
  },
  {
    id: "RCP008",
    taskId: "TSK008",
    amount: 22500,
    status: "paid",
    paymentMethod: "cash",
    createdAt: new Date("2024-02-15"),
    paidAt: new Date("2024-03-05"),
  },
  {
    id: "RCP009",
    taskId: "TSK009",
    amount: 22500,
    status: "paid",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-01-30"),
    paidAt: new Date("2024-02-28"),
  },
  {
    id: "RCP010",
    taskId: "TSK010",
    amount: 22500,
    status: "unpaid",
    paymentMethod: null,
    createdAt: new Date("2024-01-10"),
    paidAt: null,
  },
  {
    id: "RCP011",
    taskId: "TSK011",
    amount: 15000,
    status: "unpaid",
    paymentMethod: null,
    createdAt: new Date("2024-10-01"),
    paidAt: null,
  },
];

export const getReceipts = (): Receipt[] => mockReceipts;

export const getReceiptById = (id: string) =>
  mockReceipts.find((receipt) => receipt.id === id);
