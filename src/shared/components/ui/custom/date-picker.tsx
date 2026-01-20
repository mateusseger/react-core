import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { parse, format, isValid, startOfDay, addYears } from 'date-fns'
import { ptBR } from "react-day-picker/locale"
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

const DATE_FORMAT = 'dd/MM/yyyy'
const DEFAULT_MIN_DATE = new Date(1915, 0, 1)
const DEFAULT_MAX_DATE = addYears(new Date(), 100)

export interface DatePickerProps {
    id?: string
    value?: Date
    onValueChange: (value: Date | undefined) => void
    onError?: (error: string | undefined) => void
    minDate?: Date
    maxDate?: Date
    placeholder?: string
    autoFocus?: boolean
    disabled?: boolean
    className?: string
}

function formatDate(date: Date | undefined): string {
    return date && isValid(date) ? format(date, DATE_FORMAT) : ''
}

function parseDate(value: string): Date | undefined {
    if (value.length !== 10) return undefined
    const parsed = startOfDay(parse(value, DATE_FORMAT, new Date()))
    return isValid(parsed) ? parsed : undefined
}

function validateDate(date: Date | undefined, minDate: Date, maxDate: Date): string | undefined {
    if (!date) return 'Data inválida'
    if (date < minDate) return `Data não pode ser anterior à ${format(minDate, DATE_FORMAT)}`
    if (date > maxDate) return `Data não pode ser posterior à ${format(maxDate, DATE_FORMAT)}`
    return undefined
}

export function DatePicker({
    id,
    value,
    onValueChange,
    onError,
    minDate = DEFAULT_MIN_DATE,
    maxDate = DEFAULT_MAX_DATE,
    placeholder = 'DD/MM/AAAA',
    autoFocus = false,
    disabled = false,
    className
}: DatePickerProps) {
    const [inputValue, setInputValue] = useState(() => formatDate(value))
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string>()

    const updateError = (newError: string | undefined) => {
        setError(newError)
        onError?.(newError)
    }

    const lastValueTimestamp = useRef(value?.getTime())

    // Sync: detecta mudanças externas no value
    const currentTimestamp = value?.getTime()
    if (currentTimestamp !== lastValueTimestamp.current) {
        updateError(undefined)
        lastValueTimestamp.current = currentTimestamp
        setInputValue(formatDate(value))
    }

    const normalizedMinDate = startOfDay(minDate)
    const normalizedMaxDate = startOfDay(maxDate)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return

        const masked = maskDateBR(e.target.value)
        setInputValue(masked)

        if (masked === '') {
            updateError(undefined)
            lastValueTimestamp.current = undefined
            onValueChange(undefined)
            return
        }

        if (masked.length < 10) {
            updateError(undefined)
            return
        }

        const parsed = parseDate(masked)
        const validationError = validateDate(parsed, normalizedMinDate, normalizedMaxDate)

        if (validationError) {
            updateError(validationError)
        } else {
            updateError(undefined)
            lastValueTimestamp.current = parsed?.getTime()
            onValueChange(parsed)
        }
    }

    const handleCalendarSelect = (date: Date | undefined) => {
        if (disabled) return

        const normalized = date ? startOfDay(date) : undefined
        updateError(undefined)
        lastValueTimestamp.current = normalized?.getTime()
        setInputValue(formatDate(normalized))
        onValueChange(normalized)
        setOpen(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className={cn('relative', className)}>
                <Input
                    id={id}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
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
