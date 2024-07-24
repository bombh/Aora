import { View, Text, TextInput, Pressable, Image, Alert } from "react-native"
import React, { useState } from "react"

import { icons } from "@/src/constants"
import { router, usePathname } from "expo-router"

const SearchField = ({ initialQuery }) => {
   const pathname = usePathname()

   const [query, setQuery] = useState(initialQuery || "")

   return (
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
         <TextInput
            value={query}
            onChangeText={(e) => setQuery(e)}
            placeholder="Search for a video topic"
            placeholderTextColor="#CDCDE0"
            className="flex-1 text-base text-white font-pregular"
         />

         <Pressable
            onPress={() => {
               if (!query) {
                  return Alert.alert("Search error", "Please enter a search query...")
               }

               if (pathname.startsWith("/search")) {
                  router.setParams({ query })
               } else {
                  router.push(`/search/${query}`)
               }
            }}
            className="active:opacity-70"
         >
            <Image
               source={icons.search}
               className="w-5 h-5"
               resizeMode="contain"
            />
         </Pressable>
      </View>
   )
}

export default SearchField
