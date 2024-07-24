import { View, Text, FlatList, Image } from "react-native"
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/src/constants"
import SearchField from "@/src/components/SearchField"
import EmptyVideos from "@/src/components/EmptyVideos"
import { searchPosts } from "@/src/lib/appwrite"
import useAppwrite from "@/src/lib/useAppwrite"
import VideoCard from "@/src/components/VideoCard"
import { useLocalSearchParams } from "expo-router"

const Search = () => {
   const { query } = useLocalSearchParams()

   const { data: posts, isLoading, refetch } = useAppwrite(() => searchPosts(query))

   useEffect(() => {
      refetch()
   }, [query])

   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCard {...item} />}
            ListHeaderComponent={() => (
               <View className="my-6 px-4">
                  <View className="flex-row justify-between items-start mb-6">
                     <View>
                        <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
                        <Text className="font-psemibold text-2xl text-white">{query}</Text>
                     </View>
                     <View className="mt-1">
                        <Image
                           source={images.logoSmall}
                           className="w-9 h-10"
                           resizeMode="contain"
                        />
                     </View>
                  </View>

                  <SearchField initialQuery={query} />

                  {/* Latest video */}
                  <View className="w-full flex-1 pt-5 pb-8">
                     <Text className="text-gray-100 font-pregular text-lg mb-3">Latest videos</Text>
                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyVideos
                  title="No videos found"
                  subtitle="No videos found for the search query..."
               />
            )}
         />
      </SafeAreaView>
   )
}

export default Search
