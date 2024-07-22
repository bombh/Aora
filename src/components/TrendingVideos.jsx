import { View, Text, FlatList } from "react-native"
import React from "react"

const TrendingVideos = ({ posts }) => {
   return (
      <FlatList
         data={posts}
         keyExtractor={(item) => item.id}
         horizontal
         renderItem={({ item }) => (
            <View>
               <Text className="text-3xl text-white">{item.id}</Text>
            </View>
         )}
      />
   )
}

export default TrendingVideos
