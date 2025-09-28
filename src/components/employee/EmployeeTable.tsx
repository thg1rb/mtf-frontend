import { Edit, MoreHorizontal, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';
import { employeeTableHeaders } from '@/lib/mock-data';
import { Employee } from '@/types';
import { useRouter } from 'next/navigation';
import StatusBadge from '../shared/StatusBadge';
import DocumentExpiryBadge from './DocumentExpiryBadge';

interface EmployeeTableProps {
    employees: Employee[],
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    return (
        // {/* TableSection */ }
        // {/* TODO: Pagination */ }
        // {/* TODO: filter agents by search or status */ }
        <div className='flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg'>
            <div className='flex flex-col'>
                <p className='font-normal'>ค้นหานายหน้า</p>
                <p className='font-light'>ค้นหานายหน้าจากอีเมล, ชื่อจริง หรือนามสกุล</p>
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
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className='font-light cursor-pointer'>
                        <SelectValue placeholder="สถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active" className='cursor-pointer'>ใช้งาน</SelectItem>
                        <SelectItem value="inactive" className='cursor-pointer'>ไม่ใช้งาน</SelectItem>
                    </SelectContent>
                </Select>
                <Button className='font-light cursor-pointer'>ค้นหา</Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {employeeTableHeaders.map((tableHeader) => (
                                <TableHead key={tableHeader.index} className={`font-normal px-[20px] ${tableHeader.index === 'header-9' ? "text-right" : ""}`}>
                                    {tableHeader.headerName}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            employees.map((employee: Employee) => (
                                <TableRow
                                    key={employee.id}
                                    className='cursor-pointer hover:bg-muted/50'
                                    onClick={() => router.push(`/employees/${employee.id}`)}
                                >
                                    <TableCell className='font-light px-[20px]'>
                                        {employee.firstname + " " + employee.lastname}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {employee.employerId}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {<DocumentExpiryBadge expiryDate={employee.healthCheckExpiryDate} />}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {<DocumentExpiryBadge expiryDate={employee.insuranceExpiryDate} />}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {<DocumentExpiryBadge expiryDate={employee.workPermitExpiryDate} />}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {<DocumentExpiryBadge expiryDate={employee.certificateOfIdentityExpiryDate} />}
                                    </TableCell>
                                    <TableCell className='font-light px-[20px]'>
                                        {<DocumentExpiryBadge expiryDate={employee.nonThaiIdentificationExpiryDate} />}
                                    </TableCell>
                                    <TableCell className='px-[20px]'>
                                        {<StatusBadge status={employee.status} />}
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
                        }
                    </TableBody>
                </Table>
            </div>
            <div className='flex flex-row justify-between items-center'>
                {/* TODO: insert the amount of agents and filtered agents */}
                <p className='font-light text-zinc-500'>... จากทั้งหมด ... คน</p>
                <div className='flex flex-row gap-x-[10px]'>
                    <Button variant={"ghost"} className='font-light border cursor-pointer'>กลับ</Button>
                    <Button variant={"ghost"} className='font-light border cursor-pointer'>ถัดไป</Button>
                </div>
            </div>
        </div>
    )
}
