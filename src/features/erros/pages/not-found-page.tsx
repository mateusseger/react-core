import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>404 - Page Not Found</CardTitle>
                    <CardDescription>
                        The page you are looking for does not exist.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        The page you requested could not be found. Please check the URL or navigate back to the home page.
                    </p>
                    <Button asChild className="gap-2">
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
