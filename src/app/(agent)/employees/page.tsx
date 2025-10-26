"use client";

import EmployeeTable from "@/components/employee/EmployeeTable";
import HeaderSection from "@/components/shared/HeaderSection";
import StatGrid from "@/components/shared/StatGrid";
import { Button } from "@/components/ui/button";
import { getEmployeeStatsQueryOption } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, CircleX, Loader, Plus, Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EmployersPage() {
  const { data: employeeStats } = useQuery(getEmployeeStatsQueryOption());
  const statItems = [
    {
      id: "stat-1",
      title: "ลูกจ้างจ้างทั้งหมด (คน)",
      amount: employeeStats?.totalEmployees ?? 0,
      amountTextColor: "text-black",
      icon: Users2,
    },
    {
      id: "stat-2",
      title: "เอกสารที่ใช้งานได้ (คน)",
      amount: employeeStats?.validDocumentEmployees ?? 0,
      amountTextColor: "text-green-500",
      icon: CheckCircle2,
    },
    {
      id: "stat-3",
      title: "เอกสารใกล้หมดอายุ (คน)",
      amount: employeeStats?.expiringSoonEmployees ?? 0,
      amountTextColor: "text-yellow-400",
      icon: Loader,
    },
    {
      id: "stat-4",
      title: "เอกสารหมดอายุ (คน)",
      amount: employeeStats?.expiredDocumentEmployees ?? 0,
      amountTextColor: "text-red-500",
      icon: CircleX,
    },
  ];

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="จัดการลูกจ้าง"
        desc="ข้อมูลลูกจ้างทั้งหมดในระบบ"
        hasBackButton={false}
        rightActionButtons={[
          <Button
            asChild
            key="เพิ่มลูกจ้างใหม่"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href="/employees/new">
              <Plus className="size-[24px] mr-2" />
              เพิ่มลูกจ้างใหม่
            </Link>
          </Button>,
        ]}
      />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      <EmployeeTable />
    </div>
  );
}
