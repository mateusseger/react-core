import { useState } from 'react'

import { CalendarIcon } from 'lucide-react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button,
    Calendar
} from '@/shared/components/ui'

import { cn } from '@/shared/utils'

interface DatePickerProps {
    id?: string
    value?: string // formato ISO: YYYY-MM-DD
    onChange?: (value: string | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

export function DatePicker({
    id,
    value,
    onChange,
    placeholder = 'Selecione uma data',
    disabled,
    className,
}: DatePickerProps) {
    const [open, setOpen] = useState(false)

    const selectedDate = value ? new Date(value + 'T00:00:00') : undefined

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            const isoDate = date.toISOString().split('T')[0]
            onChange?.(isoDate)
        } else {
            onChange?.(undefined)
        }
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between font-normal',
                        !value && 'text-muted-foreground',
                        className
                    )}
                >
                    {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : placeholder}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    captionLayout="dropdown"
                    defaultMonth={selectedDate}
                />
            </PopoverContent>
        </Popover>
    )
}
