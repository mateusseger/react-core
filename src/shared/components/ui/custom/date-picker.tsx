import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { parse, format, isValid } from 'date-fns'
import { ptBR } from "react-day-picker/locale";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Input,
    Calendar,
    Button
} from '@/shared/components/ui'
import { cn, maskDateBR } from '@/shared/utils'

const DEFAULT_FROM_YEAR = 1915
const DEFAULT_TO_YEAR = new Date().getFullYear() + 100

export interface DatePickerProps {
    id?: string
    value?: Date
    onValueChange?: (value: Date | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    fromYear?: number
    toYear?: number
}

export function DatePicker({
    id,
    value,
    onValueChange,
    placeholder = 'DD/MM/AAAA',
    disabled,
    className,
    fromYear = DEFAULT_FROM_YEAR,
    toYear = DEFAULT_TO_YEAR,
}: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const displayValue = inputValue || (value && isValid(value) ? format(value, 'dd/MM/yyyy') : '')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskDateBR(e.target.value)
        setInputValue(masked)

        if (masked.length === 0) {
            onValueChange?.(undefined)
        } else if (masked.length === 10) {
            const parsedDate = parse(masked, 'dd/MM/yyyy', new Date())
            if (isValid(parsedDate) && parsedDate.getFullYear() >= fromYear && parsedDate.getFullYear() <= toYear) {
                onValueChange?.(parsedDate)
            } else {
                onValueChange?.(undefined)
            }
        }
    }

    const handleInputBlur = () => {
        setInputValue('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
        }
    }

    const handleCalendarSelect = (date: Date | undefined) => {
        onValueChange?.(date)
        setOpen(false)
        setInputValue('')
    }

    return (
        <div className={cn('relative', className)}>
            <Input
                id={id}
                value={displayValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="pr-10"
            />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        disabled={disabled}
                    >
                        <CalendarIcon className="size-4 text-muted-foreground opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleCalendarSelect}
                        captionLayout="dropdown"
                        defaultMonth={value}
                        locale={ptBR}
                        startMonth={new Date(fromYear, 0)}
                        endMonth={new Date(toYear, 11)}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
