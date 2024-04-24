import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import store, { persistor } from '@/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from "expo-router"
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