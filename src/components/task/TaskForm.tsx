'use client'

import { TaskFormData, taskSchema } from '@/lib/validations/task'
import { Employee, Employer } from '@/types'
import { Check, ChevronsUpDown, Edit, Info, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { getActiveEmployeesByEmployerId, getActiveEmployers, getEmployerFullName, selectEmployeeTableHeaders } from '@/lib/mock-data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { Checkbox } from '../ui/checkbox'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import TaskSteps from './TaskSteps'
import { getMaxStepsForTaskType } from '@/lib/utils/task'

interface TaskFormProps {
    type: "register" | "renew"
    mode: "create" | "view" | "edit"
    defaultValues?: Partial<TaskFormData>
}

export default function TaskForm({ type, mode, defaultValues }: TaskFormProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedStartStep, setSelectedStartStep] = useState<number>(1);
    const [showValidationAlert, setShowValidationAlert] = useState<boolean>(false);
    const [employers] = useState<Employer[]>(() => getActiveEmployers());
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>(
        defaultValues?.selectedEmployeeIds ?? []
    );

    const cleanedDefaultValues: Partial<TaskFormData> = useMemo(() => ({
        employerId: defaultValues?.employerId ?? "",
        startStep: defaultValues?.startStep ?? 1,
        desc: defaultValues?.desc ?? "",
        selectedEmployeeIds: defaultValues?.selectedEmployeeIds ?? [],
        periodUpdates: defaultValues?.periodUpdates ?? [],
    }), [defaultValues]);
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
        formState: { errors }
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema) as Resolver<TaskFormData>,
        defaultValues: cleanedDefaultValues,
        mode: 'onChange'
    });
    const employerId = watch("employerId");

    // Form initialization and synchronization effects
    useEffect(() => {
        reset(cleanedDefaultValues);
    }, [cleanedDefaultValues, reset]);

    useEffect(() => {
        setValue('selectedEmployeeIds', selectedEmployeeIds);
    }, [selectedEmployeeIds, setValue]);

    // Employee data management
    useEffect(() => {
        if (employerId) {
            setEmployees(getActiveEmployeesByEmployerId(employerId));
        } else {
            setEmployees([]);
        }
        // Clear selected employees when employer changes
        setSelectedEmployeeIds([]);
    }, [employerId]);

    // Form handles
    const handleFormSubmit = (data: TaskFormData) => {
        setShowValidationAlert(false);

        const totalSteps = getMaxStepsForTaskType(type)

        const periodUpdates = Array.from({ length: totalSteps }, (_, i) => {
            return i < data.startStep ? new Date() : null;
        });

        const payload = {
            ...data,
            periodUpdates,
        };

        console.log("Form data:", payload);
        router.push("/employers");
    };
    const handleFormInvalid = () => {
        setShowValidationAlert(true);
    };

    // Computed values
    const isReadOnly = mode === "view";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)} className='flex flex-col gap-y-[30px]'>
            <div className='flex flex-col lg:flex-row gap-[45px]'>
                <div className='flex-2 flex flex-col gap-y-[29px] md:gap-y-[45px]'>

                    {/* EmploymentInfoSection */}
                    <div className='flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md'>
                        <div className='flex flex-row gap-x-[5px] items-center'>
                            <Info />
                            <p className='font-normal'>ข้อมูลงาน</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                            <Controller
                                control={control}
                                name="employerId"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-[10px]">
                                        <Label
                                            htmlFor="employerId"
                                            className="font-light text-zinc-700"
                                        >
                                            นายจ้าง
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    disabled={isReadOnly}
                                                    className={cn(
                                                        "w-full justify-between font-light",
                                                        !field.value && "w-full text-muted-foreground font-light"
                                                    )}
                                                >
                                                    {field.value
                                                        ? (() => {
                                                            const selected = employers.find(
                                                                (e) => e.taxId === field.value
                                                            )
                                                            return selected
                                                                ? getEmployerFullName(selected)
                                                                : "เลือกนายจ้าง"
                                                        })()
                                                        : "เลือกนายจ้าง"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="ค้นหาชื่อหรือนามสกุล..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>ไม่พบนายจ้าง</CommandEmpty>
                                                        <CommandGroup>
                                                            {employers.map((employer) => (
                                                                <CommandItem
                                                                    key={employer.taxId}
                                                                    value={getEmployerFullName(employer)}
                                                                    onSelect={() => {
                                                                        field.onChange(employer.taxId)
                                                                    }}
                                                                >
                                                                    {getEmployerFullName(employer)}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            employer.taxId === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {errors.employerId && (
                                            <span className="text-red-500 font-light">
                                                {errors.employerId.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name="startStep"
                                control={control}
                                render={({ field }) => {
                                    const maxStep = type === "register" ? 4 : 5;
                                    return (
                                        <div className="flex flex-col gap-y-[10px]">
                                            <Label
                                                htmlFor="startStep"
                                                className="font-light text-zinc-700"
                                            >
                                                ขั้นตอนเริ่มต้น
                                            </Label>
                                            <Select
                                                disabled={isReadOnly}
                                                value={field.value.toString()}
                                                onValueChange={(value) => {
                                                    field.onChange(parseInt(value));
                                                    setSelectedStartStep(parseInt(value));
                                                }}
                                            >
                                                <SelectTrigger className="w-full font-light cursor-pointer">
                                                    <SelectValue placeholder="เลือกขั้นตอนเริ่มต้น" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: maxStep }, (_, i) => (
                                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                            ขั้นตอนที่ {i + 1}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.startStep && (
                                                <span className="text-red-500 font-light">
                                                    {errors.startStep.message}
                                                </span>
                                            )}
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className='flex flex-col gap-x-[25px] md:gap-x-[50px] gap-y-[15px]'>
                            <div className='flex flex-col gap-y-[10px]'>
                                <Label htmlFor='desc' className='font-light text-zinc-700'>หมายเหตุ</Label>
                                <Textarea readOnly={isReadOnly} id='desc' {...register('desc')} className='font-light hide-scrollbar' />
                                {errors.desc && <span className='text-red-500 font-light'>{errors.desc.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* TODO: EmployeesTableSection */}
                    {/* TODO: Pagination */}
                    {/* TODO: filter agents by search or status */}
                    <div className='flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg'>
                        <div className='flex flex-col'>
                            <p className='font-normal'>ค้นหาลูกจ้าง</p>
                            <p className='font-light'>ค้นหาจากส่วนหนึ่งของชื่อหรือนามสกุล</p>
                        </div>
                        <div className='flex flex-row gap-x-[14px] md:gap-x-[26px]'>
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    className='pl-10'
                                    placeholder='ค้นหานายจ้างที่ต้องการ...'
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                />
                            </div>
                            <Button className='font-light cursor-pointer'>ค้นหา</Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {selectEmployeeTableHeaders.map((tableHeader) => (
                                            <TableHead key={tableHeader.index} className={`font-normal px-[20px] ${tableHeader.index === "header-3" ? "text-right" : ""}`}>
                                                {tableHeader.headerName}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={selectEmployeeTableHeaders.length}
                                                className="text-center py-8 text-muted-foreground"
                                            >
                                                ไม่พบข้อมูลลูกจ้าง
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.map((employee: Employee) => (
                                            <TableRow
                                                key={employee.id}
                                                className='cursor-pointer hover:bg-muted/50'
                                                onClick={() => router.push(`/employees/${employee.id}`)}
                                            >
                                                <TableCell className='font-light px-[20px]'>
                                                    <Checkbox
                                                        checked={selectedEmployeeIds.includes(employee.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setSelectedEmployeeIds(prev => [...prev, employee.id]);
                                                            } else {
                                                                setSelectedEmployeeIds(prev => prev.filter(id => id !== employee.id));
                                                            }
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </TableCell>
                                                <TableCell className='font-light px-[20px]'>
                                                    {employee.firstname + " " + employee.lastname}
                                                </TableCell>
                                                <TableCell className='text-right px-[20px]'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild className='cursor-pointer'>
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild className='cursor-pointer' onClick={(e) => e.stopPropagation()}>
                                                                <Link href={`/employees/${employee.id}/edit`}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    แก้ไข
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className='text-destructive cursor-pointer' onClick={(e) => e.stopPropagation()}>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                ลบ
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {errors.selectedEmployeeIds && (
                            <span className='text-red-500 font-light px-2'>
                                {errors.selectedEmployeeIds.message}
                            </span>
                        )}
                        <div className='flex flex-row justify-between items-center'>
                            {/* TODO: insert the amount of agents and filtered agents */}
                            <p className='font-light text-zinc-500'>เลือกแล้ว {selectedEmployeeIds.length} จากทั้งหมด {employees.length} คน</p>
                            <div className='flex flex-row gap-x-[10px]'>
                                <Button variant={"ghost"} type='button' className='font-light border cursor-pointer'>กลับ</Button>
                                <Button variant={"ghost"} type='button' className='font-light border cursor-pointer'>ถัดไป</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <TaskSteps type={type} currentStep={selectedStartStep} />
                </div>
            </div>
            {/* SubmitAndCancelSection */}
            {mode !== 'view' && (
                <div className='flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end'>
                    <Button asChild type='button' variant='ghost' className='font-light border border-slate-300'>
                        <Link href='/employees'>
                            ยกเลิก
                        </Link>
                    </Button>
                    <Button type='submit' className='font-light'>{mode === 'create' ? 'บันทึกข้อมูล' : 'บันทึกการแก้ไข'}</Button>
                </div>
            )}

            {/* AlertDialogSection */}
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
        </form>
    )
}
