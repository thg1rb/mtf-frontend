import HeaderSection from "@/components/shared/HeaderSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getReceiptById, getTaskById } from "@/lib/mock-data";
import {
  Building,
  ChevronLeft,
  CircleCheckBig,
  Download,
  Printer,
  ScrollText,
  Sparkles,
  SquarePen,
  TriangleAlert,
  User2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ReceiptPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const receipt = getReceiptById(id);
  const task = receipt?.taskId ? getTaskById(receipt.taskId) : undefined;

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      <div className="flex flex-col">
        {/* HeaderSection */}

        {!receipt || !task ? (
          <>NotFound</>
        ) : (
          <HeaderSection
            topic={receipt.id}
            leftActionButton={
              <Button
                asChild
                variant="ghost"
                className="flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer"
              >
                <Link href="/employers">
                  <ChevronLeft className="size-[24px] mr-2" />
                  ย้อนกลับ
                </Link>
              </Button>
            }
            rightActionButtons={[
              <Button
                asChild
                key="แก้ไขข้อมูล"
                className="font-normal px-[17px] py-[5px] w-full md:w-auto"
              >
                <Link href={`/employers/${id}/edit`}>
                  <SquarePen className="size-[24px] mr-2" />
                  แก้ไขข้อมูล
                </Link>
              </Button>,
            ]}
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-[45px]">
        <div className="flex-2 flex flex-col gap-y-[20px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
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
                <div className="flex flex-row">
                  <p className="font-light text-zinc-400">วันที่ออกใบเสร็จ</p>
                  {/* TODO: วันท่ี่ออกใบเสร็จ */}
                  <p>...</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-light text-zinc-400">วันที่ชำระใบเสร็จ</p>
                  {/* TODO: วันที่ชำระใบเสร็จ */}
                  <p>...</p>
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
                <p className="font-light">ชื่อนายจ้าง</p>
              </div>
              <div className="flex flex-row">
                <p className="font-light text-zinc-400">ราชื่อลูกจ้าง:</p>
                {/* TODO: EmployerTable */}
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
              {/* TODO: typeOfTask */}
              <p className="font-normal">ประเภทงาน</p>
              {/* TODO: step */}
              <p className="font-light">ขั้นตอนที่: </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-300"></div>

          <div className="flex flex-row justify-between gap-y-[5px]">
            <p className="font-medium">รวมทั้งสิ้น</p>
            {/* TODO: amount */}
            <p className="font-medium text-sky-700">฿ 0000</p>
          </div>

          <div className="w-full h-[1px] bg-slate-300"></div>

          <div className="flex flex-col gap-y-[5px] p-[20px] bg-green-100 rounded-lg">
            <p className="font-normal text-green-700">ข้อมูลการชำระ</p>
            <div className="flex flex-row justify-between">
              <p className="font-light text-zinc-400">ช่องทางการชำระ:</p>
              {/* TODO: paymentMethod */}
              <p className="font-light text-zinc-700">ช่องทาง</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-light text-zinc-400">จำนวนเงิน:</p>
              {/* TODO: amount */}
              <p className="font-light text-zinc-700">จำนวนเงิน</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* OperationsSection*/}
          <div className="flex-1 flex flex-col gap-y-[25px] p-[27px] h-min border border-slate-300 rounded-2xl shadow-md">
            <div className="flex flex-row gap-x-[5px] items-center">
              <Sparkles />
              <p className="font-normal">การดำเนินการ</p>
            </div>
            <div className="flex flex-col gap-y-[25px] ">
              <div className="flex flex-col gap-y-[18px]">
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-row justify-start cursor-pointer"
                >
                  <Printer />
                  <p className="font-light">พิมพ์ใบเสร็จ</p>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-row justify-start cursor-pointer"
                >
                  <Download />
                  <p className="font-light">ดาวโหลดใบเสร็จ</p>
                </Button>
                <Button
                  type="button"
                  className="flex flex-row justify-start bg-green-200 hover:bg-green-300 text-green-700 cursor-pointer"
                >
                  <CircleCheckBig />
                  <p className="font-light">ชำระค่าบริการเรียบร้อย</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
