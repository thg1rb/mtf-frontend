"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import PrintingReceipt from "@/components/receipt/PrintingReceipt";
import { Button } from "@/components/ui/button";
import { getReceiptById, getTaskById } from "@/lib/mock-data";
import {
  ChevronLeft,
  CircleCheckBig,
  Printer,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React, { use, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const printRef = useRef<HTMLDivElement>(null);

  const receipt = getReceiptById(id);
  const task = receipt?.taskId ? getTaskById(receipt.taskId) : undefined;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบเสร็จ-${receipt?.id || "unknown"}`,
  });

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
                <Link href="/receipts">
                  <ChevronLeft className="size-[24px] mr-2" />
                  ย้อนกลับ
                </Link>
              </Button>
            }
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-[45px]">
        {/* Receipt Display */}
        <div className="flex-2">
          {receipt && <PrintingReceipt ref={printRef} receipt={receipt} />}
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
                  onClick={handlePrint}
                >
                  <Printer />
                  <p className="font-light">พิมพ์ใบเสร็จ</p>
                </Button>
                {receipt?.status === "unpaid" ? (
                  <Button
                    type="button"
                    className="flex flex-row justify-start bg-green-200 hover:bg-green-300 text-green-700 cursor-pointer"
                  >
                    <CircleCheckBig />
                    <p className="font-light">ชำระค่าบริการเรียบร้อย</p>
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
