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
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ReactCore',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-router-dom',
                /^@radix-ui\/.*/,
                'lucide-react',
                'oidc-client-ts',
                'framer-motion',
                'sonner',
                'vaul',
                'react-day-picker',
                'clsx',
                'tailwind-merge'
            ]
        }
    }
})
