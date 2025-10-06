import EmployerForm from "@/components/employer/EmployerForm";
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
import { getEmployerById } from "@/lib/mock-data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function EmployerEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // TODO: GET method `/api/employers/${id}` to fetch existing employer details
  const data = getEmployerById(id);

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="แก้ไขข้อมูลของนายจ้าง" hasBackButton={true} />

      {/* FormSection */}
      <EmployerForm mode="edit" defaultValues={data} />

      {/* EmployerNotFoundSection */}
      {!data && (
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
