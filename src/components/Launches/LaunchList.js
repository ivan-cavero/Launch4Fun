import { fetchPastLaunches, fetchUpcomingLaunches } from '@/services/fetchLaunches'
import useTheme from '@/styles/useTheme'
import { useQuery } from "@tanstack/react-query"
import React, { useState, useCallback } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import LaunchListItem from './Item/LaunchListItem'
import SkeletonLoading from './SkeletonLoading'

export default function LaunchList({ type }) {
    const appTheme = useTheme()

    const queryConfig = type === 'upcoming' 
        ? { queryKey: ['upcomingLaunches'], queryFn: fetchUpcomingLaunches }
        : { queryKey: ['pastLaunches'], queryFn: fetchPastLaunches }

    const { isPending, isError, data, error, refetch } = useQuery(queryConfig)
    
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }, [refetch])
    
    if (isError) {
        return <Text accessibilityLabel="Error message">Error: {error.message}</Text>
    }
    
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} accessibilityLabel="Pull to refresh" />
            }
        >
            <View
                style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: appTheme.bg100 }}
                accessibilityLabel="Launch list container"
            >
                {
                    isPending
                    ? Array.from({ length: 10 }, (_, i) => (
                        <SkeletonLoading 
                            key={i} 
                            blockCount={3} 
                            imageWidth={60} 
                            blockHeight={15} 
                            accessibilityLabel={`Loading placeholder ${i + 1}`} 
                        />
                    ))
                    : data.results.map(launch => (
                        <LaunchListItem 
                            key={launch.id} 
                            launch={launch} 
                            accessibilityLabel={`Launch item ${launch.name}`} 
                        />
                    ))
                }
            </View>
        </ScrollView>
    )
}