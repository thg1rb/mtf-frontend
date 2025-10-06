import WorkPermitForm from '@/components/document/WorkPermitForm'
import HeaderSection from '@/components/shared/HeaderSection'
import { Button } from '@/components/ui/button'
import { findWorkPermitsByEmployeeId } from '@/lib/mock-data'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function WorkPermitPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // TODO: GET method `/api/employers/${id}` to fetch existing employer details
  const data = findWorkPermitsByEmployeeId(id);

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
      {/* HeaderSection */}
      <HeaderSection
        topic="เอกสาร บต.46"
        hasBackButton={
          <Button asChild variant="ghost" className='flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer'>
            <Link href={`/employees/${id}`}>
              <ChevronLeft className='size-[24px] mr-2' />
              ย้อนกลับ
            </Link>
          </Button>} />

      {/* FormSection */}
      <WorkPermitForm id={id} workPermits={data}/>

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
  )
}
