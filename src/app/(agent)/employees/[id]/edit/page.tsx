'use client'

import EmployeeForm from "@/components/employee/EmployeeForm";
import HeaderSection from "@/components/shared/HeaderSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getEmployeeQueryOption } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { use } from "react";

export default function EmployeeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: employeeData, isLoading } = useQuery(
    getEmployeeQueryOption(id)
  );

  // Transform API response to form props
  const employeeFormProps = employeeData
    ? {
        passportNumber: employeeData.passportNumber,
        employerId: employeeData.currentEmployer?.employerId || "",
        firstname: employeeData.firstname,
        lastname: employeeData.lastname,
        nationality: employeeData.nationality,
        bloodType: employeeData.bloodType,
        status: employeeData.status,
        address: employeeData.address,
        documents: employeeData.documents as any, // Documents array will be transformed by EmployeeForm
      }
    : undefined;

  if (!id || isLoading) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="ข้อมูลของนายจ้าง"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        {/* TODO: EmployeeSkeleton */}
        {/* <EmployerFormSkeleton /> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="แก้ไขข้อมูลของลูกจ้าง" hasBackButton={true} />

      {/* FormSection */}
      <EmployeeForm mode="edit" defaultValues={employeeFormProps} />

      {/* EmployerNotFoundSection */}
      {!employeeFormProps && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                ไม่พบข้อมูลลูกจ้าง
              </AlertDialogTitle>
              <AlertDialogDescription className="font-light">
                ตรวจสอบหมายเลขประจำตัวผู้เสียภาษีของลูกจ้างว่าอยู่ในระบบหรือไม่
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="font-light">
                <Link href="/employees">ย้อนกลับ</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
