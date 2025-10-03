import { FileText } from 'lucide-react'
import React from 'react'

interface TaskStepsProps {
    type: "register" | "renew"
    currentStep: number
}

const registerSteps = [
    {
        step: 1,
        detail: "รวบรวมเอกสารเพิ่มเติม",
    },
    {
        step: 2,
        detail: "ตรวจสอบโรคและซื้อประกันสุขภาพ",
    },
    {
        step: 3,
        detail: "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)",
    },
    {
        step: 4,
        detail: "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)",
    },
]

const renewSteps = [
    {
        step: 1,
        detail: "รวบรวมเอกสารเพิ่มเติม",
    },
    {
        step: 2,
        detail: "ตรวจสอบโรคและซื้อประกันสุขภาพ",
    },
    {
        step: 3,
        detail: "ยื่น Calling Visa กับกรมแรงงาน",
    },
    {
        step: 4,
        detail: "ซื้อใบอนุญาตทำงานกับกรมแรงงาน",
    },
    {
        step: 5,
        detail: "ตีวีซ่าตรวจคนเข้าเมือง",
    },
]

export default function TaskSteps({ type, currentStep }: TaskStepsProps) {
    const steps = type === "register" ? registerSteps : renewSteps;

    return (
        <div className='flex flex-col gap-y-[40px] w-full p-[27px] border border-slate-300 rounded-2xl shadow-md'>
            <div className='flex flex-col'>
                <div className='flex flex-row gap-x-[5px] items-center'>
                    <FileText />
                    <p className='font-normal'>ขั้นตอนการดำเนินการ</p>
                </div>
                <p className='text-zinc-400'>ขั้นตอนทั้งหมดสำหรับการต่ออายุใบอนุญาตทำงาน</p>
            </div>
            <div className='flex flex-col gap-y-[18px]'>
                {
                    steps.map((step) => (
                        <div key={step.step} className='flex flex-col gap-y-[10px]'>
                            <div className='flex flex-row items-center gap-x-3'>
                                <div className={`${step.step === currentStep ? "bg-black text-white" : "bg-zinc-200 text-zinc-700"} w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
                                    <p className='text-white'>
                                        {step.step}
                                    </p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row gap-x-[5px]'>
                                        <p className='font-normal text-zinc-700'>ขั้นตอนที่ {step.step}</p>
                                        { currentStep === step.step ? <div className='bg-blue-200 p-[5px] rounded-md'><p className='font-light text-blue-700'>ขั้นตอนปัจจุบัน</p></div> : <></>}
                                    </div>
                                    <p className='font-light text-zinc-400'>{step.detail}</p>
                                </div>
                            </div>
                            {step.step !== steps.length ? (<div className='w-[1px] h-10 ml-[23px] bg-zinc-300'></div>) : <></>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
