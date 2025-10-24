"use client";

import WorkPermitForm from "@/components/document/WorkPermitForm";
import HeaderSection from "@/components/shared/HeaderSection";
import {
  getEmployeeQueryOption,
  getWorkPermit46HistoryQueryOption,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

export default function WorkPermitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: employeeData, isLoading: isLoadingEmployee } = useQuery(
    getEmployeeQueryOption(id),
  );

  const { data: workPermitHistory, isLoading: isLoadingWorkPermits } = useQuery(
    {
      ...getWorkPermit46HistoryQueryOption({
        passportNo: id,
        employerId: employeeData?.currentEmployer?.employerId ?? "",
        limit: 5,
      }),
      enabled: !!employeeData?.currentEmployer?.employerId, // Only fetch when employerId is available
    },
  );

  // // TODO: GET method `/api/employers/${id}` to fetch existing employer details
  // const data = findWorkPermitsByEmployeeId(id);

  if (!id || isLoadingEmployee || isLoadingWorkPermits) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="แก้ไขข้อมูลของลูกจ้าง"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        {/* TODO: WorkPermitFormSkeleton */}
        {/* <EmployeeFormSkeleton /> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="เอกสาร บต.46" hasBackButton={true} />

      {/* WorkPermitFormSection */}
      <WorkPermitForm
        employeeId={id}
        employerId={employeeData?.currentEmployer.employerId ?? ""}
        workPermitHistory={workPermitHistory ?? []}
      />

      {/* EmployerNotFoundSection */}
      {/* {!data && <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='font-medium'>ไม่พบข้อมูลนายจ้าง</AlertDialogTitle>
            <AlertDialogDescription className='font-light'>
              ตรวจสอบหมายเลขประจำตัวผู้เสียภาษีของนายจ้างว่าอยู่ในระบบหรือไม่
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='font-light'>
              <Link href='/employers'>ย้อนกลับ</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>} */}
    </div>
  );
}
