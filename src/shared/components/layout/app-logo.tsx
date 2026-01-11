import { Link } from "react-router-dom"
import { useTheme } from "@/features/themes"
import { cn } from "@/shared/utils/cn"
import type { ProjectConfig } from "@/shared/types/config"
import logoHervalLight from "@/shared/assets/logos/herval-light.png"
import logoHervalDark from "@/shared/assets/logos/herval-dark.png"
import logoTaqiLight from "@/shared/assets/logos/taqi-light.svg"
import logoTaqiDark from "@/shared/assets/logos/taqi-dark.svg"
import logoIplaceLight from "@/shared/assets/logos/iplace-light.svg"
import logoIplaceDark from "@/shared/assets/logos/iplace-dark.svg"

const logos = {
    herval: { light: logoHervalLight, dark: logoHervalDark },
    taqi: { light: logoTaqiLight, dark: logoTaqiDark },
    iplace: { light: logoIplaceLight, dark: logoIplaceDark },
}

export interface AppLogoProps {
    projectConfig: ProjectConfig
    onClick?: () => void
    className?: string
}

export function AppLogo({
    projectConfig,
    onClick,
    className
}: AppLogoProps) {
    const { theme } = useTheme()

    const currentLogo = projectConfig.logo || logos[theme.name][theme.mode]

    return (
        <Link
            to="/"
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 sm:gap-3 transition-all duration-200 ease-linear cursor-pointer",
                "h-12 sm:h-14",
                className
            )}
        >
            <img
                src={currentLogo}
                alt="Logo"
                className="h-5 sm:h-6"
            />

            <h1 className="text-xs sm:text-sm font-bold">{projectConfig.title}</h1>
        </Link>
    )
}
