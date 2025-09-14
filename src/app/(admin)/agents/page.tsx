import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import StatGrid from '@/components/shared/StatGrid'
import HeaderSection from '@/components/shared/HeaderSection'

const statItems = [
  {
    id: 'stat-1',
    title: 'สถิติที่ 1',
    amount: 100,
    amountTextColor: 'text-black',
    icon: Plus,
  },
  {
    id: 'stat-2',
    title: 'สถิติที่ 2',
    amount: 100,
    amountTextColor: 'text-green-500',
    icon: Plus,
  },
  {
    id: 'stat-3',
    title: 'สถิติที่ 3',
    amount: 1000,
    amountTextColor: 'text-red-500',
    icon: Plus,
  },
]

export default function AgentsPage() {
  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
      {/* TODO: HeaderSection */}
      <HeaderSection
        topic='อะไรก็ได้'
        desc='อธิบายเพิ่มเติม...'
        actionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/agents/new'>
              <Plus className='size-[24px] mr-2' />
              กดเพื่อกระทำ!
            </Link>
          </Button>
        }
      />

      {/* TODO: StatSection */}
      <StatGrid statItems={statItems} />

      {/* TODO: TableSection */}
      <div>
        
      </div>

    </div>
  )
}
