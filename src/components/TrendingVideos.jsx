import { View, Text, FlatList, Pressable, ImageBackground, Image } from "react-native"
import React, { useState } from "react"
import * as Animatable from "react-native-animatable"
import { icons } from "../constants"
import { Video, ResizeMode } from "expo-av"

const zoomIn = {
   0: {
      scale: 0.9,
   },
   1: {
      scale: 1.1,
   },
}

const zoomOut = {
   0: {
      scale: 1.1,
   },
   1: {
      scale: 0.9,
   },
}

const TrendingVideoItem = ({ activeItem, item }) => {
   const [play, setPlay] = useState(false)
   //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"

   return (
      <Animatable.View
         className="mr-5"
         animation={activeItem === item.$id ? zoomIn : zoomOut}
      >
         {play ? (
            <Video
               source={{ uri: item.video }}
               className="w-52 h-72 rounded-3xl mt-3 bg-gray-100"
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
               className="relative justify-center items-center active:opacity-70"
               onPress={() => setPlay(true)}
            >
               <ImageBackground
                  source={{ uri: item.thumbnail }}
                  className="w-52 h-72 rounded-xl my-5 shadow shadow-black/40 overflow-hidden"
                  resizeMode="cover"
               />

               <Image
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
               />
            </Pressable>
         )}
      </Animatable.View>
   )
}

const TrendingVideos = ({ posts }) => {
   // Set states
   const [activeItem, setActiveItem] = useState(posts[1])
   const [play, setPlay] = useState(false)

   const viewableItemsChanged = ({ viewableItems }) => {
      if (viewableItems.length > 0) {
         setActiveItem(viewableItems[0].key)
      }
   }

   return (
      <FlatList
         data={posts}
         keyExtractor={(item) => item.$id}
         horizontal
         renderItem={({ item }) => (
            <TrendingVideoItem
               activeItem={activeItem}
               item={item}
            />
         )}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
         }}
         contentOffset={{ x: 170 }}
      />
   )
}

export default TrendingVideos
