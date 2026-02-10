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
                /^@radix-ui\/.*/,
                'class-variance-authority',
                'clsx',
                'cmdk',
                'date-fns',
                'embla-carousel-react',
                'framer-motion',
                'lucide-react',
                'oidc-client-ts',
                'react',
                'react-day-picker',
                'react-dom',
                'react-router-dom',
                'sonner',
                'tailwind-merge',
                'vaul'
            ]
        }
    }
})
