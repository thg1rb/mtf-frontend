'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmployerFormData, employerSchema, financialStatusYearOptions } from '@/lib/validations'
import { Building, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, type Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'

interface EmployerFormProps {
    mode: "create" | "view" | "edit"
    defaultValues?: Partial<EmployerFormData>
}

export default function EmployerForm({ mode, defaultValues }: EmployerFormProps) {
    const router = useRouter();
    const [showValidationAlert, setShowValidationAlert] = useState(false);

    const cleanedDefaultValues: Partial<EmployerFormData> = useMemo(() => ({
        taxId: defaultValues?.taxId ?? "",
        firstname: defaultValues?.firstname ?? "",
        lastname: defaultValues?.lastname ?? "",
        companyName: defaultValues?.companyName ?? "",
        businessType: defaultValues?.businessType ?? "",
        phoneNumber: defaultValues?.phoneNumber ?? "",
        email: defaultValues?.email ?? "",
        status: defaultValues?.status ?? "active",
        financialStatusYear: defaultValues?.financialStatusYear ?? financialStatusYearOptions[0],
        financialStatusIncome: defaultValues?.financialStatusIncome,
        financialStatusTax: defaultValues?.financialStatusTax,
        currentIncome: defaultValues?.currentIncome,
        currentIncomeDuration: defaultValues?.currentIncomeDuration,
        addressDetailsTh: defaultValues?.addressDetailsTh ?? "",
        districtTh: defaultValues?.districtTh ?? "",
        subDistrictTh: defaultValues?.subDistrictTh ?? "",
        provinceTh: defaultValues?.provinceTh ?? "",
        addressDetailsEn: defaultValues?.addressDetailsEn ?? "",
        districtEn: defaultValues?.districtEn ?? "",
        subDistrictEn: defaultValues?.subDistrictEn ?? "",
        provinceEn: defaultValues?.provinceEn ?? "",
        postalCode: defaultValues?.postalCode ?? "",
    }), [defaultValues]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<EmployerFormData>({
        resolver: zodResolver(employerSchema) as Resolver<EmployerFormData>,
        defaultValues: cleanedDefaultValues,
        mode: 'onChange'
    });

    const convertCetoBe = (year: number) => year + 543;

    useEffect(() => {
        reset(cleanedDefaultValues);
    }, [cleanedDefaultValues, reset]);

    // Form submit successfully (There is no invalid input)
    const handleFormSubmit = (data: EmployerFormData) => {
        setShowValidationAlert(false);
        if (mode === "create") {
            // TODO: POST method `api/employers`
        } else if (mode === "edit") {
            // TODO: PUT method `api/employers/{id}`
        }

        console.log("Form data:", data);

        router.push("/employers");
    }

    // Form submit failed (There are invalid input )
    const handleFormInvalid = () => {
        setShowValidationAlert(true);
    }

    const isReadOnly = mode === "view";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)} className='flex flex-col gap-y-[29px] md:gap-y-[45px]'>
            {/* EmployerInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>ข้อมูลนายจ้าง</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='taxId' className='font-light text-zinc-700'>เลขประจำตัวผู้เสียภาษี (13 หลัก)</Label>
                        <Input
                            readOnly={isReadOnly}
                            maxLength={13}
                            inputMode='numeric'
                            id='taxId'
                            {...register('taxId')}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.taxId && <span className='text-red-500 font-light'>{errors.taxId.message}</span>}
                    </div>

                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='status' className='font-light text-zinc-700'>สถานะ</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value ?? 'active'}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='w-full font-light cursor-pointer'>
                                        <SelectValue placeholder='สถานะ' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='active' className='cursor-pointer'>ใช้งาน</SelectItem>
                                        <SelectItem value='inactive' className='cursor-pointer'>ไม่ใช้งาน</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <span className='text-red-500 font-light'>{errors.status.message}</span>}
                            </div>
                        )}
                    />

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='companyName' className='font-light text-zinc-700'>ชื่อบริษัท</Label>
                        <Input readOnly={isReadOnly} id='companyName' {...register('companyName')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.companyName && <span className='text-red-500 font-light'>{errors.companyName.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='businessType' className='font-light text-zinc-700'>ประเภทธุรกิจ</Label>
                        <Input readOnly={isReadOnly} id='businessType' {...register('businessType')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.businessType && <span className='text-red-500 font-light'>{errors.businessType.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='firstname' className='font-light text-zinc-700'>ชื่อผู้ติดต่อ</Label>
                        <Input readOnly={isReadOnly} id='firstname' {...register('firstname')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.firstname && <span className='text-red-500 font-light'>{errors.firstname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='lastname' className='font-light text-zinc-700'>นามสกุลผู้ติดต่อ</Label>
                        <Input readOnly={isReadOnly} id='lastname' {...register('lastname')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.lastname && <span className='text-red-500 font-light'>{errors.lastname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='phoneNumber' className='font-light text-zinc-700'>หมายเลขโทรศัพท์</Label>
                        <Input
                            readOnly={isReadOnly}
                            maxLength={10}
                            inputMode='numeric'
                            id='phoneNumber'
                            {...register('phoneNumber')}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.phoneNumber && <span className='text-red-500 font-light'>{errors.phoneNumber.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='email' className='font-light text-zinc-700'>อีเมล</Label>
                        <Input readOnly={isReadOnly} type='email' id='email' {...register('email')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.email && <span className='text-red-500 font-light'>{errors.email.message}</span>}
                    </div>
                </div>
            </div>

            {/* FinancialInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>ข้อมูลทางการเงิน</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    <Controller
                        name='financialStatusYear'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='financialStatusYear' className='font-light text-zinc-700'>ปีสถานะทางการเงิน (พ.ศ.)</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value?.toString() ?? financialStatusYearOptions[0].toString()}
                                    onValueChange={(value) => field.onChange(Number(value))}
                                >
                                    <SelectTrigger className='w-full font-light cursor-pointer'>
                                        <SelectValue placeholder='เลือกปีงบการเงิน' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {financialStatusYearOptions.map((year) => (
                                            <SelectItem key={year} value={year.toString()} className='cursor-pointer'>
                                                {convertCetoBe(year)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.financialStatusYear && <span className='text-red-500 font-light'>{errors.financialStatusYear.message}</span>}
                            </div>
                        )}
                    />

                    <div></div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='financialStatusIncome' className='font-light text-zinc-700'>รายได้ในรอบปีที่ผ่านมา (บาท)</Label>
                        <Input
                            readOnly={isReadOnly}
                            type='number'
                            inputMode='decimal'
                            step='0.01'
                            min={0}
                            id='financialStatusIncome'
                            {...register('financialStatusIncome', { valueAsNumber: true })}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.financialStatusIncome && <span className='text-red-500 font-light'>{errors.financialStatusIncome.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='financialStatusTax' className='font-light text-zinc-700'>ภาษีเงินได้ในรอบปีที่ผ่านมา (บาท)</Label>
                        <Input
                            readOnly={isReadOnly}
                            type='number'
                            inputMode='decimal'
                            step='0.01'
                            min={0}
                            id='financialStatusTax'
                            {...register('financialStatusTax', { valueAsNumber: true })}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.financialStatusTax && <span className='text-red-500 font-light'>{errors.financialStatusTax.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='currentIncome' className='font-light text-zinc-700'>รายได้ปัจจุบัน (บาท)</Label>
                        <Input
                            readOnly={isReadOnly}
                            type='number'
                            inputMode='decimal'
                            step='0.01'
                            min={0}
                            id='currentIncome'
                            {...register('currentIncome', { valueAsNumber: true })}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.currentIncome && <span className='text-red-500 font-light'>{errors.currentIncome.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='currentIncomeDuration' className='font-light text-zinc-700'>ในช่วงระยะเวลา (เดือน)</Label>
                        <Input
                            readOnly={isReadOnly}
                            type='number'
                            inputMode='numeric'
                            min={1}
                            id='currentIncomeDuration'
                            {...register('currentIncomeDuration', { valueAsNumber: true })}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.currentIncomeDuration && <span className='text-red-500 font-light'>{errors.currentIncomeDuration.message}</span>}
                    </div>
                </div>
            </div>

            {/* AddressInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Building />
                    <p className='font-normal'>ที่ตั้งของบริษัท</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='addressDetailsTh' className='font-light text-zinc-700'>บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาไทย]</Label>
                        <Input readOnly={isReadOnly} id='addressDetailsTh' {...register('addressDetailsTh')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.addressDetailsTh && <span className='text-red-500 font-light'>{errors.addressDetailsTh.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='addressDetailsEn' className='font-light text-zinc-700'>บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาอังกฤษ]</Label>
                        <Input readOnly={isReadOnly} id='addressDetailsEn' {...register('addressDetailsEn')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.addressDetailsEn && <span className='text-red-500 font-light'>{errors.addressDetailsEn.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='districtTh' className='font-light text-zinc-700'>เขต/อำเภอ [ภาษาไทย]</Label>
                        <Input readOnly={isReadOnly} id='districtTh' {...register('districtTh')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.districtTh && <span className='text-red-500 font-light'>{errors.districtTh.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='districtEn' className='font-light text-zinc-700'>เขต/อำเภอ [ภาษาอังกฤษ]</Label>
                        <Input readOnly={isReadOnly} id='districtEn' {...register('districtEn')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.districtEn && <span className='text-red-500 font-light'>{errors.districtEn.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='subDistrictTh' className='font-light text-zinc-700'>แขวง/ตำบล [ภาษาไทย]</Label>
                        <Input readOnly={isReadOnly} id='subDistrictTh' {...register('subDistrictTh')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.subDistrictTh && <span className='text-red-500 font-light'>{errors.subDistrictTh.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='subDistrictEn' className='font-light text-zinc-700'>แขวง/ตำบล [ภาษาอังกฤษ]</Label>
                        <Input readOnly={isReadOnly} id='subDistrictEn' {...register('subDistrictEn')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.subDistrictEn && <span className='text-red-500 font-light'>{errors.subDistrictEn.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='provinceTh' className='font-light text-zinc-700'>จังหวัด [ภาษาไทย]</Label>
                        <Input readOnly={isReadOnly} id='provinceTh' {...register('provinceTh')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.provinceTh && <span className='text-red-500 font-light'>{errors.provinceTh.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='provinceEn' className='font-light text-zinc-700'>จังหวัด [ภาษาอังกฤษ]</Label>
                        <Input readOnly={isReadOnly} id='provinceEn' {...register('provinceEn')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.provinceEn && <span className='text-red-500 font-light'>{errors.provinceEn.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='postalCode' className='font-light text-zinc-700'>รหัสไปรษณีย์</Label>
                        <Input
                            readOnly={isReadOnly}
                            maxLength={5}
                            inputMode='numeric'
                            id='postalCode'
                            {...register('postalCode')}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.postalCode && <span className='text-red-500 font-light'>{errors.postalCode.message}</span>}
                    </div>
                </div>
            </div>

            {mode !== 'view' && (
                <div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
                    <Button asChild type='button' variant='ghost' className='font-light border border-slate-300'>
                        <Link href='/employers'>
                            ยกเลิก
                        </Link>
                    </Button>
                    <Button type='submit' className='font-light'>{mode === 'create' ? 'บันทึกข้อมูล' : 'บันทึกการแก้ไข'}</Button>
                    <AlertDialog open={showValidationAlert} onOpenChange={setShowValidationAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='font-medium'>{mode === 'create' ? 'เพิ่มนายจ้างใหม่ไม่สำเร็จ!' : 'แก้ไขข้อมูลนายจ้างไม่สำเร็จ!'}</AlertDialogTitle>
                                <AlertDialogDescription className='font-light'>
                                    ระบุข้อมูลของนายจ้างให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลของนายจ้างให้ถูกต้องก่อนคลิก {mode === 'create' ? 'บันทึกข้อมูล' : 'บันทึกการแก้ไข'}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction className='font-light'>ตกลง</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}

        </form>
    )
}
