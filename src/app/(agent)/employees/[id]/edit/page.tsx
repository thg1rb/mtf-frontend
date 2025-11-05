'use client'

import EmployeeForm from "@/components/employee/EmployeeForm";
import EmployeeFormSkeleton from "@/components/employee/EmployeeFormSkeleton";
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

  // Transform documents array to form format
  const transformDocumentsToForm = (documents: { id: string; type: string; expiryDate: string }[]) => {
    const result: {
      healthCheckExpiryDate?: string | null;
      insuranceExpiryDate?: string | null;
      workPermitExpiryDate?: string | null;
      certificateOfIdentityExpiryDate?: string | null;
      nonThaiIdentificationExpiryDate?: string | null;
    } = {};

    documents.forEach((doc) => {
      switch (doc.type) {
        case "ใบรับรองแพทย์":
          result.healthCheckExpiryDate = doc.expiryDate;
          break;
        case "ประกันสุขภาพ":
          result.insuranceExpiryDate = doc.expiryDate;
          break;
        case "ใบอนุญาตทำงาน":
          result.workPermitExpiryDate = doc.expiryDate;
          break;
        case "เอกสาร CI":
          result.certificateOfIdentityExpiryDate = doc.expiryDate;
          break;
        case "บัตรชมพู":
          result.nonThaiIdentificationExpiryDate = doc.expiryDate;
          break;
      }
    });

    return result;
  };

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
        documents: transformDocumentsToForm(employeeData.documents),
      }
    : undefined;

  if (!id || isLoading) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="แก้ไขข้อมูลของลูกจ้าง"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        <EmployeeFormSkeleton />
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
