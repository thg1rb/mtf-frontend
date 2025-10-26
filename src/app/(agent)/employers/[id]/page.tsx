"use client";

import EmployerForm from "@/components/employer/EmployerForm";
import EmployerFormSkeleton from "@/components/employer/EmployerFormSkeleton";
import HeaderSection from "@/components/shared/HeaderSection";
import EmployeeByEmployerIdTableSection from "@/components/employee/EmployeeByEmployerIdTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getEmployerQueryOption } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";

export default function EmployerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: employerData, isLoading: isLoadingEmployer } = useQuery(
    getEmployerQueryOption(id),
  );

  if (!id || isLoadingEmployer) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="ข้อมูลของนายจ้าง"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        <EmployerFormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลของนายจ้าง"
        hasBackButton={true}
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

      {/* FormSection */}
      <EmployerForm mode="view" defaultValues={employerData} />

      {/* EmployeeByEmployerIdTableSection */}
      <EmployeeByEmployerIdTableSection employerId={id} />

      {/* EmployerNotFoundSection */}
      {!employerData && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                ไม่พบข้อมูลนายจ้าง
              </AlertDialogTitle>
              <AlertDialogDescription className="font-light">
                ตรวจสอบหมายเลขประจำตัวผู้เสียภาษีของนายจ้างว่าอยู่ในระบบหรือไม่
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="font-light">
                <Link href="/employers">ย้อนกลับ</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
