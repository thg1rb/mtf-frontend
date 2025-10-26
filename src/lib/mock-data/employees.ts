import { TableHeader } from "@/types";

export const employeeTableHeaders: TableHeader[] = [
  {
    index: "header-1",
    headerName: "ชื่อ-นามสกุล",
    className: "text-left",
  },
  {
    index: "header-2",
    headerName: "นายจ้าง",
    className: "text-left",
  },
  {
    index: "header-3",
    headerName: "ใบรับรองแพทย์",
    className: "text-center",
  },
  {
    index: "header-4",
    headerName: "ประกันสุขภาพ",
    className: "text-center",
  },
  {
    index: "header-5",
    headerName: "ใบอนุญาตทำงาน",
    className: "text-center",
  },
  {
    index: "header-6",
    headerName: "เอกสาร CI",
    className: "text-center",
  },
  {
    index: "header-7",
    headerName: "บัตรชมพู",
    className: "text-center",
  },
  {
    index: "header-8",
    headerName: "สถานะ",
    className: "text-center",
  },
  {
    index: "header-9",
    headerName: "ดำเนินการ",
    className: "text-right",
  },
];

export const selectEmployeeTableHeaders: TableHeader[] = [
  {
    index: "header-1",
    headerName: "เลือกลูกจ้าง",
    className: "",
  },
  {
    index: "header-2",
    headerName: "ชื่อ-นามสกุล",
    className: "",
  },
  {
    index: "header-3",
    headerName: "สถานะ",
    className: "text-center",
  },
  {
    index: "header-4",
    headerName: "ดำเนินการ",
    className: "text-right",
  },
];
