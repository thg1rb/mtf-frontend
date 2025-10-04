import HeaderSection from '@/components/shared/HeaderSection'
import TaskForm from '@/components/task/TaskForm'
import { Button } from '@/components/ui/button'
import { getTaskById } from '@/lib/mock-data'
import { ChevronLeft, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function RegisterTaskPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const task = getTaskById(id);

    return (
        <div className='flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
            {/* HeaderSection */}
            <HeaderSection
                topic="ข้อมูลการขึ้นทะเบียนใหม่"
                leftActionButton={
                    <Button
                        asChild
                        variant="ghost"
                        className='flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer'
                    >
                        <Link href='/tasks'>
                            <ChevronLeft className='size-[24px] mr-2' />
                            ย้อนกลับ
                        </Link>
                    </Button>}
                rightActionButtons={[
                    (<Button asChild key='แก้ไขข้อมูล' className='font-normal px-[17px] py-[5px] w-full md:w-auto'>
                        <Link href={`/tasks/register/${id}/edit`}>
                            <SquarePen className='size-[24px] mr-2' />
                            แก้ไขข้อมูล
                        </Link>
                    </Button>)
                ]} />

            {/* TODO: Register Form with register mode */}
            <TaskForm type='register' mode='view' defaultValues={task} />
        </div>
    )
}
