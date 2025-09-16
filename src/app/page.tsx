"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Users, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='m-auto max-w-[1000px]'>
      <div className='flex flex-row gap-x-[120px]'>
        <div className='w-1/2 hidden lg:flex flex-col gap-y-[18px]'>
          <div className='flex flex-row items-center gap-x-[12px]'>
            <div className='flex flex-col justify-center items-center w-14 h-14 bg-black rounded-[12px]'>
              <Users className='w-6 h-6 text-white' />
            </div>
            <div className='flex flex-col'>
              <p className='font-medium'>MTF Manpower</p>
              <p className='font-light'>ระบบจัดการเอกสารแรงงานต่างด้าว</p>
            </div>
          </div>
          <div className='font-normal !text-lg text-zinc-500'>
            <p>ระบบจัดการเอกสารแรงงานต่างด้าวจากประเทศเมียนม่า ลาว<br />และกัมพูชา ที่จะช่วยทำให้การจัดการเอกสารเป็นระบบระเบียบ<br />ราบรื่น และถูกต้อง</p>
          </div>
          <div className='flex flex-col gap-y-[10px] px-[53px]'>
            <div className='flex flex-col'>
              <p className='font-normal !text-[18px]'>จัดการข้อมูลแรงงานและเอกสาร</p>
              <p className='font-light text-zinc-400'>เพิ่ม แก้ไข และติดตามข้อมูลของนายจ้างและลูกจ้างได้ในระบบเดียว</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-normal !text-[18px]'>ติดตามความคืบหน้าการดำเนินงาน</p>
              <p className='font-light text-zinc-400'>แสดงสถานะและขั้นตอนปัจจุบัน ช่วยให้นายหน้าตรวจสอบได้สะดวก</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-normal !text-[18px]'>แจ้งเตือนอัตโนมัติเมื่อเอกสารใกล้หมดอายุ</p>
              <p className='font-light text-zinc-400'>ลดปัญหาการลืมวันหมดอายุ และช่วยป้องกันความผิดพลาด</p>
            </div>
          </div>
        </div>

        <div className='w-[350px] lg:w-1/2 flex flex-col gap-y-[32px] bg-white px-[36px] lg:px-[48px] py-[24px] lg:py-[36px] rounded-2xl border-[1px] shadow-2xl'>
          <div className='flex flex-col items-center gap-y-[8px]'>
            <p className='font-medium'>เข้าสู่ระบบ</p>
            <p className='font-light text-center text-zinc-400'>กรุณาเข้าสู่ระบบเพื่อจัดการแรงงานต่างด้าว</p>
          </div>
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='email' className='font-light'>อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="กรุณากรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <Label htmlFor='password' className='font-light'>รหัสผ่าน</Label>
              {/* TODO: hide and show password */}
              <div className='relative'>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <Button className='font-light'>เข้าสู่ระบบ</Button>
        </div>
      </div>
    </div>
  )
}
