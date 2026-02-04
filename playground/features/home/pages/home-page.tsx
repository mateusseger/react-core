import { AppPageHeader } from "../../../../src/shared/components/layout"
import { useAuth } from "../../../../src/features/auth"
import { Home } from "lucide-react"

export function HomePage() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col gap-6 px-0 py-4 sm:px-4">
            <AppPageHeader
                icon={Home}
                title={`Olá, ${user?.profile?.name?.split(' ')[0]}!`}
                description="Seja bem-vindo ao template de projetos React"
            />
        </div>
    )
}
