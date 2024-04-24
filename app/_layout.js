import store, { persistor } from '@/store'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function RootLayout() {
    const queryClient = new QueryClient()

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                    />
                </QueryClientProvider>
            </Provider>
        </SafeAreaProvider>
    )
}