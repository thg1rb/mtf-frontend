'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AgentFormData, agentSchema } from '@/lib/validations'
import { Home, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

type AgentFormMode = 'create' | 'edit' | 'view'

interface AgentFormProps {
    mode?: AgentFormMode
    defaultValues?: Partial<AgentFormData>
    onSubmit?: (data: AgentFormData) => void
    onCancel?: () => void
}

export default function AgentForm({ mode = 'create', defaultValues, onSubmit: onSubmitProp, onCancel }: AgentFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isValid }
    } = useForm<AgentFormData>({
        resolver: zodResolver(agentSchema),
        defaultValues: defaultValues as any,
        mode: 'onChange'
    });

    React.useEffect(() => {
        if (defaultValues) {
            reset(defaultValues as any)
            if (defaultValues.status) {
                setValue('status', defaultValues.status as 'active' | 'inactive', { shouldValidate: false })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues])

    const onSubmit = (data: AgentFormData) => {

        console.log("Form data:", data);

        // TODO: api POST `/agents/new` endpoint

        if (onSubmitProp) {
            onSubmitProp(data)
            return
        }
        router.push("/agents");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-[29px] md:gap-y-[45px]'>
            {/* PersonalInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>ข้อมูลนายหน้า</p>
                </div>
                <fieldset disabled={mode === 'view'} className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='citizenId' className='font-light'>เลขประจำตัวประชาชน (13 หลัก)</Label>
                        <Input maxLength={13} id='citizenId' {...register("citizenId")} />
                        {errors.citizenId && <span className="text-red-500 font-light">{errors.citizenId.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='email' className='font-light'>อีเมล</Label>
                        <Input type='email' id='email' {...register("email")} />
                        {errors.email && <span className="text-red-500 font-light">{errors.email.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='firstname' className='font-light'>ชื่อจริง</Label>
                        <Input id='firstname' {...register("firstname")} />
                        {errors.firstname && <span className="text-red-500 font-light">{errors.firstname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='lastname' className='font-light'>นามสกุล</Label>
                        <Input id='lastname' {...register("lastname")} />
                        {errors.lastname && <span className="text-red-500 font-light">{errors.lastname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='status' className='font-light'>สถานะ</Label>
                        <Select
                            defaultValue={(defaultValues?.status as 'active' | 'inactive') || undefined}
                            onValueChange={(val) => setValue("status", val as "active" | "inactive", { shouldValidate: true })}
                            disabled={mode === 'view'}
                        >
                            <SelectTrigger className='w-full font-light cursor-pointer'>
                                <SelectValue placeholder="สถานะ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active" className='cursor-pointer'>ใช้งาน</SelectItem>
                                <SelectItem value="inactive" className='cursor-pointer'>ไม่ใช้งาน</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <span className="text-red-500 font-light">{errors.status.message}</span>}
                    </div>

                </fieldset>
            </div>

            {/* AddressInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Home />
                    <p className='font-normal'>ข้อมูลที่อยู่</p>
                </div>
                <fieldset disabled={mode === 'view'} className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='addressDetails' className='font-light'>บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาไทย]</Label>
                        <Input id='addressDetails' {...register("addressDetails")} />
                        {errors.addressDetails && <span className="text-red-500 font-light">{errors.addressDetails.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='district' className='font-light'>เขต/อำเภอ</Label>
                        <Input id='district' {...register("district")} />
                        {errors.district && <span className="text-red-500 font-light">{errors.district.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='subDistrict' className='font-light'>แขวง/ตำบล</Label>
                        <Input id='subDistrict' {...register("subDistrict")} />
                        {errors.subDistrict && <span className="text-red-500 font-light">{errors.subDistrict.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='province' className='font-light'>จังหวัด</Label>
                        <Input id='province' {...register("province")} />
                        {errors.province && <span className="text-red-500 font-light">{errors.province.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='postelCode' className='font-light'>รหัสไปรษณีย์</Label>
                        <Input maxLength={5} id='postelCode' {...register("postelCode")} />
                        {errors.postelCode && <span className="text-red-500 font-light">{errors.postelCode.message}</span>}
                    </div>

                </fieldset>
            </div>

            <div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
                <Button
                    type='button'
                    variant='ghost'
                    className='font-light border border-slate-300'
                    onClick={() => onCancel ? onCancel() : router.back()}
                >
                    ยกเลิก
                </Button>

                {mode !== 'view' && (
                    isValid ? (
                        <Button type='submit' className='font-light'>
                            {mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                        </Button>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type='button' className='font-light'>
                                    {mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='font-medium'>ไม่สามารถบันทึกได้</AlertDialogTitle>
                                    <AlertDialogDescription className='font-light'>
                                        ระบุข้อมูลของนายหน้าให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลให้ถูกต้องก่อนคลิก "{mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}"
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className='font-light'>ตกลง</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )
                )}

            </div>
        </form>
    )
}
