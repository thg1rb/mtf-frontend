import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Button } from '@/components/ui/button'
import { CircleCheck, Files, Loader, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const statItems = [
  {
    id: 'stat-1',
    title: 'งานทั้งหมด (งาน)',
    amount: 100, // TODO: GET method `/api/tasks`
    amountTextColor: 'text-black',
    icon: Files,
  },
  {
    id: 'stat-2',
    title: 'ดำเนินการเสร็จสิ้น (งาน)',
    amount: 100, // TODO: GET method
    amountTextColor: 'text-green-500',
    icon: CircleCheck,
  },
  {
    id: 'stat-3',
    title: 'กำลังดำเนินการ (งาน)',
    amount: 100, // TODO: GET method
    amountTextColor: 'text-yellow-400',
    icon: Loader,
  },
]

export default function DocumentsPage() {
  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='จัดการงาน'
        desc='ติดตามขั้นตอนการดำเนินการของแรงงานต่างด้าวทั้งหมดในระบบ'
        rightActionButton={[
          (<Button asChild key="ขึ้นทะเบียนใหม่" className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/tasks/register/new'>
              <Plus className='size-[24px] mr-2' />
              ขึ้นทะเบียนใหม่
            </Link>
          </Button>), 
          (<Button asChild key="ต่ออายุใบอนุญาต" variant='outline' className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/tasks/renew/new'>
              <Plus className='size-[24px] mr-2' />
              ต่ออายุใบอนุญาต
            </Link>
          </Button>)
        ]} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />
    </div>
  )
}
