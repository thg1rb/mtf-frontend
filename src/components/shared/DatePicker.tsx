"use client"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import { th } from "date-fns/locale"

interface DatePickerProps {
    value: Date | null
    onChange: (date: Date | null) => void
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
}

export function DatePicker({
    value,
    onChange,
    placeholder = "เลือกวันที่",
    disabled = false,
    clearable = true,
}: DatePickerProps) {
    const formatDateLabel = (date: Date | null) =>
        date
            ? date.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : placeholder

    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-start text-left font-light",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDateLabel(value)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ?? undefined}
                        locale={th}
                        onSelect={(date) => onChange(date ?? null)}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>

            {clearable && value && !disabled && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onChange(null)}
                    className="h-9 w-9"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}
