"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import PrintingReceipt from "@/components/receipt/PrintingReceipt";
import { Button } from "@/components/ui/button";
import {
  getBillByIdQueryOption,
  payBillMutationOptions,
} from "@/lib/api/bills/bills";
import { getWorkQueryOption } from "@/lib/api/works/works";
import { CircleCheckBig, Printer, Sparkles } from "lucide-react";
import React, { use, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch bill by ID
  const { data: bill, isLoading, error } = useQuery(getBillByIdQueryOption(id));

  // Fetch work data using the workId from the bill
  const { data: workData } = useQuery({
    ...getWorkQueryOption(bill?.workId || ""),
    enabled: !!bill?.workId, // Only fetch when workId is available
  });

  // Pay bill mutation
  const payBillMutation = useMutation({
    ...payBillMutationOptions,
    onSuccess: (_data, billId) => {
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["bill", billId] });

      // Invalidate bill details query used in TaskForm (with workId parameter)
      if (bill?.workId) {
        queryClient.invalidateQueries({
          queryKey: ["bill-details", { workId: bill.workId }]
        });
      }

      // Also invalidate any bills list queries
      queryClient.invalidateQueries({ queryKey: ["bills"] });

      // Redirect to the previous page
      router.back();
    },
    onError: (error) => {
      console.error("Payment failed:", error);
      // Could show error message
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบเสร็จ-${bill?.id || "unknown"}`,
  });

  const handlePayBill = () => {
    if (bill) {
      payBillMutation.mutate(bill.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading receipt data
      </div>
    );
  }

  // Convert BillResponse to Receipt format for PrintingReceipt component
  const receipt = {
    id: bill.id,
    taskId: bill.workId,
    step: bill.stepIndex,
    amount: bill.price,
    status: bill.status,
    createdAt: bill.createdAt,
    paidAt: bill.paidAt,
    // Include additional data from work API
    employerName: workData?.employer?.fullName || "-",
    typeOfTaskLabel: workData?.workType || "-",
    employees: workData?.employeesInWork || [],
  };

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      <div className="flex flex-col">
        {/* HeaderSection */}
        <HeaderSection topic={bill.id} hasBackButton={true} />
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
                {bill.status === "NOT_PAID" && (
                  <Button
                    type="button"
                    className="flex flex-row justify-start bg-green-200 hover:bg-green-300 text-green-700 cursor-pointer"
                    onClick={handlePayBill}
                    disabled={payBillMutation.isPending}
                  >
                    <CircleCheckBig />
                    <p className="font-light">
                      {payBillMutation.isPending
                        ? "กำลังดำเนินการ..."
                        : "ชำระค่าบริการเรียบร้อย"}
                    </p>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
