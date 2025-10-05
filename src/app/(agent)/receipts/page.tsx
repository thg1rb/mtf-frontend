"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import StatGrid from "@/components/shared/StatGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  countActiveEmployers,
  countInactiveEmployers,
  countTotalEmployers,
  getReceipts,
  receiptTableHeaders,
  getTaskById,
  getCurrentStep,
  getTypeOfTaskLabelAndSteps,
  getEmployerFullNameByEmployerId,
} from "@/lib/mock-data";
import { Receipt } from "@/types";
import {
  CircleCheck,
  CircleCheckBig,
  Loader,
  ReceiptText,
  Search,
  TriangleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statItems = [
  {
    id: "stat-1",
    title: "ใบเสร็จทั้งหมด (ใบ)",
    amount: countTotalEmployers(), // TODO: GET method `/api/employers`
    amountTextColor: "text-black",
    icon: ReceiptText,
  },
  {
    id: "stat-2",
    title: "ใบเสร็จที่ชำระแล้ว (ใบ)",
    amount: countActiveEmployers(), // TODO: GET method `/api/employers/active`
    amountTextColor: "text-green-500",
    icon: CircleCheck,
  },
  {
    id: "stat-3",
    title: "ใบเสร็จที่รอการชำระ (ใบ)",
    amount: countInactiveEmployers(), // TODO: GET method `/api/employers/inactive`
    amountTextColor: "text-yellow-400",
    icon: Loader,
  },
];

export default function ReceiptsPage() {
  const router = useRouter();
  const [receipts] = useState<Receipt[]>(() => getReceipts());
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="จัดการใบเสร็จ" desc="ข้อมูลใบเสร็จทั้งหมดในระบบ" />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      {/* TODO: Pagination */}
      {/* TODO: filter agents by search or status */}
      <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <p className="font-normal">ค้นหาใบเสร็จ</p>
          <p className="font-light">ค้นหาจากส่วนหนึ่งของหมายเลขใบเสร็จ</p>
        </div>
        <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="ค้นหาจากใบเสร็จที่ต้องการ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="font-light cursor-pointer">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid" className="font-light cursor-pointer">
                ชำระแล้ว
              </SelectItem>
              <SelectItem value="unpaid" className="font-light cursor-pointer">
                รอการชำระ
              </SelectItem>
            </SelectContent>
          </Select>
          <Button className="font-light cursor-pointer">ค้นหา</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {receiptTableHeaders.map((tableHeader) => (
                  <TableHead
                    key={tableHeader.index}
                    className={`font-normal px-[20px] ${
                      tableHeader.index === "header-5" ? "text-right" : ""
                    }`}
                  >
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => {
                const task = getTaskById(receipt.taskId);

                if (task !== undefined) {
                  return (
                    <TableRow
                      key={receipt.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/receipts/${receipt.id}`)}
                    >
                      <TableCell className="font-light px-[20px]">
                        {receipt.id}
                      </TableCell>
                      <TableCell className="font-light px-[20px]">
                        {getEmployerFullNameByEmployerId(task.employerId)}
                        ชื่อนายจ้าง
                      </TableCell>
                      <TableCell className="font-light px-[20px]">
                        <div className="flex flex-col">
                          <p className="font-light">
                            {getTypeOfTaskLabelAndSteps(task.typeOfTask).label}
                          </p>
                          <p className="font-light text-zinc-400">
                            ขั้นตอนที่: {getCurrentStep(task.stepCompletedDates)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-light px-[20px]">
                        ฿ {receipt.amount.toLocaleString("th-TH")}
                      </TableCell>
                      <TableCell className="px-[20px] text-right">
                        <Badge
                          className={`w-[100px] ${
                            receipt.status === "paid"
                              ? "bg-green-200 text-green-700"
                              : "bg-yellow-100 text-red-700"
                          } font-light`}
                        >
                          <div className="flex flex-row items-center gap-x-[5px]">
                            {receipt.status === "paid" ? (
                              <CircleCheckBig size={12} />
                            ) : (
                              <TriangleAlert size={12} />
                            )}{" "}
                            {receipt.status === "paid" ? "ชำระแล้ว" : "รอชำระ"}
                          </div>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-row justify-between items-center">
          {/* TODO: insert the amount of agents and filtered agents */}
          <p className="font-light text-zinc-500">... จากทั้งหมด ... คน</p>
          <div className="flex flex-row gap-x-[10px]">
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
            >
              กลับ
            </Button>
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
