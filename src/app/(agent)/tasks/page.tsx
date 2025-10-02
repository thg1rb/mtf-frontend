'use client'

import HeaderSection from '@/components/shared/HeaderSection'
import StatGrid from '@/components/shared/StatGrid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { findEmployerNameById } from '@/lib/mock-data'
import { countCompletedTasks, countInProgressTasks, countTotalTasks, getMockTasks, taskTableHeaders } from '@/lib/mock-data/tasks'
import { getCurrentPeriod, isTaskCompleted } from '@/lib/utils/task'
import { Task, typeOfTaskMappingRecord } from '@/types/task'
import { CircleCheck, CircleCheckBig, Edit, Files, Loader, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const statItems = [
  {
    id: 'stat-1',
    title: 'งานทั้งหมด (งาน)',
    amount: countTotalTasks(), // TODO: GET method `/api/tasks`
    amountTextColor: 'text-black',
    icon: Files,
  },
  {
    id: 'stat-2',
    title: 'ดำเนินการเสร็จสิ้น (งาน)',
    amount: countCompletedTasks(), // TODO: GET method
    amountTextColor: 'text-green-500',
    icon: CircleCheck,
  },
  {
    id: 'stat-3',
    title: 'กำลังดำเนินการ (งาน)',
    amount: countInProgressTasks(), // TODO: GET method
    amountTextColor: 'text-yellow-400',
    icon: Loader,
  },
]

export default function DocumentsPage() {
  const router = useRouter();
  const [tasks] = useState<Task[]>(() => getMockTasks())
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>

      {/* HeaderSection */}
      <HeaderSection
        topic='จัดการงาน'
        desc='ติดตามขั้นตอนการดำเนินการของแรงงานต่างด้าวทั้งหมดในระบบ'
        rightActionButtons={[
          (<Button asChild key="ขึ้นทะเบียนใหม่" className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/tasks/register/new'>
              <Plus className='size-[24px] mr-2' />
              ขึ้นทะเบียนใหม่
            </Link>
          </Button>),
          (<Button asChild key="ต่ออายุใบอนุญาต" variant='outline' className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/tasks/renew/new'>
              <Plus className='size-[24px] mr-2' />
              ต่ออายุใบอนุญาต
            </Link>
          </Button>)
        ]} />

      {/* StatGrid */}
      <StatGrid statItems={statItems} />

      {/* TableSection */}
      {/* TODO: Pagination */}
      {/* TODO: filter agents by search or status */}
      <div className='flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg'>
        <div className='flex flex-col'>
          <p className='font-normal'>ค้นหานายจ้าง</p>
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
                {taskTableHeaders.map((tableHeader) => (
                  <TableHead key={tableHeader.index} className={`font-normal px-[20px] ${tableHeader.index === 'header-5' ? "text-right" : ""}`}>
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => router.push(`/tasks/${task.id}`)}
                  >
                    <TableCell className='font-light px-[20px]'>
                      <Badge variant='outline' className='w-[130px] font-light'>{typeOfTaskMappingRecord[task.typeOfTask]}</Badge>
                    </TableCell>
                    <TableCell className='font-light px-[20px]'>
                      {findEmployerNameById(task.employerId)}
                    </TableCell>
                    <TableCell className='font-light px-[20px]'>
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center gap-x-[8px]'>
                          {"ขั้นตอนที่ " + (Number(getCurrentPeriod(task)) + 1)}
                        </div>
                        <div className='flex flex-row items-center gap-x-[8px]'>
                          {/* TODO: วันที่? */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='px-[20px]'>
                      {isTaskCompleted(task) ?
                        <Badge className='flex flex-row w-[120px] font-light bg-green-200 text-green-800'>
                          <CircleCheckBig />
                          เสร็จสิ้น
                        </Badge> :
                        <Badge className='flex flex-row w-[120px] font-light bg-yellow-100 text-red-800'>
                          <Loader />
                          ดำเนินการ
                        </Badge>
                      }
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
                            <Link href={`/tasks/${task.id}/edit`}>
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
