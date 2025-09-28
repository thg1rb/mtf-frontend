import React from 'react'
import { Badge } from '../ui/badge'
import { getDocumentStatus } from '@/lib/utils/document'
import { FileCheck2, FileClock, FileWarning, FileX, FileX2 } from 'lucide-react'

interface DocumentExpiryBadgeProps {
    expiryDate: string | Date | null | undefined
}

export default function DocumentExpiryBadge({ expiryDate }: DocumentExpiryBadgeProps) {
    const { status, daysLeft } = getDocumentStatus(expiryDate);

    let icon: React.ReactElement;
    let text: string, className: string;

    switch (status) {
        case 'expired':
            icon = <FileWarning className="text-white" />
            text = 'หมดอายุ'
            className = 'bg-red-500 text-white'
            break

        case 'nearly':
            icon = <FileClock className="text-red-800" />
            text = `หมดอายุในอีก ${daysLeft} วัน`
            className = 'bg-yellow-100 text-red-800'
            break

        case 'valid':
            icon = <FileCheck2 className="text-green-800" />
            text = 'ใช้งานได้'
            className = 'bg-green-200 text-green-800'
            break

        case 'none':
            icon = <FileX2 className="text-gray-600" />
            text = 'ไม่มี'
            className = 'bg-gray-200 text-gray-600'
            break

        default:
            icon = <FileX className="text-gray-600" />
            text = 'ไม่ทราบสถานะ'
            className = 'bg-gray-200 text-gray-600'
    }

    return (
        <Badge className={`flex flex-row items-center gap-1 font-light ${className}`}>
            {icon}
            {text}
        </Badge>
    )
}
