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
    Button,
    FieldError
} from '@/shared/components/ui'
import { cn, maskDateBR } from '@/shared/utils'

const DEFAULT_FROM_YEAR = 1915
const DEFAULT_TO_YEAR = new Date().getFullYear() + 100

export interface DatePickerProps {
    id?: string
    value?: Date
    onValueChange?: (value: Date | undefined) => void
    minDate?: Date
    maxDate?: Date
    placeholder?: string
    disabled?: boolean
    className?: string
}

export function DatePicker({
    id,
    value,
    onValueChange,
    minDate = new Date(DEFAULT_FROM_YEAR, 0, 1),
    maxDate = new Date(DEFAULT_TO_YEAR, 11, 31),
    placeholder = 'DD/MM/AAAA',
    disabled,
    className
}: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [inputValue, setInputValue] = useState('')

    const displayValue = inputValue || (value && isValid(value) ? format(value, 'dd/MM/yyyy') : '')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskDateBR(e.target.value)
        setInputValue(masked)

        if (masked.length === 0) {
            setError(undefined)
            onValueChange?.(undefined)
        } else if (masked.length === 10) {
            const parsedDate = parse(masked, 'dd/MM/yyyy', new Date())

            if (isValid(parsedDate)) {
                const isNotBeforeMinDate = parsedDate >= minDate
                const isNotAfterMaxDate = parsedDate <= maxDate

                if (isNotBeforeMinDate && isNotAfterMaxDate) {
                    setError(undefined)
                    onValueChange?.(parsedDate)
                } else {
                    if (!isNotBeforeMinDate) {
                        setError(`Data não pode ser anterior a ${format(minDate, 'dd/MM/yyyy')}`)
                    } else {
                        setError(`Data não pode ser posterior a ${format(maxDate, 'dd/MM/yyyy')}`)
                    }
                }
            } else {
                setError('Data inválida')
            }
        } else {
            setError(undefined)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
        }
    }

    const handleCalendarSelect = (date: Date | undefined) => {
        setError(undefined)
        onValueChange?.(date)
        setOpen(false)
        setInputValue('')
    }

    return (
        <div className="flex flex-col gap-3">
            <div className={cn('relative', className)}>
                <Input
                    id={id}
                    value={displayValue}
                    onChange={handleInputChange}
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
                            startMonth={minDate}
                            endMonth={maxDate}
                            disabled={{ before: minDate, after: maxDate }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {error && <FieldError>{error}</FieldError>}
        </div>
    )
}
