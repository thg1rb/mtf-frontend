import React from 'react'

interface HeaderSectionProps {
    topic: string
    desc?: string
    actionButton?: React.ReactElement
}

export default function HeaderSection({ topic, desc, actionButton }: HeaderSectionProps) {
    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-y-[10px] w-full'>
            <div className='flex flex-col'>
                <p className='font-bold'>{topic}</p>
                <p className='font-normal'>{desc}</p>
            </div>
            {actionButton}
        </div>
    )
}
