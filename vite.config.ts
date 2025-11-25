import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'HervalReactCore',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-router-dom',
                '@tanstack/react-query',
                /^react\/.*/,
                /^react-dom\/.*/,
                /^@radix-ui\/.*/,
                'lucide-react',
                'next-themes',
                'oidc-client',
                'axios',
                'framer-motion',
                'sonner',
                'vaul',
                'zod',
                'date-fns',
                'react-hook-form',
                '@hookform/resolvers',
                'react-error-boundary',
                'react-day-picker'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                    '@tanstack/react-query': 'ReactQuery'
                }
            }
        }
    }
})
