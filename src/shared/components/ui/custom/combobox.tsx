import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/shared/components/ui'
import { cn } from '@/shared/utils'

export interface ComboboxOption {
    value: string
    label: string
    group?: string
    renderItem?: () => ReactNode
}

export interface ComboboxProps {
    id?: string
    value?: string
    onValueChange: (value: string | undefined) => void
    options?: ComboboxOption[]
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    allowClear?: boolean
    searchable?: boolean
    modal?: boolean
    disabled?: boolean
    className?: string
}

export function Combobox({
    id,
    value,
    onValueChange,
    options = [],
    placeholder = 'Selecione',
    searchPlaceholder = 'Buscar...',
    emptyMessage = 'Nenhum resultado encontrado.',
    allowClear = true,
    searchable = true,
    modal = false,
    disabled = false,
    className
}: ComboboxProps) {
    const [open, setOpen] = useState(false)

    const optionsByGroup = useMemo(
        () =>
            options.reduce(
                (acc, option) => {
                    const groupKey = option.group || '__default__'
                    if (!acc[groupKey]) {
                        acc[groupKey] = []
                    }
                    acc[groupKey].push(option)
                    return acc
                },
                {} as Record<string, ComboboxOption[]>
            ),
        [options]
    )

    const selectedOption = useMemo(
        () => options.find((opt) => opt.value === value),
        [options, value]
    )

    const handleSelect = (optionValue: string) => {
        const newValue = allowClear && optionValue === value ? undefined : optionValue
        onValueChange(newValue)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} modal={modal}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'justify-between font-normal',
                        !selectedOption && 'text-muted-foreground',
                        className
                    )}
                    disabled={disabled}
                >
                    <span className="overflow-hidden whitespace-nowrap">
                        {selectedOption
                            ? (selectedOption.renderItem?.() ?? selectedOption.label)
                            : placeholder}
                    </span>
                    <ChevronsUpDown className="text-muted-foreground size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) overflow-hidden p-0">
                <Command shouldFilter={searchable} defaultValue={value}>
                    {searchable && <CommandInput placeholder={searchPlaceholder} />}
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        {Object.entries(optionsByGroup).map(([group, groupOptions]) => (
                            <CommandGroup key={group} heading={group === '__default__' ? undefined : group}>
                                {groupOptions.map((option, index) => (
                                    <CommandItem
                                        key={`${option.value}-${index}`}
                                        value={option.value}
                                        keywords={[option.label]}
                                        onSelect={() => handleSelect(option.value)}
                                        className="pr-8"
                                    >
                                        <span>
                                            {option.renderItem ? option.renderItem() : option.label}
                                        </span>
                                        <span className="absolute right-2 flex size-3.5 items-center justify-center">
                                            <Check
                                                className={cn(
                                                    'size-4',
                                                    value === option.value ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
