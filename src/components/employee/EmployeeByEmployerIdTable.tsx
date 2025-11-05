"use client";

import { Edit, MoreHorizontal, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import StatusBadge from "../shared/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesByEmployerIdQueryOption } from "@/lib/api";
import { TableSkeleton } from "../shared/TableSkeleton";

export default function EmployeeByEmployerIdTableSection({
  employerId,
}: {
  employerId: string;
}) {
  const [page, setPage] = useState<number>(0); // Start with 0

  // Input states (what user types)
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" "); // Default to "All"

  // Filter states (applied on search button click)
  const [searchFullName, setSearchFullName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Query data
  const { data: employeesData, isLoading: isLoadingEmployers } = useQuery(
    getEmployeesByEmployerIdQueryOption(employerId, {
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

  return (
    // {/* TableSection */ }
    <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
      <div className="flex flex-col">
        <p className="font-normal">ค้นหาลูกจ้าง</p>
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
        <TableSkeleton rows={5} columns={9} />
      ) : !employeesData?.content?.length ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-[20px] font-normal">
                  ชื่อ-นามสกุล
                </TableHead>
                <TableHead className="px-[20px] font-normal">สถานะ</TableHead>
                <TableHead className="px-[20px] font-normal text-right">
                  ดำเนินการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} className="text-center py-20">
                  <p className="text-muted-foreground">ไม่พบข้อมูลนายหน้า</p>
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
                <TableHead className="px-[20px] font-normal">
                  ชื่อ-นามสกุล
                </TableHead>
                <TableHead className="px-[20px] font-normal">สถานะ</TableHead>
                <TableHead className="px-[20px] font-normal text-right">
                  ดำเนินการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesData.content.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-light px-[20px]">
                    {employee.fullName}
                  </TableCell>
                  <TableCell className="px-[20px]">
                    {<StatusBadge status={employee.status} />}
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
                          <Link href={`/employees/${employee.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            แก้ไข
                          </Link>
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
          หน้า {(employeesData?.currentPage ?? 0) + 1} จาก{" "}
          {employeesData?.totalPages ?? 1} (ลูกจ้าง{" "}
          {employeesData?.content?.length ?? 0} จากทั้งหมด{" "}
          {employeesData?.totalElements ?? 0} คน)
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
              page >= (employeesData?.totalPages ?? 1) - 1 || isLoadingEmployers
            }
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
}
