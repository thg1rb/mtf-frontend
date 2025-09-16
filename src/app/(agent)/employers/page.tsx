import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Button } from '@/components/ui/button'
import { Plus, UserCheck2, Users2, UserX2 } from 'lucide-react'
import Link from 'next/link'

const statItems = [
    {
    id: 'stat-1',
    title: 'นายจ้างทั้งหมด (คน)',
    amount: 100,
    amountTextColor: 'text-black',
    icon: Users2,
  },
  {
    id: 'stat-2',
    title: 'นายจ้างที่ใช้งานได้ (คน)',
    amount: 100,
    amountTextColor: 'text-green-500',
    icon: UserCheck2,
  },
  {
    id: 'stat-3',
    title: 'นายจ้างที่ไม่ใช้งาน (คน)',
    amount: 1000,
    amountTextColor: 'text-red-500',
    icon: UserX2,
  },
]

export default function EmployersPage() {
  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='นายจ้าง'
        desc='ข้อมูลนายจ้างทั้งหมดในระบบ'
        rightActionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/employers/new'>
              <Plus className='size-[24px] mr-2' />
              เพิ่มนายจ้างใหม่
            </Link>
          </Button>} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      
    </div>
  )
}
