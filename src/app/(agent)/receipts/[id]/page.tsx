"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import PrintingReceipt from "@/components/receipt/PrintingReceipt";
import { Button } from "@/components/ui/button";
import {
  getBillByIdQueryOption,
  payBillMutationOptions,
  printedBillMutationOptions,
} from "@/lib/api/bills/bills";
import { getWorkQueryOption } from "@/lib/api/works/works";
import { CircleCheckBig, Sparkles } from "lucide-react";
import React, { use, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PostPrintedBillRequest, PostPrintedBillResponse } from "@/lib/api/bills/types";
import { getAuthUser } from "@/lib/auth/storage";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PrintedReceipt } from "@/types";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [reason, setReason] = useState("");
  const [ printedReceipt, setPrintedReceipt ] = useState<PrintedReceipt | null>(null);

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
          queryKey: ["bill-details", { workId: bill.workId }],
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

  // Printed bill mutation
  const printedBillMutation = useMutation({
    mutationFn: ({
      billId,
      data,
    }: {
      billId: string;
      data: PostPrintedBillRequest;
    }) => printedBillMutationOptions.mutationFn(billId, data),
    onSuccess: (data: PostPrintedBillResponse) => {
      console.log("Bill marked as printed");

      // Convert PostPrintedBillResponse to PrintedReceipt format for PrintingReceipt component
      const convertedReceipt: PrintedReceipt = {
        id: data.bill.id,
        taskId: data.bill.workId,
        step: data.bill.stepIndex,
        amount: data.bill.price,
        status: data.bill.status,
        createdAt: data.bill.createdAt,
        paidAt: data.bill.paidAt,
        // PrintedReceipt specific fields
        reason: data.printReason,
        printCount: data.bill.printCount,
        printDate: data.printedAt,
        // Use work data for additional fields
        employerName: workData?.employer?.fullName || "-",
        typeOfTaskLabel: data.bill.stepName || workData?.workType || "-",
        employees: workData?.employeesInWork || [],
        agentName: data.printedByAgentName || workData?.agent?.fullName || "-",
        agentEmail: workData?.agent?.email || "-",
      };

      setPrintedReceipt(convertedReceipt);
      // Trigger print after setting the printed receipt data
      setTimeout(() => {
        handlePrint();
      }, 100);
    },
    onError: (error) => {
      console.error("Marking bill as printed failed:", error);
    },
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
    agentName: workData?.agent?.fullName || "-",
    agentEmail: workData?.agent?.email || "-",
  };

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      <div className="flex flex-col">
        {/* HeaderSection */}
        <HeaderSection topic="ข้อมูลใบเสร็จ" hasBackButton={true} />
      </div>

      <div className="flex flex-col lg:flex-row gap-[45px]">
        {/* Receipt Display */}
        <div className="flex-2">
          {/* {receipt && <PrintingReceipt ref={printRef} receipt={receipt} />} */}
          { printedReceipt ? (<PrintingReceipt ref={printRef} receipt={printedReceipt} />) : (<PrintingReceipt ref={printRef} receipt={receipt} />)}
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
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild className="flex flex-row justify-start w-full">
                    <Button variant="outline" className="font-light">พิมพ์ใบเสร็จ</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!bill) return;
                      const agentId = getAuthUser()?.id || "";
                      printedBillMutation.mutate({
                        billId: bill.id,
                        data: {
                          agentId,
                          reason,
                        },
                      });
                      setOpenDialog(false);
                    }}>
                      <DialogHeader>
                        <DialogTitle className="font-medium text-center">ยืนยันการพิมพ์ใบเสร็จ</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 mt-5">
                        <div className="grid gap-3">
                          <Textarea
                            id="reason"
                            name="reason"
                            placeholder="ระบุเหตุผลในการพิมพ์ใบเสร็จนี้"
                            className="font-light"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-5">
                        <Button type="submit" className="font-normal">ยืนยัน</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                {/* <Button
                  type="button"
                  variant="outline"
                  className="flex flex-row justify-start cursor-pointer"
                  onClick={handlePrint}
                >
                  <Printer />
                  <p className="font-light">พิมพ์ใบเสร็จ</p>
                </Button> */}

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
