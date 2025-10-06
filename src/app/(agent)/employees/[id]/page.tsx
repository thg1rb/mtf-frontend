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
import { File, Files, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function EmployeePage({
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
      <HeaderSection
        topic="ข้อมูลของลูกจ้าง"
        hasBackButton={true}
        rightActionButtons={[
          <Button
            asChild
            key="แก้ไขข้อมูล"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href={`/employees/${id}/edit`}>
              <SquarePen className="size-[24px] mr-2" />
              แก้ไขข้อมูล
            </Link>
          </Button>,
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-x-[53px] gap-y-[51px]">
        {/* FormSection */}
        <div className="flex-2">
          <EmployeeForm mode="view" defaultValues={data} />
        </div>

        <div className="flex-1 flex flex-col gap-y-[25px] p-[27px] h-min border border-slate-300 rounded-2xl shadow-md">
          <div className="flex flex-row gap-x-[5px] items-center">
            <Files />
            <p className="font-normal">เอกสารที่เกี่ยวข้อง</p>
          </div>
          <div className="flex flex-col gap-y-[25px] ">
            <div className="flex flex-col gap-y-[18px]">
              <Button
                asChild
                variant="outline"
                className="flex flex-row justify-start cursor-pointer"
              >
                <Link href={`/employees/${id}/wp`}>
                  <File />
                  <p className="font-light">หนังสือรับรองการจ้าง (บต. 46)</p>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex flex-row justify-start cursor-pointer"
              >
                <Link href={`/employees/${id}/contract`}>
                  <File />
                  <p className="font-light">สัญญาจ้าง 3 ภาษา</p>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex flex-row justify-start cursor-pointer"
              >
                <Link href="/">
                  <File />
                  <p className="font-light">หนังสือมอบอำนาจ</p>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* EmployerNotFoundSection */}
        {!data && (
          <AlertDialog open={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-medium">
                  ไม่พบข้อมูลลูกจ้าง
                </AlertDialogTitle>
                <AlertDialogDescription className="font-light">
                  ตรวจสอบหมายเลขประจำตัวลูกจ้างว่าอยู่ในระบบหรือไม่
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
    </div>
  );
}
