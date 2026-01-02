import { useState } from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shared/components/ui'

import { cn } from '@/shared/utils'

export interface ComboboxOption {
    value: string
    label: string
}

interface ComboboxProps {
    id?: string
    value?: string
    onChange?: (value: string | undefined) => void
    options: ComboboxOption[]
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    disabled?: boolean
    className?: string
}

export function Combobox({
    id,
    value,
    onChange,
    options,
    placeholder = 'Selecione uma opção...',
    searchPlaceholder = 'Pesquisar...',
    emptyMessage = 'Nenhum resultado encontrado.',
    disabled,
    className,
}: ComboboxProps) {
    const [open, setOpen] = useState(false)

    const selectedOption = options.find((option) => option.value === value)

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === value ? undefined : currentValue
        onChange?.(newValue)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between font-normal',
                        !value && 'text-muted-foreground',
                        className
                    )}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={handleSelect}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            value === option.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
