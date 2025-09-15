import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatGridProps {
    statItems: Array<{
        id: string
        title: string,
        amount: number,
        amountTextColor: string,
        icon: LucideIcon
    }>
}

export default function StatGrid({statItems}: StatGridProps) {
    return (
        <div>
            <div className={`grid w-full gap-4 grid-cols-2 ${statItems.length == 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                {statItems.map((statItem) => (
                    <div key={statItem.id} className='flex flex-col gap-y-[20px] p-[8px] md:p-[20px] border-[1px] border-slate-300 rounded-lg md:rounded-2xl shadow-md'>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='font-light'>{statItem.title}</p>
                            {<statItem.icon className={`size-[12px] md:size-[24px] ${statItem.amountTextColor}`} />}
                        </div>
                        <p className={`font-semibold self-center ${statItem.amountTextColor}`}>{statItem.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
