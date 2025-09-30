import EmployeeTable from '@/components/employee/EmployeeTable'
import EmployerForm from '@/components/employer/EmployerForm'
import HeaderSection from '@/components/shared/HeaderSection'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { findEmployeesByEmployerId, findEmployerById } from '@/lib/mock-data'
import { ChevronLeft, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function EmployerPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // TODO: GET method `/api/employers/${id}` to fetch existing employer details
  const data = findEmployerById(id);
  const employees = findEmployeesByEmployerId(id);

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลของนายจ้าง"
        leftActionButton={
          <Button asChild variant="ghost" className='flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer'>
            <Link href='/employers'>
              <ChevronLeft className='size-[24px] mr-2' />
              ย้อนกลับ
            </Link>
          </Button>}
        rightActionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href={`/employers/${id}/edit`}>
              <SquarePen className='size-[24px] mr-2' />
              แก้ไขข้อมูล
            </Link>
          </Button>
        } />


      {/* FormSection */}
      <EmployerForm mode='view' defaultValues={data} />

      {/* TODO: EmployeeTableSection */}
      <EmployeeTable employees={employees} />

      {/* EmployerNotFoundSection */}
      {!data && <AlertDialog open={true}>
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
      </AlertDialog>}
    </div>
  )
}
