import HeaderSection from '@/components/shared/HeaderSection'
import TaskForm from '@/components/task/TaskForm'
import { getTaskById } from '@/lib/mock-data'
import React from 'react'

export default async function RegisterTaskEditPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const task = getTaskById(id);

    return (
        <div className='flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]'>
            {/* HeaderSection */}
            <HeaderSection
                topic="แก้ไขข้อมูลการขึ้นทะเบียนใหม่"
                hasBackButton={
                    true}
            />

            {/* Register Form with register mode */}
            <TaskForm typeOfTask='register' mode='edit' task={task} defaultValues={task} workId={id} />
        </div>
    )
}
