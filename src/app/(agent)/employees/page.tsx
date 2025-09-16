'use client'

import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockEmployees, employeeTableHeaders } from '@/lib/mock-data'
import { getNationalityDisplay } from '@/lib/utils/index'
import { Employee } from '@/types'
import { Edit, MoreHorizontal, Plus, Search, Trash2, UserCheck2, Users2, UserX2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const statItems = [
  {
    id: 'stat-1',
    title: 'นายจ้างทั้งหมด (คน)',
    amount: 100,
    amountTextColor: 'text-black',
    icon: Users2,
  },
  {
    id: 'stat-2',
    title: 'นายจ้างที่ใช้งานได้ (คน)',
    amount: 100,
    amountTextColor: 'text-green-500',
    icon: UserCheck2,
  },
  {
    id: 'stat-3',
    title: 'นายจ้างที่ไม่ใช้งาน (คน)',
    amount: 1000,
    amountTextColor: 'text-red-500',
    icon: UserX2,
  },
]

export default function EmployersPage() {
  const router = useRouter();
  const [employees] = useState<Employee[]>(mockEmployees); // TODO: search and filter employees
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='ลูกจ้าง'
        desc='ข้อมูลลูกจ้างทั้งหมดในระบบ'
        rightActionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/employees/new'>
              <Plus className='size-[24px] mr-2' />
              เพิ่มลูกจ้างใหม่
            </Link>
          </Button>} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      {/* TODO: Pagination */}
      {/* TODO: filter agents by search or status */}
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
                  <TableHead key={tableHeader.index} className='font-normal text-center'>
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                employees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className='text-center cursor-pointer hover:bg-muted/50'
                    onClick={() => router.push(`/employees/${employee.id}`)}
                  >
                    <TableCell>
                      <p className='font-light'>{employee.firstname + " " + employee.lastname}</p>
                      <p className='font-extralight zinc-400'>พาสพอร์ต: {employee.passportNo}</p>
                    </TableCell>
                    <TableCell className='font-light'>
                      {getNationalityDisplay(employee.nationality)}
                    </TableCell>
                    <TableCell className='font-light'>
                      {employee.currentEmployerCompany}
                    </TableCell>
                    {/* TODO: Expiry Documents */}
                    <TableCell>
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
                          <DropdownMenuItem asChild className='cursor-pointer'>
                            <Link href={`/agents/${employee.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              แก้ไข
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive cursor-pointer">
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
    </div>
  )
}
