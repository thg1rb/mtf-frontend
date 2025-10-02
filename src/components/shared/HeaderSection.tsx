import React from 'react'

interface HeaderSectionProps {
    topic: string
    desc?: string
    leftActionButton?: React.ReactElement
    rightActionButtons?: React.ReactElement[]
}

export default function HeaderSection({ topic, desc, leftActionButton, rightActionButtons: rightActionButtons }: HeaderSectionProps) {
    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-y-[10px] w-full'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-x-[20px] gap-y-[10px] w-full'>
                {leftActionButton}
                <div className='flex flex-col'>
                    <p className='font-bold'>{topic}</p>
                    <p className='font-normal text-zinc-400'>{desc}</p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-x-[20px] gap-y-[10px] w-full md:w-min'>
                {rightActionButtons && rightActionButtons.map((button) => button)}
            </div>
        </div>
    )
}
