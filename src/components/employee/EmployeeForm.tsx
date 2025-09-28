'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmployeeFormData, employeeSchema } from '@/lib/validations'
import { Bed, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, type Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { DatePicker } from '../shared/DatePicker'

interface EmployeeFormProps {
    mode: "create" | "view" | "edit"
    defaultValues?: Partial<EmployeeFormData>
}

const nationalityOptions = [
    { value: 'myanmar', label: '🇲🇲 เมียนมา' },
    { value: 'laos', label: '🇱🇦 ลาว' },
    { value: 'cambodia', label: '🇰🇭 กัมพูชา' }
];

const bloodTypeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' }
];

const documentFieldConfigs = [
    { name: 'healthCheckExpiryDate', label: 'วันหมดอายุใบรับรองแพทย์' },
    { name: 'insuranceExpiryDate', label: 'วันหมดอายุประกันสุขภาพ' },
    { name: 'workPermitExpiryDate', label: 'วันหมดอายุใบอนุญาตทำงาน' },
    { name: 'certificateOfIdentityExpiryDate', label: 'วันหมดอายุเอกสาร CI' },
    { name: 'nonThaiIdentificationExpiryDate', label: 'วันหมดอายุบัตรชมพู' }
] satisfies ReadonlyArray<{
    name: keyof Pick<EmployeeFormData,
        'healthCheckExpiryDate' |
        'insuranceExpiryDate' |
        'workPermitExpiryDate' |
        'certificateOfIdentityExpiryDate' |
        'nonThaiIdentificationExpiryDate'>
    label: string
}>;

const toDateOrNull = (value: string | Date | null | undefined) => {
    if (!value) return null;
    if (value instanceof Date) {
        return isNaN(value.getTime()) ? null : value;
    }
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
};

export default function EmployeeForm({ mode, defaultValues }: EmployeeFormProps) {
    const router = useRouter();
    const [showValidationAlert, setShowValidationAlert] = useState(false);

    const cleanedDefaultValues: EmployeeFormData = useMemo(() => ({
        employerId: defaultValues?.employerId ?? "",
        passportNo: defaultValues?.passportNo ?? "",
        firstname: defaultValues?.firstname ?? "",
        lastname: defaultValues?.lastname ?? "",
        nationality: defaultValues?.nationality ?? "myanmar",
        bloodType: defaultValues?.bloodType ?? "A",
        status: defaultValues?.status ?? "active",
        addressDetails: defaultValues?.addressDetails ?? "",
        district: defaultValues?.district ?? "",
        subDistrict: defaultValues?.subDistrict ?? "",
        province: defaultValues?.province ?? "",
        postalCode: defaultValues?.postalCode ?? "",
        healthCheckExpiryDate: toDateOrNull(defaultValues?.healthCheckExpiryDate),
        insuranceExpiryDate: toDateOrNull(defaultValues?.insuranceExpiryDate),
        workPermitExpiryDate: toDateOrNull(defaultValues?.workPermitExpiryDate),
        certificateOfIdentityExpiryDate: toDateOrNull(defaultValues?.certificateOfIdentityExpiryDate),
        nonThaiIdentificationExpiryDate: toDateOrNull(defaultValues?.nonThaiIdentificationExpiryDate),
    }), [defaultValues]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema) as Resolver<EmployeeFormData>,
        defaultValues: cleanedDefaultValues,
        mode: 'onChange'
    });

    useEffect(() => {
        reset(cleanedDefaultValues);
    }, [cleanedDefaultValues, reset]);

    // Form submit successfully (There is no invalid input)
    const handleFormSubmit = (data: EmployeeFormData) => {
        setShowValidationAlert(false);
        if (mode === "create") {
            // TODO: POST method `api/employees`
        } else if (mode === "edit") {
            // TODO: PUT method `api/employees/{id}`
        }

        console.log("Form data:", data);

        router.push("/employees");
    }

    // Form submit failed (There are invalid input )
    const handleFormInvalid = () => {
        setShowValidationAlert(true);
    }

    const isReadOnly = mode === "view";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)} className='flex flex-col gap-y-[29px] md:gap-y-[45px]'>
            {/* EmployeeInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>ข้อมูลลูกจ้าง</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='passportNo' className='font-light text-zinc-700'>หมายเลขหนังสือเดินทาง (Passport No.)</Label>
                        <Input
                            readOnly={isReadOnly}
                            id='passportNo'
                            {...register('passportNo')}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.passportNo && <span className='text-red-500 font-light'>{errors.passportNo.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='employerId' className='font-light text-zinc-700'>เลขประจำตัวผู้เสียภาษีนายจ้าง (13 หลัก)</Label>
                        <Input
                            readOnly={isReadOnly}
                            maxLength={13}
                            inputMode='numeric'
                            id='employerId'
                            {...register('employerId')}
                            className={`${isReadOnly ? 'text-zinc-500' : ''}`}
                        />
                        {errors.employerId && <span className='text-red-500 font-light'>{errors.employerId.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='firstname' className='font-light text-zinc-700'>ชื่อจริง</Label>
                        <Input readOnly={isReadOnly} id='firstname' {...register('firstname')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.firstname && <span className='text-red-500 font-light'>{errors.firstname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='lastname' className='font-light text-zinc-700'>นามสกุล</Label>
                        <Input readOnly={isReadOnly} id='lastname' {...register('lastname')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.lastname && <span className='text-red-500 font-light'>{errors.lastname.message}</span>}
                    </div>

                    <Controller
                        name='nationality'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='nationality' className='font-light text-zinc-700'>สัญชาติ</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='w-full font-light cursor-pointer'>
                                        <SelectValue placeholder='เลือกสัญชาติ' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nationalityOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.nationality && <span className='text-red-500 font-light'>{errors.nationality.message}</span>}
                            </div>
                        )}
                    />

                    <Controller
                        name='bloodType'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='bloodType' className='font-light text-zinc-700'>กรุ๊ปเลือด</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='w-full font-light cursor-pointer'>
                                        <SelectValue placeholder='กรุ๊ปเลือด' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bloodTypeOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.bloodType && <span className='text-red-500 font-light'>{errors.bloodType.message}</span>}
                            </div>
                        )}
                    />

                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='status' className='font-light text-zinc-700'>สถานะ</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value}
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
                </div>
            </div>

            {/* AddressInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Bed />
                    <p className='font-normal'>ที่อยู่อาศัยในประเทศไทย</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='addressDetails' className='font-light text-zinc-700'>บ้านเลขที่, หมู่, ซอย, ถนน</Label>
                        <Input readOnly={isReadOnly} id='addressDetails' {...register('addressDetails')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.addressDetails && <span className='text-red-500 font-light'>{errors.addressDetails.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='district' className='font-light text-zinc-700'>เขต/อำเภอ</Label>
                        <Input readOnly={isReadOnly} id='district' {...register('district')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.district && <span className='text-red-500 font-light'>{errors.district.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='subDistrict' className='font-light text-zinc-700'>แขวง/ตำบล</Label>
                        <Input readOnly={isReadOnly} id='subDistrict' {...register('subDistrict')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.subDistrict && <span className='text-red-500 font-light'>{errors.subDistrict.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='province' className='font-light text-zinc-700'>จังหวัด</Label>
                        <Input readOnly={isReadOnly} id='province' {...register('province')} className={`${isReadOnly ? 'text-zinc-500' : ''}`} />
                        {errors.province && <span className='text-red-500 font-light'>{errors.province.message}</span>}
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

            {/* DocumentExpirySection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>วันหมดอายุเอกสารสำคัญ</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                    {documentFieldConfigs.map((fieldConfig) => (
                        <Controller
                            key={fieldConfig.name}
                            name={fieldConfig.name}
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col gap-y-[10px]">
                                    <Label htmlFor={fieldConfig.name} className="font-light text-zinc-700">
                                        {fieldConfig.label}
                                    </Label>
                                    <DatePicker
                                        value={toDateOrNull(field.value)}
                                        onChange={(date) => field.onChange(date)}
                                        disabled={isReadOnly}
                                    />
                                    {errors[fieldConfig.name] && (
                                        <span className="text-red-500 font-light">
                                            {errors[fieldConfig.name]?.message as string}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    ))}
                </div>
            </div>

            {mode !== 'view' && (
                <div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
                    <Button asChild type='button' variant='ghost' className='font-light border border-slate-300'>
                        <Link href='/employees'>
                            ยกเลิก
                        </Link>
                    </Button>
                    <Button type='submit' className='font-light'>{mode === 'create' ? 'บันทึกข้อมูล' : 'บันทึกการแก้ไข'}</Button>
                    <AlertDialog open={showValidationAlert} onOpenChange={setShowValidationAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='font-medium'>{mode === 'create' ? 'เพิ่มลูกจ้างใหม่ไม่สำเร็จ!' : 'แก้ไขข้อมูลลูกจ้างไม่สำเร็จ!'}</AlertDialogTitle>
                                <AlertDialogDescription className='font-light'>
                                    ระบุข้อมูลของลูกจ้างให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลให้ถูกต้องก่อนคลิก {mode === 'create' ? 'บันทึกข้อมูล' : 'บันทึกการแก้ไข'}
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
