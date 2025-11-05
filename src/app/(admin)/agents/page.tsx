"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building,
  CircleCheck,
  CircleX,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import StatGrid from "@/components/shared/StatGrid";
import HeaderSection from "@/components/shared/HeaderSection";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { agentTableHeaders } from "@/lib/mock-data";
import StatusBadge from "@/components/shared/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { getAgentStatsQueryOption, getAgentsQueryOption } from "@/lib/api";

export default function AgentsPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0); // Start with 0

  // Input states (what user types)
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" ");

  // Filter states (applied on search button click)
  const [searchFullName, setSearchFullName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Query data
  const { data: agentStats } = useQuery(getAgentStatsQueryOption());
  const { data: agentsData, isLoading: isLoadingAgents } = useQuery(
    getAgentsQueryOption({
      page,
      size: 5,
      fullName: searchFullName || undefined,
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
      title: "นายหน้าทั้งหมด (คน)",
      amount: agentStats?.totalAgents ?? 0,
      amountTextColor: "text-black",
      icon: Building,
    },
    {
      id: "stat-2",
      title: "นายหน้าที่ใช้งานได้ (คน)",
      amount: agentStats?.activeAgents ?? 0,
      amountTextColor: "text-green-500",
      icon: CircleCheck,
    },
    {
      id: "stat-3",
      title: "นายหน้าที่ไม่ใช้งาน (คน)",
      amount: agentStats?.inactiveAgents ?? 0,
      amountTextColor: "text-red-500",
      icon: CircleX,
    },
  ];

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="จัดการนายหน้า"
        desc="รายชื่อนายหน้าทั้งหมดในระบบ"
        hasBackButton={false}
        rightActionButtons={[
          <Button
            asChild
            key="เพิ่มนายหน้าใหม่"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href="/agents/new">
              <Plus className="size-[24px] mr-2" />
              เพิ่มนายหน้าใหม่
            </Link>
          </Button>,
        ]}
      />

      {/* StatSection */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <p className="font-normal">ค้นหานายหน้า</p>
          <p className="font-light">ค้นหาจากส่วนหนึ่งของชื่อหรือนามสกุล</p>
        </div>
        <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="ค้นหานายหน้าที่ต้องการ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <Select value={statusInput} onValueChange={setStatusInput}>
            <SelectTrigger className="font-light cursor-pointer w-[150px]">
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
        {isLoadingAgents ? (
          <TableSkeleton rows={5} columns={4} />
        ) : !agentsData?.content?.length ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {agentTableHeaders.map((tableHeader) => (
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
                  <TableCell colSpan={4} className="text-center py-20">
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
                  {agentTableHeaders.map((tableHeader) => (
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
                {agentsData.content.map((agent) => (
                  <TableRow
                    key={agent.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/agents/${agent.id}`)}
                  >
                    <TableCell className="font-light px-[20px]">
                      {agent.email}
                    </TableCell>
                    <TableCell className="font-light px-[20px]">
                      {agent.fullName}
                    </TableCell>
                    <TableCell className="px-[20px] text-center">
                      <StatusBadge status={agent.status} />
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
                            <Link href={`/agents/${agent.id}/edit`}>
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
            หน้า {(agentsData?.currentPage ?? 0) + 1} จาก{" "}
            {agentsData?.totalPages ?? 1} (นายหน้า{" "}
            {agentsData?.content?.length ?? 0} จากทั้งหมด{" "}
            {agentsData?.totalElements ?? 0} คน)
          </p>
          <div className="flex flex-row gap-x-[10px]">
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0 || isLoadingAgents}
            >
              กลับ
            </Button>
            <Button
              variant={"ghost"}
              className="font-light border cursor-pointer"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={
                page >= (agentsData?.totalPages ?? 1) - 1 || isLoadingAgents
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
