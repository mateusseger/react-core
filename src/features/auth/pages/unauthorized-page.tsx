/**
 * Unauthorized Access Page
 *
 * Displayed when authenticated user tries to access a route
 * they don't have permission for (missing required roles).
 */

import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Button } from "@/shared/components/ui/shadcn/button"

export function UnauthorizedPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="max-w-md w-full">
                <CardHeader>
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>
                        You don't have permission to access this resource.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This page requires specific permissions that your account doesn't have.
                        Please contact your administrator if you believe you should have access.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="flex-1"
                        >
                            Go Back
                        </Button>
                        <Button
                            onClick={() => navigate("/")}
                            className="flex-1"
                        >
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
