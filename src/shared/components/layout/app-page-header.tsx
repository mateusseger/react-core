import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage, Button } from '../ui'

export interface AppPageHeaderAvatarProps {
    src: string
    alt: string
    fallbackText: string
}

export interface AppPageHeaderProps {
    backButton?: boolean
    icon?: LucideIcon
    avatar?: AppPageHeaderAvatarProps
    title: string
    description: string
}

export function AppPageHeader({ backButton, icon: Icon, avatar, title, description }: AppPageHeaderProps) {
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
            {avatar && (
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>{avatar.fallbackText}</AvatarFallback>
                </Avatar>
            )}
            <div className="flex-1 min-w-0">
                <h1 className="font-bold text-2xl">{title}</h1>
                <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
            </div>
        </div>
    )
}
