// Rotas da feature de erros

import { type RouteObject } from "react-router-dom"
import { NotFoundPage } from "./pages/not-found-page"

export const errorRoutes: RouteObject[] = [
    {
        path: "*",
        element: <NotFoundPage />,
    },
]
