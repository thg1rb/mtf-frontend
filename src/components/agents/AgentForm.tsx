'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AgentFormData, agentSchema } from '@/lib/validations'
import { Home, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

interface AgentFormProps {
    mode: "create" | "view" | "edit"
    defaultValues?: Partial<AgentFormData>
}

export default function AgentForm({ mode, defaultValues }: AgentFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isValid }
    } = useForm<AgentFormData>({
        resolver: zodResolver(agentSchema),
        defaultValues
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const onSubmit = (data: AgentFormData) => {
        if (mode === "create") {
            // TODO: POST method `api/agents`
        } else if (mode === "edit") {
            // TODO: PUT method `api/agents/{id}`
        }

        console.log("Form data:", data);

        router.push("/agents");
    }

    const isReadOnly = mode === "view";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-[29px] md:gap-y-[45px]'>
            {/* PersonalInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Info />
                    <p className='font-normal'>ข้อมูลนายหน้า</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='citizenId' className='font-light'>เลขประจำตัวประชาชน (13 หลัก)</Label>
                        <Input readOnly={isReadOnly} maxLength={13} id='citizenId' {...register("citizenId")} />
                        {errors.citizenId && <span className="text-red-500 font-light">{errors.citizenId.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='email' className='font-light'>อีเมล</Label>
                        <Input readOnly={isReadOnly} type='email' id='email' {...register("email")} />
                        {errors.email && <span className="text-red-500 font-light">{errors.email.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='firstname' className='font-light'>ชื่อจริง</Label>
                        <Input readOnly={isReadOnly} id='firstname' {...register("firstname")} />
                        {errors.firstname && <span className="text-red-500 font-light">{errors.firstname.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='lastname' className='font-light'>นามสกุล</Label>
                        <Input readOnly={isReadOnly} id='lastname' {...register("lastname")} />
                        {errors.lastname && <span className="text-red-500 font-light">{errors.lastname.message}</span>}
                    </div>

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-y-[10px]">
                                <Label htmlFor="status" className="font-light">สถานะ</Label>
                                <Select
                                    disabled={isReadOnly}
                                    value={field.value} // ผูกค่า value จาก react-hook-form
                                    onValueChange={field.onChange} // update ค่ากลับเข้า form
                                >
                                    <SelectTrigger className="w-full font-light cursor-pointer">
                                        <SelectValue placeholder="สถานะ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active" className="cursor-pointer">ใช้งาน</SelectItem>
                                        <SelectItem value="inactive" className="cursor-pointer">ไม่ใช้งาน</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <span className="text-red-500 font-light">{errors.status.message}</span>}
                            </div>
                        )}
                    />
                </div>
            </div>

            {/* AddressInfoSection */}
            <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <Home />
                    <p className='font-normal'>ข้อมูลที่อยู่</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='addressDetails' className='font-light'>บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาไทย]</Label>
                        <Input readOnly={isReadOnly} id='addressDetails' {...register("addressDetails")} />
                        {errors.addressDetails && <span className="text-red-500 font-light">{errors.addressDetails.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='district' className='font-light'>เขต/อำเภอ</Label>
                        <Input readOnly={isReadOnly} id='district' {...register("district")} />
                        {errors.district && <span className="text-red-500 font-light">{errors.district.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='subDistrict' className='font-light'>แขวง/ตำบล</Label>
                        <Input readOnly={isReadOnly} id='subDistrict' {...register("subDistrict")} />
                        {errors.subDistrict && <span className="text-red-500 font-light">{errors.subDistrict.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='province' className='font-light'>จังหวัด</Label>
                        <Input readOnly={isReadOnly} id='province' {...register("province")} />
                        {errors.province && <span className="text-red-500 font-light">{errors.province.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-[10px]'>
                        <Label htmlFor='postelCode' className='font-light'>รหัสไปรษณีย์</Label>
                        <Input readOnly={isReadOnly} maxLength={5} id='postelCode' {...register("postelCode")} />
                        {errors.postelCode && <span className="text-red-500 font-light">{errors.postelCode.message}</span>}
                    </div>
                </div>
            </div>

            {
                mode !== 'view' && (<div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
                    <Button asChild type='button' variant='ghost' className='font-light border border-slate-300'>
                        <Link href='/agents'>
                            ยกเลิก
                        </Link>
                    </Button>
                    {isValid ? (<Button type='submit' className='font-light'>{mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข"}</Button>) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type='button' className='font-light'>{mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข"}</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='font-medium'>{mode === "create" ? "เพิ่มนายหน้าใหม่ไม่สำเร็จ!" : "แก้ไขข้อมูลนายหน้าไม่สำเร็จ!"}</AlertDialogTitle>
                                    <AlertDialogDescription className='font-light'>
                                        ระบุข้อมูลของนายหน้าให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลของนายหน้าให้ถูกต้องก่อนคลิก {mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข"}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className='font-light'>ตกลง</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>)}
                </div>)
            }
            
        </form>
    )
}
