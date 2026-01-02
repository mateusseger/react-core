import { useState, useMemo, useCallback } from 'react'
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
    PopoverTrigger,
    Spinner
} from '@/shared/components/ui'

import { cn } from '@/shared/utils'

export interface ComboboxOption<T = string> {
    value: T
    label: string
    group?: string
    renderItem?: () => ReactNode
}

export interface ComboboxProps<T = string> {
    id?: string
    value?: T
    onValueChange: (value: T | undefined) => void
    options: ComboboxOption<T>[]
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    disabled?: boolean
    className?: string
    allowClear?: boolean
    isLoading?: boolean
    loadingMessage?: string
}

export function Combobox<T = string>({
    id,
    value,
    onValueChange,
    options,
    placeholder = 'Selecione',
    searchPlaceholder = 'Buscar...',
    emptyMessage = 'Nenhum resultado encontrado.',
    disabled = false,
    className,
    allowClear = true,
    isLoading = false,
    loadingMessage = 'Carregando...',
}: ComboboxProps<T>) {
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
                {} as Record<string, ComboboxOption<T>[]>
            ),
        [options]
    )

    const selectedOption = useMemo(
        () => options.find((opt) => opt.value === value),
        [options, value]
    )

    const hasGroups = useMemo(() => options.some((opt) => opt.group), [options])

    const handleSelect = useCallback(
        (optionValue: T) => {
            const newValue = allowClear && optionValue === value ? undefined : optionValue
            onValueChange(newValue)
            setOpen(false)
        },
        [allowClear, value, onValueChange]
    )

    const renderCommandItem = useCallback(
        (option: ComboboxOption<T>, index: number) => (
            <CommandItem
                key={`${String(option.value)}-${index}`}
                value={option.label}
                onSelect={() => handleSelect(option.value)}
            >
                {option.renderItem ? option.renderItem() : <span>{option.label}</span>}
                <Check
                    className={cn(
                        'ml-auto h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                />
            </CommandItem>
        ),
        [handleSelect, value]
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between font-normal', className)}
                    disabled={disabled || isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="text-muted-foreground">{loadingMessage}</span>
                            <Spinner className="ml-2 h-4 w-4 shrink-0 animate-spin" />
                        </>
                    ) : selectedOption ? (
                        <>
                            {selectedOption.renderItem ? (
                                selectedOption.renderItem()
                            ) : (
                                <span>{selectedOption.label}</span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </>
                    ) : (
                        <>
                            <span className="text-muted-foreground">{placeholder}</span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} disabled={isLoading} />
                    <CommandList>
                        <CommandEmpty>{isLoading ? loadingMessage : emptyMessage}</CommandEmpty>
                        {hasGroups
                            ? Object.entries(optionsByGroup).map(([group, groupOptions]) =>
                                group === '__default__' ? (
                                    groupOptions.map((option, index) => renderCommandItem(option, index))
                                ) : (
                                    <CommandGroup key={group} heading={group}>
                                        {groupOptions.map((option, index) => renderCommandItem(option, index))}
                                    </CommandGroup>
                                )
                            )
                            : options.map((option, index) => renderCommandItem(option, index))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
