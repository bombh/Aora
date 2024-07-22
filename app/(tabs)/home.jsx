import { View, Text, FlatList, Image, RefreshControl } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/src/constants"
import SearchField from "@/src/components/SearchField"
import TrendingVideos from "@/src/components/TrendingVideos"
import EmptyVideos from "@/src/components/EmptyVideos"

const Home = () => {
   const [refreshing, setRefreshing] = useState(false)

   const onRefresh = async () => {
      setRefreshing(true)

      // call server...
      setRefreshing(false)
   }
   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <View>
                  <Text className="text-3xl text-white">{item.id}</Text>
               </View>
            )}
            ListHeaderComponent={() => (
               <View className="my-6 px-4">
                  <View className="flex-row justify-between items-start mb-6">
                     <View>
                        <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                        <Text className="font-psemibold text-2xl text-white">John Doe</Text>
                     </View>
                     <View className="mt-1">
                        <Image
                           source={images.logoSmall}
                           className="w-9 h-10"
                           resizeMode="contain"
                        />
                     </View>
                  </View>

                  <SearchField />

                  {/* Latest video */}
                  <View className="w-full flex-1 pt-5 pb-8">
                     <Text className="text-gray-100 font-pregular text-lg mb-3">Latest videos</Text>
                  </View>

                  <TrendingVideos posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyVideos
                  title="No videos found"
                  subtitle="Be the first one to upload a video !"
               />
            )}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
               />
            }
         />
      </SafeAreaView>
   )
}

export default Home
