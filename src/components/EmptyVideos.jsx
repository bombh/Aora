import { View, Text, Image } from "react-native"
import React from "react"
import { router } from "expo-router"

import { images } from "@/src/constants"
import CustomButton from "./CustomButton"

const EmptyVideos = ({ title, subtitle }) => {
   return (
      <View className="items-center justify-center px-4">
         <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode="contain"
         />
         <Text className="font-psemibold text-xl text-white mt-2">{title}</Text>
         <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

         <CustomButton
            title="Create a video"
            containerStyles="w-full my-6"
            handlePress={() => {
               router.push("/create")
            }}
         />
      </View>
   )
}

export default EmptyVideos
