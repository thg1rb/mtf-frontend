'use client'

import EmploymentContactForm from "@/components/document/EmploymentContactForm";
import HeaderSection from "@/components/shared/HeaderSection";
import { getEmployeeQueryOption, getEmploymentContractHistoryQueryOption } from "@/lib/api";
import { findEmploymentContractsByEmployeeId } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

export default function WorkPermitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: employeeData, isLoading: isLoadingEmployee } = useQuery(
    getEmployeeQueryOption(id)
  );

  const { data: employmentContractHistory, isLoading: isLoadingContracts } = useQuery({
    ...getEmploymentContractHistoryQueryOption({
      passportNo: id,
      employerId: employeeData?.currentEmployer?.employerId ?? "",
      limit: 5
    }),
    enabled: !!employeeData?.currentEmployer?.employerId, // Only fetch when employerId is available
  });

  if (isLoadingEmployee || isLoadingContracts) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!employmentContractHistory) {
    return <div className="flex justify-center items-center h-screen">No contract history found</div>;
  }

  return(
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="เอกสาร บต.46" hasBackButton={true} />

      {/* WorkPermitFormSection */}
      <EmploymentContactForm employeeId={id} employerId={employeeData?.currentEmployer.employerId ?? ""} employmentContractHistory={employmentContractHistory ?? []} />

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
