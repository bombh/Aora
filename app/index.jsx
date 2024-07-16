/**
 * @name Aora
 * @description Discover Endless Possibilites with Aora
 * @tutorial https://www.youtube.com/watch?v=ZBCUegTZF7M
 * @version 0.0.1
 * @author JSMastery
 */

import "react-native-url-polyfill/auto"
import { Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "@/src/components/CustomButton"
import { StatusBar } from "expo-status-bar"
import { Redirect, router } from "expo-router"

export default function App() {
   return (
      <SafeAreaView className="bg-primary h-full">
         <StatusBar
            backgroundColor="#161622"
            style="light"
         />

         <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full h-full items-center justify-center min-h-[80vh] px-4">
               <Image
                  source={images.logo}
                  className="w-[130px] h-[84px]"
                  resizeMode="contain"
               />

               <Image
                  source={images.cards}
                  className="max-w-[380px] w-full h-[300px] "
                  re
                  sizeMode="contain"
               />

               <View className="relative mt-5">
                  <Text className="text-white text-center text-3xl font-bold">
                     Discover Endless Possibilites with <Text className="text-secondary-200">Aora</Text>
                  </Text>

                  <Image
                     source={images.path}
                     className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
                     resizeMode="contain"
                  />
               </View>

               <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                  Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
               </Text>

               <CustomButton
                  title="Continue with Email"
                  handlePress={() => {
                     router.push("/sign-in")
                  }}
                  containerStyles="w-full mt-7"
               />
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}
