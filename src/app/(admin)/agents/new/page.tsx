'use client'

import HeaderSection from '@/components/shared/HeaderSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, Home, Info } from 'lucide-react'
import React, { useState } from 'react'

export default function NewAgentPage() {
  const [status, setStatus] = useState<string>("");
  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic="เพิ่มนายหน้าใหม่"
        desc="กรอกข้อมูลนายหน้า"
        leftActionButton={
          <Button variant="ghost" className='flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer'>
            <ChevronLeft className='size-[24px] mr-2' />
            ย้อนกลับ
          </Button>} />

      {/* FormSection */}
      <form action="" className='flex flex-col gap-y-[45px]'>
        {/* PersonalInfoSection */}
        <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
          <div className='flex flex-rol gap-x-[5px] items-center'>
            <Info />
            <p className='font-normal'>ข้อมูลนายหน้า</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='citizenId' className='font-light' >เลขประจำตัวประชาชน (13 หลัก)</Label>
              <Input id='citizenId' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='email' className='font-light' >อีเมล</Label>
              <Input id='email' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='firstname' className='font-light' >ชื่อจริง</Label>
              <Input id='firstname' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='lastname' className='font-light' >นามสกุล</Label>
              <Input id='lastname' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='status' className='font-light' >สถานะ</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className='w-full font-light cursor-pointer'>
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className='cursor-pointer'>ใช้งาน</SelectItem>
                  <SelectItem value="inactive" className='cursor-pointer'>ไม่ใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* AddressInfoSection */}
        <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
          <div className='flex flex-rol gap-x-[5px] items-center'>
            <Home />
            <p className='font-normal'>ข้อมูลนายหน้า</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='addressDetails' className='font-light' >บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาไทย]</Label>
              <Input id='addressDetails' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='disrict' className='font-light' >เขต/อำเภอ</Label>
              <Input id='disrict' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='subDistrict' className='font-light' >แขวง/ตำบล</Label>
              <Input id='subDistrict' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='province' className='font-light' >จังหวัด</Label>
              <Input id='province' />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='postelCode' className='font-light' >รหัสไปรษณีย์</Label>
              <Input id='postelCode' />
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
          <Button variant='ghost' className=' font-light border border-slate-300'>ยกเลิก</Button>
          <Button type='submit' className='font-light'>บันทึกข้อมูล</Button>
        </div>
      </form>
    </div>
  )
}
