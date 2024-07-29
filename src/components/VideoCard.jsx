import { View, Text, Image, Pressable } from "react-native"
import React, { useState } from "react"

import { icons } from "@/src/constants"
import { ResizeMode, Video } from "expo-av"

const VideoCard = ({ title, thumbnail, video, creator: { username, avatar } }) => {
   const [play, setPlay] = useState(false)

   return (
      <View className="flex-col items-center px-4 mb-14">
         <View className="flex-row gap-3 items-start">
            <View className="flex-1 justify-center items-center flex-row">
               <View className="w-12 h-12 rounded-lg justify-center items-center border border-secondary p-1">
                  <Image
                     source={{ uri: avatar }}
                     className="w-full h-full rounded-lg"
                     resizeMode="cover"
                  />
               </View>
               <View className="flex-1 justify-center ml-3 gap-y-1">
                  <Text
                     className="text-white text-sm font-psemibold"
                     numberOfLines={1}
                  >
                     {title}
                  </Text>
                  <Text
                     className="text-gray-100 text-xs font-pregular"
                     numberOfLines={1}
                  >
                     {username}
                  </Text>
               </View>
            </View>

            <View className="pt-2">
               <Image
                  source={icons.menu}
                  className="w-5 h-5"
                  resizeMode="contain"
               />
            </View>
         </View>

         {play ? (
            <Video
               source={{ uri: video }}
               className="w-full h-60 rounded-3xl mt-3 bg-gray-100"
               resizeMode={ResizeMode.CONTAIN}
               useNativeControls
               shouldPlay
               onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                     setPlay(false)
                  }
               }}
            />
         ) : (
            <Pressable
               className="w-full h-60 rounded-xl relative justify-center items-center active:opacity-70"
               onPress={() => setPlay(true)}
            >
               <Image
                  source={{ uri: thumbnail }}
                  className="w-full h-full rounded-xl mt-5"
                  resizeMode="cover"
               />

               <Image
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
               />
            </Pressable>
         )}
      </View>
   )
}

export default VideoCard
