// Configuração do menu para a demo
import { Home, Palette, Package, Settings, FileText } from 'lucide-react'
import type { MenuItem } from '@herval/react-core'

export const menuItems: MenuItem[] = [
    {
        name: 'Home',
        url: '/',
        icon: Home,
    },
    {
        name: 'Componentes',
        icon: Package,
        subItems: [
            {
                name: 'Botões',
                url: '/components/buttons',
                icon: Package,
            },
            {
                name: 'Forms',
                url: '/components/forms',
                icon: FileText,
            },
            {
                name: 'Cards',
                url: '/components/cards',
                icon: Package,
            },
        ],
    },
    {
        name: 'Temas',
        url: '/themes',
        icon: Palette,
    },
    {
        name: 'Configurações',
        url: '/settings',
        icon: Settings,
    },
]
