import AgentForm from '@/components/agent/AgentForm'
import HeaderSection from '@/components/shared/HeaderSection'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { findMockAgentById } from '@/lib/mock-data'
import { SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function AgentPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // TODO: GET method `/api/agents/${id}`
    const data = findMockAgentById(id);

    return (
        <div className='flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
            {/* HeaderSection */}
            <HeaderSection
                topic="ข้อมูลของนายหน้า"
                hasBackButton={true}
                rightActionButtons={[
                    (<Button asChild key='แก้ไขข้อมูล' className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
                        <Link href={`/agents/${id}/edit`}>
                            <SquarePen className='size-[24px] mr-2' />
                            แก้ไขข้อมูล
                        </Link>
                    </Button>)
                ]} />

            <AgentForm mode='view' defaultValues={data} />

            {!data && <AlertDialog open={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-medium'>ไม่พบข้อมูลนายหน้า</AlertDialogTitle>
                        <AlertDialogDescription className='font-light'>
                            ตรวจสอบหมายเลขบัตรประชาชนของนายหน้าว่าอยู่ในระบบหรือไม่
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className='font-light'>
                            <Link href='/agents'>ย้อนกลับ</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>}
        </div>
    )
}
