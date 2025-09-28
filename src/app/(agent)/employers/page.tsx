'use client'

import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { countActiveEmployers, countEmployees, countInactiveEmployers, countTotalEmployers, employerTableHeaders, mockEmployers } from '@/lib/mock-data/employers'
import { Employer } from '@/types'
import { Edit, Mail, MoreHorizontal, Phone, Plus, Search, Trash2, UserCheck2, Users2, UserX2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const statItems = [
  {
    id: 'stat-1',
    title: 'นายจ้างทั้งหมด (คน)',
    amount: countTotalEmployers(), // TODO: GET method `/api/employers`
    amountTextColor: 'text-black',
    icon: Users2,
  },
  {
    id: 'stat-2',
    title: 'นายจ้างที่ใช้งานได้ (คน)',
    amount: countActiveEmployers(), // TODO: GET method `/api/employers/active`
    amountTextColor: 'text-green-500',
    icon: UserCheck2,
  },
  {
    id: 'stat-3',
    title: 'นายจ้างที่ไม่ใช้งาน (คน)',
    amount: countInactiveEmployers(), // TODO: GET method `/api/employers/inactive`
    amountTextColor: 'text-red-500',
    icon: UserX2,
  },
]

export default function EmployersPage() {
  const router = useRouter();
  const [employers] = useState<Employer[]>(mockEmployers);
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='นายจ้าง'
        desc='ข้อมูลนายจ้างทั้งหมดในระบบ'
        rightActionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/employers/new'>
              <Plus className='size-[24px] mr-2' />
              เพิ่มนายจ้างใหม่
            </Link>
          </Button>} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
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
                {employerTableHeaders.map((tableHeader) => (
                  <TableHead key={tableHeader.index} className={`font-normal px-[20px] ${tableHeader.index === 'header-5' ? "text-right" : ""}`}>
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                employers.map((employer) => (
                  <TableRow
                    key={employer.taxId}
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => router.push(`/employers/${employer.taxId}`)}
                  >
                    <TableCell className='font-light px-[20px]'>
                      {employer.firstname + " " + employer.lastname}
                    </TableCell>
                    <TableCell className='font-light px-[20px]'>
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center gap-x-[8px]'>
                          <Mail size={16} />
                          {employer.email}
                        </div>
                        <div className='flex flex-row items-center gap-x-[8px]'>
                          <Phone size={16} />
                          {employer.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='font-light px-[20px]'>
                      <Badge variant='outline' className='w-[70px] font-light'>{countEmployees(employer.taxId)} คน</Badge>
                    </TableCell>
                    <TableCell className='px-[20px]'>
                      {employer.status === "active" ? (
                        <Badge className="w-[75px] bg-green-200 font-light text-green-800">ใช้งาน</Badge>
                      ) : (
                        <Badge className='w-[75px] bg-red-200 font-light text-red-800'>ไม่ใช้งาน</Badge>
                      )}
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
                            <Link href={`/employers/${employer.taxId}/edit`}>
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

    </div>
  )
}
