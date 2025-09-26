import HeaderSection from '@/components/shared/HeaderSection'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

export default function AgentPage() {
    // TODO: Get agent details from ID

    return (
        <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
            {/* HeaderSection */}
            <HeaderSection
                topic="แก้ไขข้อมูลนายหน้า"
                desc="กรอกข้อมูลนายหน้า"
                leftActionButton={
                    <Button variant="ghost" className='flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer'>
                        <ChevronLeft className='size-[24px] mr-2' />
                        ย้อนกลับ
                    </Button>} />

            {/* TODO: agent form with view mode */}
        </div>
    )
}
