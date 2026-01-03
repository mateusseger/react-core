import { useState } from 'react'
import { ThemeProvider } from '../src/features/themes/context/theme-context'
import { Button } from '../src/shared/components/ui/shadcn/button'
import { Combobox, type ComboboxOption } from '../src/shared/components/ui/custom/combobox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../src/shared/components/ui/shadcn/select'
import { Input } from '../src/shared/components/ui/shadcn/input'
import { Label } from '../src/shared/components/ui/shadcn/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/shared/components/ui/shadcn/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/shared/components/ui/shadcn/tabs'

export default function App() {
    const [comboboxValue, setComboboxValue] = useState<string | undefined>()
    const [selectValue, setSelectValue] = useState<string>()

    const comboboxOptions: ComboboxOption[] = [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
    ]

    const comboboxGroupedOptions: ComboboxOption[] = [
        { label: 'React', value: 'react', group: 'Frontend' },
        { label: 'Vue', value: 'vue', group: 'Frontend' },
        { label: 'Angular', value: 'angular', group: 'Frontend' },
        { label: 'Node.js', value: 'nodejs', group: 'Backend' },
        { label: 'Django', value: 'django', group: 'Backend' },
        { label: 'Laravel', value: 'laravel', group: 'Backend' },
    ]

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background p-8">
                <div className="container mx-auto max-w-6xl space-y-8">
                    <header>
                        <h1 className="text-4xl font-bold">React Core - Playground</h1>
                        <p className="text-muted-foreground mt-2">
                            Teste os componentes da biblioteca
                        </p>
                    </header>

                    <Tabs defaultValue="inputs" className="w-full">
                        <TabsList>
                            <TabsTrigger value="inputs">Inputs</TabsTrigger>
                            <TabsTrigger value="selects">Selects</TabsTrigger>
                            <TabsTrigger value="buttons">Buttons</TabsTrigger>
                        </TabsList>

                        <TabsContent value="inputs" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Input</CardTitle>
                                    <CardDescription>
                                        Campos de entrada de texto
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input id="name" placeholder="Digite seu nome" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="seu@email.com" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="selects" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Select Component</CardTitle>
                                    <CardDescription>
                                        Componente Select nativo (com hover state)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Framework</Label>
                                        <Select value={selectValue} onValueChange={setSelectValue}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione um framework" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="react">React</SelectItem>
                                                <SelectItem value="vue">Vue</SelectItem>
                                                <SelectItem value="angular">Angular</SelectItem>
                                                <SelectItem value="svelte">Svelte</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Combobox - Simples</CardTitle>
                                    <CardDescription>
                                        Combobox com busca habilitada
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Framework (com busca)</Label>
                                        <Combobox
                                            value={comboboxValue}
                                            onValueChange={setComboboxValue}
                                            options={comboboxOptions}
                                            placeholder="Selecione um framework"
                                            searchPlaceholder="Buscar framework..."
                                            emptyMessage="Nenhum framework encontrado"
                                            searchable={true}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Framework (sem busca)</Label>
                                        <Combobox
                                            value={comboboxValue}
                                            onValueChange={setComboboxValue}
                                            options={comboboxOptions}
                                            placeholder="Selecione um framework"
                                            searchable={false}
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Combobox - Com Grupos</CardTitle>
                                    <CardDescription>
                                        Combobox com opções agrupadas
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Tecnologia</Label>
                                        <Combobox
                                            value={comboboxValue}
                                            onValueChange={setComboboxValue}
                                            options={comboboxGroupedOptions}
                                            placeholder="Selecione uma tecnologia"
                                            searchPlaceholder="Buscar tecnologia..."
                                            emptyMessage="Nenhuma tecnologia encontrada"
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="buttons" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Button Variants</CardTitle>
                                    <CardDescription>
                                        Diferentes variantes de botões
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="default">Default</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="destructive">Destructive</Button>
                                        <Button variant="link">Link</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Button Sizes</CardTitle>
                                    <CardDescription>
                                        Diferentes tamanhos de botões
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Button size="sm">Small</Button>
                                        <Button size="default">Default</Button>
                                        <Button size="lg">Large</Button>
                                        <Button size="icon">🚀</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </ThemeProvider>
    )
}
