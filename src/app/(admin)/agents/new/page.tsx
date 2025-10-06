'use client'

import AgentForm from '@/components/agent/AgentForm'
import HeaderSection from '@/components/shared/HeaderSection'
import React from 'react'

export default function NewAgentPage() {
  return (
    <div className='flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic="เพิ่มนายหน้าใหม่"
        desc="กรอกข้อมูลนายหน้า"
        hasBackButton={true} />

      {/* FormSection */}
      <AgentForm mode='create'/>
    </div>
  )
}
