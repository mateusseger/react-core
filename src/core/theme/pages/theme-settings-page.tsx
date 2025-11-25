import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Switch } from "@/components/ui/shadcn/switch"
import { Badge } from "@/components/ui/shadcn/badge"
import { useTheme } from "@/core/theme/hooks/use-theme"
import { Sun, Moon, Check, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { THEMES, THEME_METADATA, type ThemeName } from "@/core/theme/config/theme-config"
import logoHervalDark from "@/assets/logos/logo-herval-dark.png"
import logoHervalLight from "@/assets/logos/logo-herval-light.png"
import logoIplaceDark from "@/assets/logos/logo-iplace-dark.svg"
import logoIplaceLight from "@/assets/logos/logo-iplace-light.svg"
import logoTaqiDark from "@/assets/logos/logo-taqi-dark.svg"
import logoTaqiLight from "@/assets/logos/logo-taqi-light.svg"

// Gera as opções de tema dinamicamente a partir do theme-config
const THEME_OPTIONS = (Object.keys(THEMES) as ThemeName[]).map((themeId) => ({
    id: themeId,
    name: THEME_METADATA[themeId].name,
    description: THEME_METADATA[themeId].description,
    palette: {
        primary: THEMES[themeId].light.primary,
        secondary: THEMES[themeId].light.secondary,
        accent: THEMES[themeId].light.accent,
        muted: THEMES[themeId].light.muted,
    },
    characteristics: THEME_METADATA[themeId].characteristics,
}))

export function ThemeSettingsPage() {
    const { theme, setThemeColor, setThemeMode } = useTheme()

    const handleThemeChange = (themeId: ThemeName) => {
        setThemeColor(themeId)
    }

    const handleModeToggle = () => {
        setThemeMode(theme.mode === "light" ? "dark" : "light")
    }

    // Mapeamento de logos por tema
    const themeLogos: Record<ThemeName, { light: string; dark: string }> = {
        herval: { light: logoHervalLight, dark: logoHervalDark },
        taqi: { light: logoTaqiLight, dark: logoTaqiDark },
        iplace: { light: logoIplaceLight, dark: logoIplaceDark },
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Temas</h1>
                        <p className="text-muted-foreground">
                            Personalize a aparência da aplicação
                        </p>
                    </div>
                </div>
            </div>

            {/* Appearance Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Tema</CardTitle>
                    <CardDescription>
                        Escolha o tema e modo de cor que mais combina com você
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                            {theme.mode === "dark" ? (
                                <Moon className="h-5 w-5 text-primary" />
                            ) : (
                                <Sun className="h-5 w-5 text-primary" />
                            )}
                            <div>
                                <Label htmlFor="dark-mode" className="text-base font-medium cursor-pointer">
                                    Modo Escuro
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {theme.mode === "dark"
                                        ? "Tema escuro ativado para menor cansaço visual"
                                        : "Ative o tema escuro para trabalhar à noite"}
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="dark-mode"
                            checked={theme.mode === "dark"}
                            onCheckedChange={handleModeToggle}
                        />
                    </div>

                    {/* Theme Color Selector */}
                    <div>
                        <Label className="text-base font-medium mb-4 block">
                            Tema de Cores
                        </Label>
                        <div className="grid gap-4 md:grid-cols-3">
                            {THEME_OPTIONS.map((themeOption) => (
                                <motion.button
                                    key={themeOption.id}
                                    onClick={() => handleThemeChange(themeOption.id)}
                                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${theme.color === themeOption.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50 hover:bg-accent"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Header com logo e badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={themeLogos[themeOption.id][theme.mode]}
                                                alt={themeOption.name}
                                                className="h-6 w-auto object-contain"
                                            />
                                            <p className="text-md font-bold">{themeOption.name}</p>
                                        </div>
                                        {theme.color === themeOption.id && (
                                            <Badge variant="default" className="text-xs">
                                                <Check className="h-3 w-3 mr-1" />
                                                Ativo
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Descrição */}
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {themeOption.description}
                                    </p>

                                    {/* Paleta de cores */}
                                    <div className="flex gap-2 mb-3">
                                        <div
                                            className="h-8 w-8 rounded-md border border-border/50 shadow-sm"
                                            style={{ backgroundColor: themeOption.palette.primary }}
                                            title="Primary"
                                        />
                                        <div
                                            className="h-8 w-8 rounded-md border border-border/50 shadow-sm"
                                            style={{ backgroundColor: themeOption.palette.secondary }}
                                            title="Secondary"
                                        />
                                        <div
                                            className="h-8 w-8 rounded-md border border-border/50 shadow-sm"
                                            style={{ backgroundColor: themeOption.palette.accent }}
                                            title="Accent"
                                        />
                                        <div
                                            className="h-8 w-8 rounded-md border border-border/50 shadow-sm"
                                            style={{ backgroundColor: themeOption.palette.muted }}
                                            title="Muted"
                                        />
                                    </div>

                                    {/* Características */}
                                    <div className="flex flex-wrap gap-1">
                                        {themeOption.characteristics.map((char) => (
                                            <Badge key={char} variant="secondary" className="text-xs">
                                                {char}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm text-muted-foreground">
                            💡 <strong>Dica:</strong> As preferências são salvas automaticamente no seu navegador
                            e permanecerão ativas mesmo após fechar a aplicação.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* System Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Paleta de Cores Atual</CardTitle>
                    <CardDescription>
                        Visualização completa das cores do tema ativo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Tema e Modo */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-muted/50 border">
                                <span className="text-xs font-medium text-muted-foreground block mb-1">
                                    Tema Ativo
                                </span>
                                <Badge variant="secondary" className="font-semibold">
                                    {THEME_OPTIONS.find((t) => t.id === theme.color)?.name}
                                </Badge>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border">
                                <span className="text-xs font-medium text-muted-foreground block mb-1">
                                    Modo
                                </span>
                                <Badge variant="secondary" className="font-semibold">
                                    {theme.mode === "dark" ? "Escuro" : "Claro"}
                                </Badge>
                            </div>
                        </div>

                        {/* Paleta Completa */}
                        <div>
                            <span className="text-sm font-medium block mb-3">Cores da Paleta</span>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Primary", key: "primary" as const },
                                    { label: "Secondary", key: "secondary" as const },
                                    { label: "Accent", key: "accent" as const },
                                    { label: "Muted", key: "muted" as const },
                                ].map((color) => {
                                    const currentTheme = THEME_OPTIONS.find((t) => t.id === theme.color)
                                    const colorValue = currentTheme?.palette[color.key]
                                    return (
                                        <div
                                            key={color.key}
                                            className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                                        >
                                            <div
                                                className="h-10 w-10 rounded border shadow-sm shrink-0"
                                                style={{ backgroundColor: colorValue }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium">{color.label}</p>
                                                <code className="text-xs text-muted-foreground block truncate">
                                                    {colorValue}
                                                </code>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Características */}
                        <div className="p-3 rounded-lg bg-muted/50 border">
                            <span className="text-xs font-medium text-muted-foreground block mb-2">
                                Características
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {THEME_OPTIONS.find((t) => t.id === theme.color)?.characteristics.map((char) => (
                                    <Badge key={char} variant="outline" className="text-xs">
                                        {char}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
