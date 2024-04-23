import { useQuery } from "@tanstack/react-query"
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import { fetchUpcomingLaunches, fetchPastLaunches } from '@/services/fetchLaunches'
import LaunchListItem from './Item/LaunchListItem'
import SkeletonLoading from './SkeletonLoading'
import useTheme from '@/styles/useTheme'

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
        return <Text>Error: {error.message}</Text>
    }
    
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: appTheme.bg100 }}>
                {
                    isPending
                        ? Array.from({ length: 10 }, (_, i) => <SkeletonLoading key={i} blockCount={3} imageWidth={60} blockHeight={15} />)
                        : data.results.map(launch => (
                            <LaunchListItem key={launch.id} launch={launch} />
                        ))
                }
            </View>
        </ScrollView>
    )
}