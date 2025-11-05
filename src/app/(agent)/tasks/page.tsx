"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import StatGrid from "@/components/shared/StatGrid";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Badge } from "@/components/ui/badge";
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
import { getWorksQueryOption, getWorkStatsQueryOption } from "@/lib/api";
import { taskTableHeaders } from "@/lib/mock-data/tasks";
import { useQuery } from "@tanstack/react-query";
import {
  CircleCheck,
  CircleCheckBig,
  Edit,
  Files,
  Loader,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TasksPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0); // Start with 0

  // Input states (what user types)
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" "); // Default to "All"

  // Filter states (applied on search button click)
  const [searchEmployerName, setSearchEmployerName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Query data
  const { data: workStats } = useQuery(getWorkStatsQueryOption());
  const { data: worksData, isLoading: isLoadingWorks } = useQuery(
    getWorksQueryOption({
      page,
      size: 5,
      employerName: searchEmployerName || undefined,
      status:
        filterStatus && filterStatus.trim() !== ""
          ? (filterStatus as "FINISHED" | "NOT_FINISHED")
          : undefined,
    }),
  );

  // Handle search button click
  const handleSearch = () => {
    setSearchEmployerName(searchInput);
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
      title: "งานทั้งหมด (งาน)",
      amount: workStats?.totalWorks ?? 0,
      amountTextColor: "text-black",
      icon: Files,
    },
    {
      id: "stat-2",
      title: "ดำเนินการเสร็จสิ้น (งาน)",
      amount: workStats?.finishedWorks ?? 0,
      amountTextColor: "text-green-500",
      icon: CircleCheck,
    },
    {
      id: "stat-3",
      title: "กำลังดำเนินการ (งาน)",
      amount: workStats?.inProgressWorks ?? 0,
      amountTextColor: "text-yellow-400",
      icon: Loader,
    },
  ];

  const mappingCurrentStepIndex: Record<string, Record<string, number>> = {
    register: {
      รวบรวมเอกสารเพิ่มเติม: 1,
      ตรวจสอบโรคและซื้อประกันสุขภาพ: 2,
      "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)": 3,
      "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)": 4,
    },
    renew: {
      รวบรวมเอกสารเพิ่มเติม: 1,
      ตรวจสอบโรคและซื้อประกันสุขภาพ: 2,
      "ยื่น Calling Visa กับกรมแรงงาน": 3,
      ซื้อใบอนุญาตการทำงานกับกรมแรงงาน: 4,
      ตีซ่าตรวจคนเข้าเมือง: 5,
    },
  };

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="จัดการงาน"
        desc="ติดตามขั้นตอนการดำเนินการของแรงงานต่างด้าวทั้งหมดในระบบ"
        hasBackButton={false}
        rightActionButtons={[
          <Button
            asChild
            key="ขึ้นทะเบียนใหม่"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href="/tasks/register/new">
              <Plus className="size-[24px] mr-2" />
              ขึ้นทะเบียนใหม่
            </Link>
          </Button>,
          <Button
            asChild
            key="ต่ออายุใบอนุญาต"
            variant="outline"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href="/tasks/renew/new">
              <Plus className="size-[24px] mr-2" />
              ต่ออายุใบอนุญาต
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
          <p className="font-light">ค้นหางานจากส่วนหนึ่งของชื่อหรือนามสกุลของนายจ้าง</p>
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
              <SelectItem value="FINISHED" className="cursor-pointer">
                เสร็จสิ้น
              </SelectItem>
              <SelectItem value="NOT_FINISHED" className="cursor-pointer">
                กำลังดำเนินการ
              </SelectItem>
            </SelectContent>
          </Select>
          <Button className="font-light cursor-pointer" onClick={handleSearch}>
            ค้นหา
          </Button>
        </div>

        {isLoadingWorks ? (
          <TableSkeleton rows={5} columns={4} />
        ) : !worksData?.content?.length ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {taskTableHeaders.map((tableHeader) => (
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
                    <p className="text-muted-foreground">ไม่พบข้อมูลงาน</p>
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
                  {taskTableHeaders.map((tableHeader) => (
                    <TableHead
                      key={tableHeader.index}
                      className={`font-normal px-[20px] ${tableHeader.index === "header-5" ? "text-right" : ""}`}
                    >
                      {tableHeader.headerName}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {worksData.content.map((work) => (
                  <TableRow
                    key={work.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      if (work.workType === "ขึ้นทะเบียนใหม่")
                        router.push(`/tasks/register/${work.id}`);
                      else if (work.workType === "ต่ออายุใบอนุญาตทำงาน")
                        router.push(`/tasks/renew/${work.id}`);
                    }}
                  >
                    <TableCell className="font-light px-[20px]">
                      <Badge variant="outline" className="w-[130px] font-light">
                        {work.workType === "ขึ้นทะเบียนใหม่"
                          ? "ขึ้นทะเบียนใหม่"
                          : "ต่ออายุใบอนุญาต"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      {work.employerName}
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-x-[8px]">
                          {"ขั้นตอนที่ " +
                            mappingCurrentStepIndex[
                              work.workType === "ขึ้นทะเบียนใหม่"
                                ? "register"
                                : "renew"
                            ][work.currentStep]}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[20px]">
                      {work.status === "FINISHED" ? (
                        <Badge className="flex flex-row w-[120px] font-light bg-green-200 text-green-800">
                          <CircleCheckBig />
                          เสร็จสิ้น
                        </Badge>
                      ) : (
                        <Badge className="flex flex-row w-[120px] font-light bg-yellow-100 text-red-800">
                          <Loader />
                          ดำเนินการ
                        </Badge>
                      )}
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
                            <Link
                              href={`/tasks/${work.workType === "ขึ้นทะเบียนใหม่" ? "register" : "renew"}/${work.id}/edit`}
                            >
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
            หน้า {(worksData?.currentPage ?? 0) + 1} จาก{" "}
            {worksData?.totalPages ?? 1} (งาน {worksData?.content?.length ?? 0}{" "}
            จากทั้งหมด {worksData?.totalElements ?? 0} งาน)
          </p>
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
