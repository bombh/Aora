import { View, Text, TextInput, Pressable, Image } from "react-native"
import React, { useState } from "react"

import { icons } from "@/src/constants"

const SearchField = ({ title, value, handeChange, placeholder, ...props }) => {
   const [showPassword, setShowPassword] = useState(false)

   return (
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
         <TextInput
            value={value}
            onChangeText={handeChange}
            placeholder="Search for a video topic"
            placeholderTextColor="#7B7B8B"
            className="flex-1 text-base text-white font-pregular"
            {...props}
         />

         <Pressable
            onPress={() => {}}
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
