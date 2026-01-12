import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'

interface AppPageHeaderProps {
    backButton?: boolean
    icon?: LucideIcon
    title: string
    description: string
}

export function AppPageHeader({ backButton, icon: Icon, title, description }: AppPageHeaderProps) {
    const navigate = useNavigate()

    return (
        <div className="flex items-center gap-4 mb-4">
            {backButton && (
                <div className='flex items-center justify-center'>
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft />
                    </Button>
                </div>
            )}
            {Icon && (
                <div className="flex items-center justify-center">
                    <Icon className="text-primary" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <h1 className="font-bold text-2xl">{title}</h1>
                <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
            </div>
        </div>
    )
}
