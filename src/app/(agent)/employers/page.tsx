"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import StatGrid from "@/components/shared/StatGrid";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { employerTableHeaders } from "@/lib/mock-data";
import {
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck2,
  Users2,
  UserX2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getEmployersQueryOption,
  getEmployerStatsQueryOption,
} from "@/lib/api";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

export default function EmployersPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0); // Start with 0

  // Input states (what user types)
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" "); // Default to "All"

  // Filter states (applied on search button click)
  const [searchFullName, setSearchFullName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Query data
  const { data: employerStats } = useQuery(getEmployerStatsQueryOption());
  const { data: employersData, isLoading: isLoadingEmployers } = useQuery(
    getEmployersQueryOption({
      page,
      size: 5,
      nameContains: searchFullName || undefined,
      status:
        filterStatus && filterStatus.trim() !== ""
          ? (filterStatus as "ACTIVE" | "INACTIVE")
          : undefined,
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
      handleSearch();
    }
  };

  const statItems = [
    {
      id: "stat-1",
      title: "นายจ้างทั้งหมด (คน)",
      amount: employerStats?.totalEmployers ?? 0,
      amountTextColor: "text-black",
      icon: Users2,
    },
    {
      id: "stat-2",
      title: "นายจ้างที่ใช้งานได้ (คน)",
      amount: employerStats?.activeEmployers ?? 0,
      amountTextColor: "text-green-500",
      icon: UserCheck2,
    },
    {
      id: "stat-3",
      title: "นายจ้างที่ไม่ใช้งาน (คน)",
      amount: employerStats?.inactiveEmployers ?? 0,
      amountTextColor: "text-red-500",
      icon: UserX2,
    },
  ];

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="จัดการนายจ้าง"
        desc="ข้อมูลนายจ้างทั้งหมดในระบบ"
        hasBackButton={false}
        rightActionButtons={[
          <Button
            asChild
            key="เพิ่มนายจ้างใหม่"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href="/employers/new">
              <Plus className="size-[24px] mr-2" />
              เพิ่มนายจ้างใหม่
            </Link>
          </Button>,
        ]}
      />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <p className="font-normal">ค้นหานายจ้าง</p>
          <p className="font-light">ค้นหาจากส่วนหนึ่งของชื่อหรือนามสกุล</p>
        </div>
        <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="ค้นหานายจ้างที่ต้องการ..."
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
              <SelectItem value=" " className="cursor-pointer">
                ทั้งหมด
              </SelectItem>
              <SelectItem value="ACTIVE" className="cursor-pointer">
                ใช้งาน
              </SelectItem>
              <SelectItem value="INACTIVE" className="cursor-pointer">
                ไม่ใช้งาน
              </SelectItem>
            </SelectContent>
          </Select>
          <Button className="font-light cursor-pointer" onClick={handleSearch}>
            ค้นหา
          </Button>
        </div>

        {isLoadingEmployers ? (
          <TableSkeleton rows={5} columns={4} />
        ) : !employersData?.content?.length ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {employerTableHeaders.map((tableHeader) => (
                    <TableHead
                      key={tableHeader.index}
                      className={`font-normal ${tableHeader.className} px-[20px]`}
                    >
                      {tableHeader.headerName}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <p className="text-muted-foreground">ไม่พบข้อมูลนายจ้าง</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {employerTableHeaders.map((tableHeader) => (
                    <TableHead
                      key={tableHeader.index}
                      className={`font-normal ${tableHeader.className} px-[20px]`}
                    >
                      {tableHeader.headerName}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {employersData.content.map((employer) => (
                  <TableRow
                    key={employer.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/employers/${employer.id}`)}
                  >
                    <TableCell className="font-light px-[20px]">
                      {employer.fullName}
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Mail size={16} />
                          {employer.email}
                        </div>
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Phone size={16} />
                          {employer.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[20px] text-center">
                      {<StatusBadge status={employer.status} />}
                    </TableCell>
                    <TableCell className="text-right px-[20px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            asChild
                            className="cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link href={`/employers/${employer.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              แก้ไข
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex flex-row justify-between items-center">
          <p className="font-light text-zinc-500">
            {" "}
            หน้า {(employersData?.currentPage ?? 0) + 1} จาก{" "}
            {employersData?.totalPages ?? 1} (นายจ้าง{" "}
            {employersData?.content?.length ?? 0} จากทั้งหมด{" "}
            {employersData?.totalElements ?? 0} คน)
          </p>
          <div className="flex flex-row gap-x-[10px]">
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0 || isLoadingEmployers}
            >
              กลับ
            </Button>
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={
                page >= (employersData?.totalPages ?? 1) - 1 ||
                isLoadingEmployers
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
