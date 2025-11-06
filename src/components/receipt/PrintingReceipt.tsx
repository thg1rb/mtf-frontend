import {
  Building,
  CircleCheckBig,
  ScrollText,
  TriangleAlert,
  User,
  User2,
} from "lucide-react";
import React, { forwardRef } from "react";
import { Badge } from "../ui/badge";
import { Receipt } from "@/types";
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
    // Use data from receipt instead of mock data
    const employerName = receipt.employerName || "-";
    const typeOfTaskLabel = receipt.typeOfTaskLabel || "-";
    const employees = receipt.employees || [];

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

    return (
      <div
        ref={ref}
        className="print-receipt w-full flex flex-col gap-y-[20px] p-[27px] border border-slate-300 rounded-2xl shadow-md bg-white"
      >
        <style>
          {`
            @import url('${process.env.NEXT_PUBLIC_GOOGLE_FONTS_URL || "https://fonts.googleapis.com/css2?family=Kanit:wght@100..900&display=swap"}');
            * {
              font-family: 'Kanit', sans-serif !important;
            }
          `}
        </style>

        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold">ใบเสร็จอิเล็กทรอนิกส์</p>
          <p className="font-medium">{receipt.id}</p>
          <p className="font-light text-zinc-800">หมายเหตุ: {"-"}</p>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-col md:flex-row justify-between gap-y-[15px]">
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
                receipt?.status === "PAID"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-100 text-red-700"
              } font-light`}
            >
              <div className="flex flex-row items-center gap-x-[5px]">
                {receipt?.status === "PAID" ? (
                  <CircleCheckBig size={12} />
                ) : (
                  <TriangleAlert size={12} />
                )}{" "}
                {receipt?.status === "PAID" ? "ชำระแล้ว" : "รอชำระ"}
              </div>
            </Badge>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-col gap-y-[20px]">
          <div className="flex flex-row gap-x-[5px]">
            <User />
            <p className="font-normal">ข้อมูลนายหน้า</p>
          </div>
          <div className="flex flex-col ml-[20px]">
            <div className="flex flex-row gap-x-[10px]">
              <p className="font-light text-zinc-400">นายหน้าที่รับผิดชอบ:</p>
              <p className="font-light">{receipt.agentName}</p>
            </div>
            <div className="flex flex-row gap-x-[10px]">
              <p className="font-light text-zinc-400">อีเมล:</p>
              <p className="font-light">{receipt.agentEmail}</p>
            </div>
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
                    {employees.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-[20px] font-light">
                          {employee.passportNumber}
                        </TableCell>
                        <TableCell className="px-[20px] font-light">
                          {employee.fullName}
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
            <p className="font-light">ขั้นตอนที่: {receipt.step}</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="flex flex-row justify-between gap-y-[5px]">
          <p className="font-medium">รวมทั้งสิ้น</p>
          <p className="font-medium text-sky-700">
            ฿ {receipt.amount.toLocaleString()} ถ้วน
          </p>
        </div>

        <div className="w-full h-[1px] bg-slate-300"></div>

        {receipt.status === "PAID" ? (
          <div className="flex flex-col gap-y-[5px] p-[20px] bg-green-100 rounded-lg">
            <p className="font-normal text-green-700">ข้อมูลการชำระ</p>
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

        <div className="flex flex-col items-end mt-[20px]">
          <p className="font-light text-zinc-800">ลงชื่อ __________________________</p>
          <p className="font-light text-zinc-800">({receipt.agentName})</p>
          <p className="font-light text-zinc-800">วันที่ {formatDate(new Date().toLocaleDateString())}</p>
        </div>
      </div>
    );
  }
);

PrintingReceipt.displayName = "PrintingReceipt";

export default PrintingReceipt;
