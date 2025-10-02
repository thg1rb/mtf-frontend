'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EmploymentContractFormData, employmentContractSchema } from '@/lib/validations'
import { BriefcaseBusiness, Bus, Clock8, HandCoins, History, Hourglass, Printer, Save, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { type Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { EmploymentContract } from '@/types'

export default function EmploymentContactForm({ id, employmentContracts }: { id: string, employmentContracts: EmploymentContract[] }) {
    const router = useRouter();
    const [showValidationAlert, setShowValidationAlert] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<EmploymentContractFormData>({
        resolver: zodResolver(employmentContractSchema) as Resolver<EmploymentContractFormData>,
        mode: 'onChange',
        defaultValues: {
            daysOffWeeklyTh: "ตามกฎหมายคุ้มครองแรงงาน",
            daysOffWeeklyEn: "The Labour Protection Law",
            daysOffHolidayTh: "ตามกฎหมายคุ้มครองแรงงาน",
            daysOffHolidayEn: "The Labour Protection Law",
            daysAnnualLeaveTh: "ตามกฎหมายคุ้มครองแรงงาน",
            daysAnnualLeaveEn: "The Labour Protection Law",
            overtimeRateTh: "ตามกฎหมายคุ้มครองแรงงาน",
            overtimeRateEn: "The Labour Protection Law",
            holidayOvertimeRateTh: "ตามกฎหมายคุ้มครองแรงงาน",
            holidayOvertimeRateEn: "The Labour Protection Law",
        }
    });

    // Handler to populate form with selected work permit data
    const handleLoadEmploymentContract = (contract: EmploymentContract) => {
        setValue('typeOfWorkTh', contract.typeOfWorkTh);
        setValue('typeOfWorkEn', contract.typeOfWorkEn);
        setValue('incomePerDay', contract.incomePerDay);
        setValue('payIncomeDate', contract.payIncomeDate);
        setValue('periodOfEmployment', contract.periodOfEmployment);
        setValue('workingHourLimit', contract.workingHourLimit);
        setValue('workingDayPerWeek', contract.workingDayPerWeek);
        setValue('daysOffWeeklyTh', contract.daysOffWeeklyTh);
        setValue('daysOffWeeklyEn', contract.daysOffWeeklyEn);
        setValue('daysOffHolidayTh', contract.daysOffHolidayTh);
        setValue('daysOffHolidayEn', contract.daysOffHolidayEn);
        setValue('daysAnnualLeaveTh', contract.daysAnnualLeaveTh);
        setValue('daysAnnualLeaveEn', contract.daysAnnualLeaveEn);
        setValue('overtimeRateTh', contract.overtimeRateTh);
        setValue('overtimeRateEn', contract.overtimeRateEn);
        setValue('holidayOvertimeRateTh', contract.holidayOvertimeRateTh);
        setValue('holidayOvertimeRateEn', contract.holidayOvertimeRateEn);
    };

    // Form submit successfully (There is no invalid input)
    const handleFormSubmit = (data: EmploymentContractFormData) => {
        setShowValidationAlert(false);

        // POST method `/api/wp`

        console.log("Form data:", data);

        router.push(`/employees/${id}`);
    }

    // Form submit failed (There are invalid input )
    const handleFormInvalid = () => {
        setShowValidationAlert(true);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)} className='flex flex-col lg:flex-row gap-[45px]'>
            <div className='flex-2 flex flex-col gap-y-[29px] md:gap-y-[45px]'>
                {/* EmploymentInfoSection */}
                <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                    <div className='flex flex-row gap-x-[5px] items-center'>
                        <BriefcaseBusiness />
                        <p className='font-normal'>ตำแหน่งและอัตราค่าจ้าง</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='typeOfWorkTh' className='font-light text-zinc-700'>ประเภทงาน [ภาษาไทย]</Label>
                            <Input
                                id='typeOfWorkTh'
                                {...register('typeOfWorkTh')}
                            />
                            {errors.typeOfWorkTh && <span className='text-red-500 font-light'>{errors.typeOfWorkTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='typeOfWorkEn' className='font-light text-zinc-700'>ประเภทงาน [ภาษาอังกฤษ]</Label>
                            <Input
                                id='typeOfWorkEn'
                                {...register('typeOfWorkEn')}
                            />
                            {errors.typeOfWorkEn && <span className='text-red-500 font-light'>{errors.typeOfWorkEn.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='incomePerDay' className='font-light text-zinc-700'>ค่าจ้างต่อวัน (บาท)</Label>
                            <Input
                                id='incomePerDay'
                                {...register('incomePerDay', { valueAsNumber: true })}
                                type='number'
                                min={0}
                            />
                            {errors.incomePerDay && <span className='text-red-500 font-light'>{errors.incomePerDay.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='payIncomeDate' className='font-light text-zinc-700'>จ่ายค่าจ้างทุก ๆ วันที่เท่าไหร่ของเดือน</Label>
                            <Input
                                id='payIncomeDate'
                                {...register('payIncomeDate', { valueAsNumber: true })}
                                type='number'
                                min={0}
                            />
                            {errors.payIncomeDate && <span className='text-red-500 font-light'>{errors.payIncomeDate.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='periodOfEmployment' className='font-light text-zinc-700'>ระยะเวลาจ้าง (เดือน)</Label>
                            <Input
                                id='periodOfEmployment'
                                {...register('periodOfEmployment', { valueAsNumber: true })}
                                type='number'
                                min={0}
                            />
                            {errors.periodOfEmployment && <span className='text-red-500 font-light'>{errors.periodOfEmployment.message}</span>}
                        </div>

                    </div>
                </div>

                {/* PeriodOfEmploymentSection */}
                <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                    <div className='flex flex-row gap-x-[5px] items-center'>
                        <Hourglass />
                        <p className='font-normal'>ระยะเวลาจ้าง</p>
                    </div>
                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='periodOfEmployment' className='font-light text-zinc-700'>ระยะเวลาจ้าง (เดือน)</Label>
                        <Input
                            id='periodOfEmployment'
                            {...register('periodOfEmployment', { valueAsNumber: true })}
                            type='number'
                            min={0}
                        />
                        {errors.periodOfEmployment && <span className='text-red-500 font-light'>{errors.periodOfEmployment.message}</span>}
                    </div>
                </div>

                <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                    <div className='flex flex-row gap-x-[5px] items-center'>
                        <Clock8 />
                        <p className='font-normal'>ชั่วโมงการทำงาน</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='workingHourLimit' className='font-light text-zinc-700'>ชั่วโมงการทำงานปกติไม่เกิน (ชั่วโมง)</Label>
                            <Input
                                id='workingHourLimit'
                                {...register('workingHourLimit', { valueAsNumber: true })}
                                type='number'
                                min={0}
                            />
                            {errors.workingHourLimit && <span className='text-red-500 font-light'>{errors.workingHourLimit.message}</span>}
                        </div>
                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='workingDayPerWeek' className='font-light text-zinc-700'>ใน 1 สัปดาห์ทำงาน (วัน)</Label>
                            <Input
                                id='workingDayPerWeek'
                                {...register('workingDayPerWeek', { valueAsNumber: true })}
                                type='number'
                                min={0}
                                max={7}
                            />
                            {errors.workingDayPerWeek && <span className='text-red-500 font-light'>{errors.workingDayPerWeek.message}</span>}
                        </div>
                    </div>
                </div>

                {/* ...Section */}
                <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                    <div className='flex flex-row gap-x-[5px] items-center'>
                        <Bus />
                        <p className='font-normal'>วันหยุด</p>
                    </div>
                    <div className='flex flex-col gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysOffWeeklyTh' className='font-light text-zinc-700'>วันหยุดประจำสัปดาห์โดยได้รับค่าจ้างสัปดาห์ละ (วัน) [ภาษาไทย]</Label>
                            <Input id='daysOffWeeklyTh' {...register('daysOffWeeklyTh')} className='font-light hide-scrollbar' />
                            {errors.daysOffWeeklyTh && <span className='text-red-500 font-light'>{errors.daysOffWeeklyTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysOffWeeklyEn' className='font-light text-zinc-700'>วันหยุดประจำสัปดาห์โดยได้รับค่าจ้างสัปดาห์ละ (วัน) [ภาษาอังกฤษ]</Label>
                            <Input id='daysOffWeeklyEn' {...register('daysOffWeeklyEn')} className='font-light hide-scrollbar' />
                            {errors.daysOffWeeklyEn && <span className='text-red-500 font-light'>{errors.daysOffWeeklyEn.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysOffHolidayTh' className='font-light text-zinc-700'>วันหยุดพิเศษโดยได้รับค่าจ้างปีละ [ภาษาไทย]</Label>
                            <Input id='daysOffHolidayTh' {...register('daysOffHolidayTh')} className='font-light hide-scrollbar' />
                            {errors.daysOffHolidayTh && <span className='text-red-500 font-light'>{errors.daysOffHolidayTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysOffHolidayEn' className='font-light text-zinc-700'>วันหยุดพิเศษโดยได้รับค่าจ้างปีละ [ภาษาอังกฤษ]</Label>
                            <Input id='daysOffHolidayEn' {...register('daysOffHolidayEn')} className='font-light hide-scrollbar' />
                            {errors.daysOffHolidayEn && <span className='text-red-500 font-light'>{errors.daysOffHolidayEn.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysAnnualLeaveTh' className='font-light text-zinc-700'>เมื่อลูกจ้างทำงานครบ 1 ปี นายจ้างให้ลูกจ้างหยุดประจำปี โดยได้รับค่าจ้างเป็นเวลา [ภาษาไทย]</Label>
                            <Input id='daysAnnualLeaveTh' {...register('daysAnnualLeaveTh')} className='font-light hide-scrollbar' />
                            {errors.daysAnnualLeaveTh && <span className='text-red-500 font-light'>{errors.daysAnnualLeaveTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='daysAnnualLeaveEn' className='font-light text-zinc-700'>เมื่อลูกจ้างทำงานครบ 1 ปี นายจ้างให้ลูกจ้างหยุดประจำปี โดยได้รับค่าจ้างเป็นเวลา [ภาษาอังกฤษ]</Label>
                            <Input id='daysAnnualLeaveEn' {...register('daysAnnualLeaveEn')} className='font-light hide-scrollbar' />
                            {errors.daysAnnualLeaveEn && <span className='text-red-500 font-light'>{errors.daysAnnualLeaveEn.message}</span>}
                        </div>
                    </div>
                </div>

                {/* ...Section */}
                <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                    <div className='flex flex-row gap-x-[5px] items-center'>
                        <HandCoins />
                        <p className='font-normal'>ค่าล่วงเวลา</p>
                    </div>
                    <div className='flex flex-col gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='overtimeRateTh' className='font-light text-zinc-700'>ลูกจ้างทำงานเกินเวลาทำงานปกติ นายจ้างต้องจ่ายค่าล่วงเวลาให้ลูกจ้างในอัตรา [ภาษาไทย]</Label>
                            <Input id='overtimeRateTh' {...register('overtimeRateTh')} className='font-light hide-scrollbar' />
                            {errors.overtimeRateTh && <span className='text-red-500 font-light'>{errors.overtimeRateTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='overtimeRateEn' className='font-light text-zinc-700'>ลูกจ้างทำงานเกินเวลาทำงานปกติ นายจ้างต้องจ่ายค่าล่วงเวลาให้ลูกจ้างในอัตรา [ภาษาอังกฤษ]</Label>
                            <Input id='overtimeRateEn' {...register('overtimeRateEn')} className='font-light hide-scrollbar' />
                            {errors.overtimeRateEn && <span className='text-red-500 font-light'>{errors.overtimeRateEn.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='holidayOvertimeRateTh' className='font-light text-zinc-700'>ลูกจ้างทำงานล่วงเวลาในวันหยุด นายจ้างต้องจ่ายค่าล่วงเวลาให้ลูกจ้างในอัตรา [ภาษาไทย]</Label>
                            <Input id='holidayOvertimeRateTh' {...register('holidayOvertimeRateTh')} className='font-light hide-scrollbar' />
                            {errors.holidayOvertimeRateTh && <span className='text-red-500 font-light'>{errors.holidayOvertimeRateTh.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-[10px]'>
                            <Label htmlFor='holidayOvertimeRateEn' className='font-light text-zinc-700'>ลูกจ้างทำงานล่วงเวลาในวันหยุด นายจ้างต้องจ่ายค่าล่วงเวลาให้ลูกจ้างในอัตรา [ภาษาไทย]</Label>
                            <Input id='holidayOvertimeRateEn' {...register('holidayOvertimeRateEn')} className='font-light hide-scrollbar' />
                            {errors.holidayOvertimeRateEn && <span className='text-red-500 font-light'>{errors.holidayOvertimeRateEn.message}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* OperationsSection*/}
            <div className='flex-1 flex flex-col gap-y-[25px] p-[27px] h-min border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Sparkles />
                    <p className='font-normal'>การดำเนินการ</p>
                </div>
                <div className='flex flex-col gap-y-[25px] '>
                    <div className='flex flex-col gap-y-[18px]'>
                        {employmentContracts.map((contract) => (
                            <Button
                                key={contract.id}
                                type='button'
                                variant='outline'
                                className='flex flex-row justify-start font-light cursor-pointer'
                                onClick={() => handleLoadEmploymentContract(contract)}
                            >
                                <History />
                                {contract.createdAt.toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Button>
                        ))}
                        <Button type='submit' className='flex flex-row justify-start cursor-pointer'>
                            <Save />
                            <p className="font-light">บันทึกข้อมูลล่าสุด</p>
                        </Button>
                        <Button type='button' className='flex flex-row justify-start cursor-pointer'>
                            <Printer />
                            <p className="font-light">พิมพ์เอกสาร</p>
                        </Button>

                        <AlertDialog open={showValidationAlert} onOpenChange={setShowValidationAlert}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='font-medium'>บันทึกข้อมูลของเอกสาร บต. 46 ไม่สำเร็จ</AlertDialogTitle>
                                    <AlertDialogDescription className='font-light'>
                                        ระบุข้อมูลของนายจ้างให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลของนายจ้างให้ถูกต้องก่อนคลิก บันทึกข้อมูล
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className='font-light'>ตกลง</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </form>
    )
}