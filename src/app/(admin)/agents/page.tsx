'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import StatGrid from '@/components/shared/StatGrid'
import HeaderSection from '@/components/shared/HeaderSection'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const statItems = [
  {
    id: 'stat-1',
    title: 'สถิติที่ 1',
    amount: 100,
    amountTextColor: 'text-black',
    icon: Plus,
  },
  {
    id: 'stat-2',
    title: 'สถิติที่ 2',
    amount: 100,
    amountTextColor: 'text-green-500',
    icon: Plus,
  },
  {
    id: 'stat-3',
    title: 'สถิติที่ 3',
    amount: 1000,
    amountTextColor: 'text-red-500',
    icon: Plus,
  },
]

// TODO: create table of the agents
const tableHeaders = [
  {
    index: "header-1",
    headerName: "อีเมล"
  },
  {
    index: "header-2",
    headerName: "ชื่อ-สกุล"
  },
  {
    index: "header-3",
    headerName: "สถานะ"
  },
  {
    index: "header-4",
    headerName: "การดำเนินการ"
  }
];

const mockAgents = [
  {
    id: '1101700234567',
    email: "teeradej.w@example.com",
    firstname: "ธีรเดช",
    lastname: "วัฒนากิจไพศาล",
    status: "ใช้งาน",
    addressDetails: '123/45 ถนนสุขุมวิท',
    subDistrict: 'พระโขนง',
    district: 'เขตคลองเตย',
    province: 'กรุงเทพมหานคร',
    postelCode: '10110'
  },
  {
    id: '1101700234568',
    email: "sudarat.p@example.com",
    firstname: "สุดารัตน์",
    lastname: "ผลเจริญ",
    status: "ใช้งาน",
    addressDetails: '88/9 หมู่ 2',
    subDistrict: 'เทพารักษ์',
    district: 'อำเภอบางพลี',
    province: 'สมุทรปราการ',
    postelCode: '10540'
  },
  {
    id: '1101700234569',
    email: "anusorn.k@example.com",
    firstname: "อนุสรณ์",
    lastname: "เกียรติศักดิ์",
    status: "ไม่ใช้งาน",
    addressDetails: '56 ถนนนิมมานเหมินท์ ซอย 11',
    subDistrict: 'สุเทพ',
    district: 'อำเภอเมืองเชียงใหม่',
    province: 'เชียงใหม่',
    postelCode: '50200'
  },
  {
    id: '1101700234570',
    email: "kanokwan.t@example.com",
    firstname: "กนกวรรณ",
    lastname: "ทรัพย์เพิ่ม",
    status: "ใช้งาน",
    addressDetails: '199/7 ถนนติวานนท์',
    subDistrict: 'บางกระสอ',
    district: 'อำเภอเมืองนนทบุรี',
    province: 'นนทบุรี',
    postelCode: '11000'
  },
  {
    id: '1101700234571',
    email: "prasit.n@example.com",
    firstname: "ประสิทธิ์",
    lastname: "ณรงค์ชัย",
    status: "ไม่ใช้งาน",
    addressDetails: '45/3 หมู่บ้านสวนดอกไม้',
    subDistrict: 'ตลาด',
    district: 'อำเภอเมืองมหาสารคาม',
    province: 'มหาสารคาม',
    postelCode: '44000'
  },
  {
    id: '1101700234572',
    email: "natthanan.s@example.com",
    firstname: "ณัฐธนัช",
    lastname: "ศรีวัฒนา",
    status: "ใช้งาน",
    addressDetails: '12/6 ถนนเยาวราช',
    subDistrict: 'เวียง',
    district: 'อำเภอเมืองเชียงราย',
    province: 'เชียงราย',
    postelCode: '57000'
  },
  {
    id: '1101700234573',
    email: "warangkana.k@example.com",
    firstname: "วรางคณา",
    lastname: "คำพันธ์",
    status: "ไม่ใช้งาน",
    addressDetails: '77/12 ถนนบางแสนสาย 2',
    subDistrict: 'แสนสุข',
    district: 'อำเภอเมืองชลบุรี',
    province: 'ชลบุรี',
    postelCode: '20130'
  },
  {
    id: '1101700234574',
    email: "chatchai.r@example.com",
    firstname: "ชาติชาย",
    lastname: "เรืองฤทธิ์",
    status: "ระงับ",
    addressDetails: '9/99 ถนนราชดำเนิน',
    subDistrict: 'ในเมือง',
    district: 'อำเภอเมืองนครราชสีมา',
    province: 'นครราชสีมา',
    postelCode: '30000'
  },
  {
    id: '1101700234575',
    email: "pimchanok.t@example.com",
    firstname: "พิมพ์ชนก",
    lastname: "ทองศรี",
    status: "ใช้งาน",
    addressDetails: '234/5 ถนนประชาอุทิศ',
    subDistrict: 'บางมด',
    district: 'เขตทุ่งครุ',
    province: 'กรุงเทพมหานคร',
    postelCode: '10140'
  },
  {
    id: '1101700234576',
    email: "surasak.m@example.com",
    firstname: "สุรศักดิ์",
    lastname: "มีศักดิ์",
    status: "ไม่ใช้งาน",
    addressDetails: '18/4 ถนนเลียบชายหาดป่าตอง',
    subDistrict: 'ป่าตอง',
    district: 'อำเภอกะทู้',
    province: 'ภูเก็ต',
    postelCode: '83150'
  },
]

const mockEmployees = [
  {
    id: 1,
    name: "สมชาย วงศ์ใหญ่",
    nationality: "เมียนม่า",
    passportNo: "MA1234567",
    employerName: "บริษัท ABC จำกัด",
    position: "พนักงานทั่วไป",
    workPermitStatus: "active",
    workPermitExpiry: "2024-12-31",
    visaStatus: "active",
    visaExpiry: "2024-11-30",
    healthCheckExpiry: "2024-10-15",
    status: "active",
    registeredDate: "2023-01-15",
  },
  {
    id: 2,
    name: "มานี สุขใส",
    nationality: "ลาว",
    passportNo: "LA9876543",
    employerName: "ร้านอาหาร XYZ",
    position: "พนักงานครัว",
    workPermitStatus: "expiring",
    workPermitExpiry: "2024-01-20",
    visaStatus: "active",
    visaExpiry: "2024-06-15",
    healthCheckExpiry: "2024-03-10",
    status: "active",
    registeredDate: "2023-03-20",
  },
  {
    id: 3,
    name: "สมศรี ดีใจ",
    nationality: "กัมพูชา",
    passportNo: "KH5555555",
    employerName: "โรงงาน DEF",
    position: "พนักงานผลิต",
    workPermitStatus: "expired",
    workPermitExpiry: "2023-12-01",
    visaStatus: "expired",
    visaExpiry: "2023-11-15",
    healthCheckExpiry: "2023-09-30",
    status: "inactive",
    registeredDate: "2022-11-10",
  },
]

export default function AgentsPage() {
  const router = useRouter()
  const [agents] = useState(mockAgents); // TODO: search and filter agents
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ status, setStatus ] = useState<string>("");

  return (
    <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
      {/* HeaderSection */}
      <HeaderSection
        topic='นายจ้าง'
        desc='รายชื่อนายจ้างทั้งหมดในระบบ'
        actionButton={
          <Button asChild className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
            <Link href='/agents/new'>
              <Plus className='size-[24px] mr-2' />
              เพิ่มนายจ้างใหม่
            </Link>
          </Button>
        }
      />

      {/* StatSection */}
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
            <SelectTrigger className='font-light'>
              <SelectValue placeholder="สถานะ" />
              <SelectContent>
                <SelectItem value="active">ใช้งาน</SelectItem>
                <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
          <Button className='font-light'>ค้นหา</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((tableHeader) => (
                  <TableHead key={tableHeader.index} className='font-normal text-center'>
                    {tableHeader.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                agents.map((agent) => (
                  <TableRow
                    key={agent.id}
                    className='text-center cursor-pointer hover:bg-muted/50'
                    onClick={() => router.push(`/agents/${agent.id}`)}
                  >
                    <TableCell className='font-light'>
                      {agent.email}
                    </TableCell>
                    <TableCell className='font-light'>
                      {agent.firstname + " " + agent.lastname}
                    </TableCell>
                    <TableCell>
                      {agent.status === "ไม่ใช้งาน" ? (
                        <Badge className="w-[75px] bg-green-200 font-light text-green-800">ใช้งาน</Badge>
                      ) : (
                        <Badge className='w-[75px] bg-red-200 font-light text-red-800'>ไม่ใช้งาน</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/agents/${agent.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              แก้ไข
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
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
            <Button variant={"ghost"} className='font-light border'>กลับ</Button>
            <Button variant={"ghost"} className='font-light border'>ถัดไป</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
