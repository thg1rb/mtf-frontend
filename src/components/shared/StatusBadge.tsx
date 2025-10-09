import React from 'react'
import { Badge } from '../ui/badge'

export default function StatusBadge({ status }: { status: "ACTIVE" | "INACTIVE" }) {
    return (status === "ACTIVE") ? (
        <Badge className="w-[75px] bg-green-200 font-light text-green-800">ใช้งาน</Badge>
    ) : (
        <Badge className='w-[75px] bg-red-200 font-light text-red-800'>ไม่ใช้งาน</Badge>
    )
}
