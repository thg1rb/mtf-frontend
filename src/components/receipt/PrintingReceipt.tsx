import {
  Building,
  CircleCheckBig,
  ScrollText,
  TriangleAlert,
  User2,
} from "lucide-react";
import React, { forwardRef } from "react";
import { Badge } from "../ui/badge";
import { Receipt } from "@/types";
import {
  getTaskById,
  getEmployerFullNameByEmployerId,
  getCurrentStep,
  getTypeOfTaskLabel,
  getPassportNoById,
  getEmployeeFullNameById,
} from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface PrintingReceiptProps {
  receipt: Receipt;
}

const PrintingReceipt = forwardRef<HTMLDivElement, PrintingReceiptProps>(
  ({ receipt }, ref) => {
    // Get task details
    const task = getTaskById(receipt.taskId);
    const employerName = task
      ? getEmployerFullNameByEmployerId(task.employerId)
      : "-";
    const typeOfTaskLabel = task ? getTypeOfTaskLabel(task.typeOfTask) : "-";
    const currentStep = task ? getCurrentStep(task.stepStartDates) : "-";

    // Get employee names from task
    const employeeNames = task?.employeeIds.join(", ") || "-";
    const employeeIds = task?.employeeIds;

    // Format dates
    const formatDate = (date: Date | string | null) => {
      if (!date) return "-";
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Format payment method
    const getPaymentMethodLabel = (method: string | null) => {
      if (!method) return "-";
      const labels: Record<string, string> = {
        cash: "เงินสด",
        transfer: "โอนเงิน",
        promptpay: "พร้อมเพย์",
      };
      return labels[method] || method;
    };

    return (
      <div
        ref={ref}
        className="print-receipt w-full flex flex-col gap-y-[20px] p-[27px] border border-slate-300 rounded-2xl shadow-md bg-white"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-y-[15px]">
          <div>
            <div className="flex flex-row items-center gap-x-[5px]">
              <Building />
              <p className="font-normal">บริษัท MTF Manpower จำกัด</p>
            </div>
            <p className="font-light text-zinc-400">
              123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110
              <br />
              โทร: 02-123-4567 | อีเมล: info@mtfmanpower.com
            </p>
          </div>
          <div className="flex flex-row justify-between lg:justify-start items-center gap-x-[10px]">
            <div className="flex flex-col">
              <div className="flex flex-row gap-x-[5px]">
                <p className="font-light text-zinc-400">วันที่ออกใบเสร็จ:</p>
                <p className="font-light">{formatDate(receipt.createdAt)}</p>
              </div>
              <div className="flex flex-row gap-x-[5px]">
                <p className="font-light text-zinc-400">วันที่ชำระใบเสร็จ:</p>
                <p className="font-light">{formatDate(receipt.paidAt)}</p>
              </div>
            </div>
            <Badge
              className={`w-[100px] h-min ${
                receipt?.status === "paid"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-100 text-red-700"
              } font-light`}
            >
              <div className="flex flex-row items-center gap-x-[5px]">
                {receipt?.status === "paid" ? (
                  <CircleCheckBig size={12} />
                ) : (
                  <TriangleAlert size={12} />
                )}{" "}
                {receipt?.status === "paid" ? "ชำระแล้ว" : "รอชำระ"}
              </div>
            </Badge>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-col gap-y-[20px]">
          <div className="flex flex-row gap-x-[5px]">
            <User2 />
            <p className="font-normal">ข้อมูลลูกค้า</p>
          </div>
          <div className="flex flex-col ml-[20px]">
            <div className="flex flex-row gap-x-[10px]">
              <p className="font-light text-zinc-400">นายจ้าง:</p>
              <p className="font-light">{employerName}</p>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <p className="font-light text-zinc-400">รายชื่อลูกจ้าง:</p>
              <div className="rounded-md border border-slate-300">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-[20px] font-normal">
                        หมายเลขหนังสือเดินทาง
                      </TableHead>
                      <TableHead className="px-[20px] font-normal">
                        ชื่อจริง-นามสกุล
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeIds?.map((employeeId) => (
                      <TableRow>
                        <TableCell className="px-[20px] font-light">{getPassportNoById(employeeId)}</TableCell>
                        <TableCell className="px-[20px] font-light">
                          {getEmployeeFullNameById(employeeId)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-col gap-y-[20px]">
          <div className="flex flex-row items-center gap-x-[5px]">
            <ScrollText />
            <p className="font-normal">รายการค่าใช้จ่ายและรายละเอียด</p>
          </div>
          <div className="flex flex-col p-[20px] bg-sky-50 text-sky-700 rounded-lg">
            <p className="font-normal">{typeOfTaskLabel}</p>
            <p className="font-light">ขั้นตอนที่: {currentStep}</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-row justify-between gap-y-[5px]">
          <p className="font-medium">รวมทั้งสิ้น</p>
          <p className="font-medium text-sky-700">
            ฿ {receipt.amount.toLocaleString()}
          </p>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        {receipt.status === "paid" ? (
          <div className="flex flex-col gap-y-[5px] p-[20px] bg-green-100 rounded-lg">
            <p className="font-normal text-green-700">ข้อมูลการชำระ</p>
            <div className="flex flex-row justify-between">
              <p className="font-light text-zinc-400">ช่องทางการชำระ:</p>
              <p className="font-light text-zinc-700">
                {getPaymentMethodLabel(receipt.paymentMethod)}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-light text-zinc-400">จำนวนเงิน:</p>
              <p className="font-light text-zinc-700">
                ฿ {receipt.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

PrintingReceipt.displayName = "PrintingReceipt";

export default PrintingReceipt;
