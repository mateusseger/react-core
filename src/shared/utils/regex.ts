export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE_BR: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    PHONE_BR_UNMASKED: /^\d{10,11}$/,
    CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    CPF_UNMASKED: /^\d{11}$/,
    CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    CNPJ_UNMASKED: /^\d{14}$/,
    CEP: /^\d{5}-\d{3}$/,
    CEP_UNMASKED: /^\d{8}$/,
    DATE_BR: /^\d{2}\/\d{2}\/\d{4}$/,
    DATE_ISO: /^\d{4}-\d{2}-\d{2}$/,
    TIME_24H: /^([01]\d|2[0-3]):([0-5]\d)$/,
    TIME_24H_SECONDS: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    CURRENCY_BR: /^R\$\s?\d{1,3}(\.\d{3})*(,\d{2})?$/,
    CREDIT_CARD: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
    URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    PASSWORD_MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
    ONLY_LETTERS: /^[a-zA-ZÀ-ÿ\s]+$/,
    ONLY_NUMBERS: /^\d+$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    LICENSE_PLATE_BR: /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/,
    RG: /^[\d.]{5,14}$/,
} as const

export type RegexKey = keyof typeof REGEX

export function testRegex(key: RegexKey, value: string): boolean {
    return REGEX[key].test(value)
}
