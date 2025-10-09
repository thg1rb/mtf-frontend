import EmployerForm from '@/components/employer/EmployerForm'
import HeaderSection from '@/components/shared/HeaderSection'
import React from 'react'

export default function NewEmployerPage() {
  return (
    <div className='flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
      {/* HeaderSection */}
      <HeaderSection
        topic="เพิ่มนายจ้างใหม่"
        desc="กรอกข้อมูลนายจ้าง"
        hasBackButton={true} />

      {/* FormSection */}
      <EmployerForm mode='create' />
      
    </div>
  )
}
