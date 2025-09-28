'use client'

import EmployeeTable from '@/components/employee/EmployeeTable'
import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Button } from '@/components/ui/button'
import { countEmployeesDocumentExpired, countEmployeesDocumentNearlyExpired, countEmployeesDocumentValid, countTotalEmployees, mockEmployees } from '@/lib/mock-data'
import { Employee } from '@/types'
import { CheckCircle2, CircleX, Loader, Plus, Users2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const statItems = [
  {
    id: 'stat-1',
    title: 'ลูกจ้างจ้างทั้งหมด (คน)',
    amount: countTotalEmployees(),
    amountTextColor: 'text-black',
    icon: Users2,
  },
  {
    id: 'stat-2',
    title: 'เอกสารที่ใช้งานได้ (คน)',
    amount: countEmployeesDocumentValid(),
    amountTextColor: 'text-green-500',
    icon: CheckCircle2,
  },
  {
    id: 'stat-3',
    title: 'เอกสารใกล้หมดอายุ (คน)',
    amount: countEmployeesDocumentNearlyExpired(),
    amountTextColor: 'text-yellow-400',
    icon: Loader,
  },
  {
    id: 'stat-4',
    title: 'เอกสารหมดอายุ (คน)',
    amount: countEmployeesDocumentExpired(),
    amountTextColor: 'text-red-500',
    icon: CircleX,
  },
]

export default function EmployersPage() {
  const [employees] = useState<Employee[]>(mockEmployees); // TODO: search and filter employees

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='ลูกจ้าง'
        desc='ข้อมูลลูกจ้างทั้งหมดในระบบ'
        rightActionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/employees/new'>
              <Plus className='size-[24px] mr-2' />
              เพิ่มลูกจ้างใหม่
            </Link>
          </Button>} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TODO: TableSection */}
      <EmployeeTable employees={employees}/>

    </div>
  )
}
