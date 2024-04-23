import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from "expo-router"

export default function RootLayout() {
    const queryClient = new QueryClient()

    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <Stack
                screenOptions={{
                    headerShown: false
                }}
                />
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}