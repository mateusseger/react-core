import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Label } from "@/shared/components/ui/shadcn/label"
import { Switch } from "@/shared/components/ui/shadcn/switch"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { useTheme } from "@/features/themes/hooks/use-theme"
import { Sun, Moon, Check, Layers, Code } from "lucide-react"
import { motion } from "framer-motion"
import { THEMES, type ThemeName } from "@/features/themes/config/themes-config"
import logoHervalDark from "@/shared/assets/logos/herval-dark.png"
import logoHervalLight from "@/shared/assets/logos/herval-light.png"
import logoIplaceDark from "@/shared/assets/logos/iplace-dark.svg"
import logoIplaceLight from "@/shared/assets/logos/iplace-light.svg"
import logoTaqiDark from "@/shared/assets/logos/taqi-dark.svg"
import logoTaqiLight from "@/shared/assets/logos/taqi-light.svg"

export function ThemeSettingsPage() {
    const { theme, setThemeName: setThemeColor, setThemeMode } = useTheme()

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
                            {THEMES.map((themeOption) => (
                                <motion.button
                                    key={themeOption.id}
                                    onClick={() => handleThemeChange(themeOption.id)}
                                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${theme.name === themeOption.id
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
                                        {theme.name === themeOption.id && (
                                            <Badge variant="default" className="text-xs">
                                                <Check className="h-3 w-3 mr-1" />
                                                Ativo
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Cor primária do tema */}
                                    <div className="flex gap-2 mb-3">
                                        <div
                                            className="h-8 w-full rounded-md border border-border/50 shadow-sm"
                                            style={{ backgroundColor: themeOption.primary }}
                                            title="Primary Color"
                                        />
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
                                    {THEMES.find((t) => t.id === theme.name)?.name}
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

                        {/* Cor Principal */}
                        <div>
                            <span className="text-sm font-medium block mb-3">Cor Principal</span>
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                <div
                                    className="h-12 w-12 rounded-lg border shadow-sm shrink-0"
                                    style={{ backgroundColor: THEMES.find((t) => t.id === theme.name)?.primary }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">Primary</p>
                                    <code className="text-xs text-muted-foreground block truncate">
                                        {THEMES.find((t) => t.id === theme.name)?.primary}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Guia para Desenvolvedores */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Como adicionar um novo tema
                    </CardTitle>
                    <CardDescription>
                        Guia rápido para desenvolvedores
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <Badge variant="outline" className="h-6 w-6 shrink-0 rounded-full p-0 flex items-center justify-center">1</Badge>
                            <div>
                                <p className="font-medium">Adicione no config</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    features/themes/config/themes-config.ts
                                </code>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <Badge variant="outline" className="h-6 w-6 shrink-0 rounded-full p-0 flex items-center justify-center">2</Badge>
                            <div>
                                <p className="font-medium">Adicione as variáveis CSS</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    features/themes/styles/themes.css
                                </code>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <Badge variant="outline" className="h-6 w-6 shrink-0 rounded-full p-0 flex items-center justify-center">3</Badge>
                            <div>
                                <p className="font-medium">(Opcional) Adicione os logos</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    shared/assets/logos/[tema]-light.svg e [tema]-dark.svg
                                </code>
                            </div>
                        </li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    )
}
