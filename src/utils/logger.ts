/**
 * Logger Service
 * Centralized logging with configurable levels and structured output
 * 
 * Usage:
 *   logger.info('User logged in', { userId: '123' })
 *   logger.error('Auth failed', error)
 *   logger.debug('Token renewed')
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none'

export interface LoggerConfig {
    level: LogLevel
    prefix?: string
    enabled?: boolean
}

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    none: 4,
}

class Logger {
    private config: Required<LoggerConfig> = {
        level: 'info',
        prefix: '@herval/react-core',
        enabled: true,
    }

    configure(config: Partial<LoggerConfig>): void {
        this.config = { ...this.config, ...config }
    }

    private shouldLog(level: LogLevel): boolean {
        if (!this.config.enabled) return false
        return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level]
    }

    private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
        const timestamp = new Date().toISOString()
        const prefix = this.config.prefix ? `[${this.config.prefix}]` : ''
        const contextStr = context ? ` ${JSON.stringify(context)}` : ''
        return `${timestamp} ${prefix} [${level.toUpperCase()}] ${message}${contextStr}`
    }

    debug(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message, context))
        }
    }

    info(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog('info')) {
            console.info(this.formatMessage('info', message, context))
        }
    }

    warn(message: string, context?: Record<string, unknown>): void {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message, context))
        }
    }

    error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
        if (this.shouldLog('error')) {
            const errorContext = error instanceof Error
                ? { ...context, error: error.message, stack: error.stack }
                : { ...context, error }
            console.error(this.formatMessage('error', message, errorContext))
        }
    }
}

// Singleton instance
export const logger = new Logger()

// Configure logger based on environment
if (typeof import.meta !== 'undefined' && import.meta.env) {
    logger.configure({
        level: import.meta.env.DEV ? 'debug' : 'warn',
        enabled: true,
    })
}
