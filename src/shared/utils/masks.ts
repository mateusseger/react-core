export function maskPhone(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 11)
    if (numbers.length <= 2) return numbers.length ? `(${numbers}` : ""
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
}

export function maskCPF(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 11)
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) {
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    }
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
}

export function maskCNPJ(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 14)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    if (numbers.length <= 8) {
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    }
    if (numbers.length <= 12) {
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    }
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`
}

export function maskCEP(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 8)
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5)}`
}

export function maskPIS(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 11)
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 8) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 10) return `${numbers.slice(0, 3)}.${numbers.slice(3, 8)}.${numbers.slice(8)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 8)}.${numbers.slice(8, 10)}-${numbers.slice(10)}`
}

export function maskVoterID(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 12)
    if (numbers.length <= 4) return numbers
    if (numbers.length <= 8) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 8)} ${numbers.slice(8)}`
}

export function maskRG(value: string): string {
    const chars = value.replace(/[^0-9Xx]/g, "").toUpperCase().slice(0, 10)
    if (chars.length <= 2) return chars
    if (chars.length <= 5) return `${chars.slice(0, 2)}.${chars.slice(2)}`
    if (chars.length <= 8) return `${chars.slice(0, 2)}.${chars.slice(2, 5)}.${chars.slice(5)}`
    return `${chars.slice(0, 2)}.${chars.slice(2, 5)}.${chars.slice(5, 8)}-${chars.slice(8)}`
}

export function maskDate(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 8)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`
}

export function maskTime(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 4)
    if (numbers.length <= 2) return numbers
    return `${numbers.slice(0, 2)}:${numbers.slice(2)}`
}

export function maskCreditCard(value: string): string {
    const numbers = value.replace(/\D/g, "").slice(0, 16)
    const groups = numbers.match(/.{1,4}/g)
    return groups ? groups.join(" ") : ""
}

export function maskCurrency(value: string): string {
    const numbers = value.replace(/\D/g, "")
    if (!numbers) return ""
    const amount = parseInt(numbers, 10) / 100
    return amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

export function maskOnlyNumbers(value: string): string {
    return value.replace(/\D/g, "")
}

export function maskOnlyLetters(value: string): string {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
}

export function maskAlphanumeric(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, "")
}

export function unmask(value: string): string {
    return value.replace(/\D/g, "")
}

export function unmaskAll(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, "")
}
