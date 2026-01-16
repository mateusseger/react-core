import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { parse, format, isValid, startOfDay, addYears } from 'date-fns'
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

const DEFAULT_MIN_DATE = new Date(1915, 0, 1)
const DEFAULT_MAX_DATE = addYears(new Date(), 100)

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
    minDate = DEFAULT_MIN_DATE,
    maxDate = DEFAULT_MAX_DATE,
    placeholder = 'DD/MM/AAAA',
    disabled,
    className
}: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [inputValue, setInputValue] = useState('')

    const normalizedMinDate = startOfDay(minDate)
    const normalizedMaxDate = startOfDay(maxDate)

    const displayValue = inputValue || (value && isValid(value) ? format(value, 'dd/MM/yyyy') : '')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskDateBR(e.target.value)
        setInputValue(masked)

        if (masked.length === 0) {
            setError(undefined)
            onValueChange?.(undefined)
        } else if (masked.length === 10) {
            const parsedDate = startOfDay(parse(masked, 'dd/MM/yyyy', new Date()))

            if (isValid(parsedDate)) {
                const isNotBeforeMinDate = parsedDate >= normalizedMinDate
                const isNotAfterMaxDate = parsedDate <= normalizedMaxDate

                if (isNotBeforeMinDate && isNotAfterMaxDate) {
                    setError(undefined)
                    onValueChange?.(parsedDate)
                } else {
                    if (!isNotBeforeMinDate) {
                        setError(`Data não pode ser anterior à ${format(normalizedMinDate, 'dd/MM/yyyy')}`)
                    } else {
                        setError(`Data não pode ser posterior à ${format(normalizedMaxDate, 'dd/MM/yyyy')}`)
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
        onValueChange?.(date ? startOfDay(date) : undefined)
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
                            startMonth={normalizedMinDate}
                            endMonth={normalizedMaxDate}
                            disabled={{ before: normalizedMinDate, after: normalizedMaxDate }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {error && <FieldError>{error}</FieldError>}
        </div>
    )
}
