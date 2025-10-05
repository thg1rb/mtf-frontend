import { getTypeOfTaskLabelAndSteps, isPaidByTaskIdAndStep } from '@/lib/mock-data'
import { getCurrentStepByTask, isTaskCompleted } from '@/lib/utils/task'
import { Receipt, Task } from '@/types'
import { FileText } from 'lucide-react'
import React from 'react'

interface TaskStepsProps {
    task: Task
    stepCompletedDates: (Date | string | null)[]
}

const getCurrentStep = (steps: (Date | string | null)[]) => {
    let currentStep: number = 0;
    for (let i: number = 0; i < steps.length; i++) {
        if (steps[i] !== null) currentStep++;
    }
    return currentStep;
}

export default function TaskSteps({ task, stepCompletedDates }: TaskStepsProps) {

    const {steps} = getTypeOfTaskLabelAndSteps(task.typeOfTask);

    return (
        <div className='flex flex-col gap-y-[40px] w-full p-[27px] border border-slate-300 rounded-2xl shadow-md'>
            <div className='flex flex-col'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <FileText />
                    <p className='font-normal'>ขั้นตอนการดำเนินการ</p>
                </div>
                <p className='font-light text-zinc-400'>ขั้นตอนทั้งหมดสำหรับการต่ออายุใบอนุญาตทำงาน</p>
            </div>
            <div className='flex flex-col gap-y-[18px]'>
                {
                    steps.map((step, index) => {
                        const currentStep = getCurrentStepByTask(task);
                        const isPaidCurrentStep = isPaidByTaskIdAndStep(task.id, step.step);

                        return (
                        <div key={step.step} className='flex flex-col gap-y-[10px]'>
                            <div className='flex flex-row items-center gap-x-3'>
                                <div className={`${stepCompletedDates[index] !== null ? "bg-black text-white" : isPaidCurrentStep ? "bg-green-200" : "bg-zinc-200"} w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
                                    <p className='text-white'>
                                        {step.step}
                                    </p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row gap-x-[5px]'>
                                        <p className='font-normal text-zinc-700'>ขั้นตอนที่ {step.step}</p>
                                        { currentStep === step.step && !isTaskCompleted(task) ? <div className='bg-blue-200 p-[5px] rounded-md'><p className='font-light text-blue-700'>ขั้นตอนปัจจุบัน</p></div> : <></>}
                                    </div>
                                    <p className='font-light text-zinc-400'>{step.detail}</p>
                                </div>
                            </div>
                            {index !== steps.length - 1 ? (<div className='w-[1px] h-10 ml-[23px] bg-zinc-300'></div>) : <></>}
                        </div>
                    )})
                }
            </div>
        </div>
    )
}
