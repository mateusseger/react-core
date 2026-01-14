import { AuthProvider } from "../../src/features/auth"
import { ThemeProvider } from "../../src/features/themes"
import { RouterProvider } from "react-router-dom"
import { appConfig } from './app-config'
import { router } from "./app-router"

function App() {
    return (
        <ThemeProvider>
            <AuthProvider config={appConfig.auth} devMode={import.meta.env.VITE_AUTH_DEV_MODE === 'true'}>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
