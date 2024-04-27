import store, { persistor } from '@/store'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import useTheme from '@/styles/useTheme'

export default function RootLayout() {
    const queryClient = new QueryClient()
    const appTheme = useTheme()

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <View style={[{ backgroundColor: appTheme.bg200, flex: 1 }]}>
                            <Stack
                                screenOptions={{
                                    headerShown: false
                                }}
                            />
                        </View>
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    )
}