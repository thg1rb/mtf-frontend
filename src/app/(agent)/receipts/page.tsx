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
import { receiptTableHeaders } from "@/lib/mock-data";
import {
  getBillsQueryOption,
  getBillStatsQueryOption,
} from "@/lib/api/bills/bills";
import { BillListItem } from "@/lib/api/bills/types";
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
import { useQuery } from "@tanstack/react-query";

export default function ReceiptsPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  // Input states (what user types)
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" "); // Default to "All"

  // Filter states (applied on search button click)
  const [searchFullName, setSearchFullName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Fetch bills statistics
  const { data: billStats } = useQuery(getBillStatsQueryOption());

  // Fetch bills with filters
  const { data: billsData, isLoading } = useQuery(
    getBillsQueryOption({
      page,
      size: 5,
      billId: searchFullName || undefined,
      employerName: searchFullName || undefined,
      paymentStatus: (filterStatus || undefined) as
        | "PAID"
        | "NOT_PAID"
        | undefined,
    }),
  );

  // Handle search button click
  const handleSearch = () => {
    setSearchFullName(searchInput);
    setFilterStatus(statusInput);
    setPage(0); // Reset to first page on new search
  };

  // Handle Enter key in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSearch();
    }
  };

  // Transform API response to stat items format
  const statItems = [
    {
      id: "stat-1",
      title: "ใบเสร็จทั้งหมด (ใบ)",
      amount: billStats?.totalBills || 0,
      amountTextColor: "text-black",
      icon: ReceiptText,
    },
    {
      id: "stat-2",
      title: "ใบเสร็จที่ชำระแล้ว (ใบ)",
      amount: billStats?.paidBills || 0,
      amountTextColor: "text-green-500",
      icon: CircleCheck,
    },
    {
      id: "stat-3",
      title: "ใบเสร็จที่รอการชำระ (ใบ)",
      amount: billStats?.unpaidBills || 0,
      amountTextColor: "text-yellow-400",
      icon: Loader,
    },
  ];

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="จัดการใบเสร็จ"
        desc="ข้อมูลใบเสร็จทั้งหมดในระบบ"
        hasBackButton={false}
      />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <p className="font-normal">ค้นหาใบเสร็จ</p>
          <p className="font-light">ค้นหาจากส่วนหนึ่งของชื่อนายจ้าง</p>
        </div>
        <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="ค้นหาจากชื่อนายจ้าง..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyDown={handleKeyPress}
            />
          </div>
          <Select value={statusInput} onValueChange={setStatusInput}>
            <SelectTrigger className="font-light cursor-pointer">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" " className="font-light cursor-pointer">
                ทั้งหมด
              </SelectItem>
              <SelectItem value="PAID" className="font-light cursor-pointer">
                ชำระแล้ว
              </SelectItem>
              <SelectItem
                value="NOT_PAID"
                className="font-light cursor-pointer"
              >
                รอการชำระ
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            className="font-light cursor-pointer"
            onClick={handleSearch}
          >
            ค้นหา
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {receiptTableHeaders.map((tableHeader) => (
                  <TableHead
                    key={tableHeader.index}
                    className={`font-normal px-[20px] ${tableHeader.className}`}
                  >
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : !billsData?.content || billsData.content.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    ไม่พบข้อมูลใบเสร็จ
                  </TableCell>
                </TableRow>
              ) : (
                billsData.content.map((bill: BillListItem) => (
                  <TableRow
                    key={bill.billId}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/receipts/${bill.billId}`)}
                  >
                    <TableCell className="font-light px-[20px]">
                      {bill.billId}
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      {bill.employerName}
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      <div className="flex flex-col">
                        <p className="font-light">{bill.workType}</p>
                        <p className="font-light text-zinc-400">
                          ขั้นตอนที่: {bill.stepIndex}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      ฿ {bill.price.toLocaleString("th-TH")}
                    </TableCell>
                    <TableCell className="px-[20px] text-right">
                      <Badge
                        className={`w-[100px] ${
                          bill.paymentStatus === "PAID"
                            ? "bg-green-200 text-green-700"
                            : "bg-yellow-100 text-red-700"
                        } font-light`}
                      >
                        <div className="flex flex-row items-center gap-x-[5px]">
                          {bill.paymentStatus === "PAID" ? (
                            <CircleCheckBig size={12} />
                          ) : (
                            <TriangleAlert size={12} />
                          )}{" "}
                          {bill.paymentStatus === "PAID"
                            ? "ชำระแล้ว"
                            : "รอชำระ"}
                        </div>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-light text-zinc-500">
            แสดง {billsData?.content.length || 0} รายการ จากทั้งหมด{" "}
            {billsData?.totalElements || 0} รายการ
          </p>
          <div className="flex flex-row gap-x-[10px]">
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              กลับ
            </Button>
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              disabled={!billsData || page >= billsData.totalPages - 1}
              onClick={() =>
                setPage((p) =>
                  Math.min((billsData?.totalPages || 1) - 1, p + 1),
                )
              }
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
