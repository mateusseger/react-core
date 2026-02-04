import { AppPageHeader, type AppPageHeaderAvatarProps } from "../../../../src/shared/components/layout"
import { useAuth } from "../../../../src/features/auth"
import { Home } from "lucide-react"

export function HomePage() {
    const { user } = useAuth()
    const avatar: AppPageHeaderAvatarProps = {
        src: "https://testingbot.com/free-online-tools/random-avatar/300",
        alt: "User Avatar",
        fallbackText: user?.profile?.name ? user.profile.name.split(' ')[0][0] : "U"
    }

    return (
        <div className="flex flex-col gap-6 px-0 py-4 sm:px-4">
            <AppPageHeader
                icon={Home}
                avatar={avatar}
                title={`Olá, ${user?.profile?.name?.split(' ')[0]}!`}
                description="Seja bem-vindo ao template de projetos React"
            />
        </div>
    )
}
