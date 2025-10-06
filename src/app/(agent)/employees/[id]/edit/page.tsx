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
import { Button } from "@/components/ui/button";
import { getEmployeeById } from "@/lib/mock-data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function EmployeeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // TODO: GET method `/api/employees/${id}` to fetch existing employer details
  const data = getEmployeeById(id);

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="แก้ไขข้อมูลของลูกจ้าง" hasBackButton={true} />

      {/* FormSection */}
      <EmployeeForm mode="edit" defaultValues={data} />

      {/* EmployerNotFoundSection */}
      {!data && (
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
