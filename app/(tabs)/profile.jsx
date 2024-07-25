import { View, FlatList, Image, Pressable } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { icons } from "@/src/constants"
import EmptyVideos from "@/src/components/EmptyVideos"
import VideoCard from "@/src/components/VideoCard"
import { getUserPosts, signOut } from "@/src/lib/appwrite"
import useAppwrite from "@/src/lib/useAppwrite"
import { useGlobalContext } from "@/src/context/GlobalProvider"
import UserInfoBox from "@/src/components/UserInfoBox"
import { router } from "expo-router"

const Profile = () => {
   const { user, setUser, setIsLoggedIn } = useGlobalContext()
   console.log("user", user)

   const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

   const logout = async () => {
      await signOut()

      setUser(null)
      setIsLoggedIn(false)

      // Navigate to login screen
      router.replace("/sign-in")
   }

   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCard {...item} />}
            ListHeaderComponent={() => (
               <View className="w-full items-center justify-center mt-6 mb-12 px-4">
                  <Pressable
                     onPress={logout}
                     className="w-full items-end mb-6 active:opacity-70"
                  >
                     <Image
                        source={icons.logout}
                        className="w-6 h-6"
                        resizeMode="contain"
                     />
                  </Pressable>

                  <View className="w-16 h-16 items-center justify-center rounded-xl border border-secondary">
                     <Image
                        source={{ uri: user?.avatar }}
                        className="w-[90%] h-[90%] rounded-lg"
                        resizeMode="cover"
                     />
                  </View>

                  <UserInfoBox
                     title={user?.username}
                     subtitle=""
                     containerStyles="mt-2"
                     titleStyles="text-lg"
                  />

                  <View className="flex-row mt-3 items-center">
                     <UserInfoBox
                        title={posts?.length || 0}
                        subtitle="Posts"
                        containerStyles="mr-3"
                        titleStyles="text-2xl "
                     />

                     <UserInfoBox
                        title="1.2k"
                        subtitle="Followers"
                        containerStyles="ml-3"
                        titleStyles="text-2xl "
                     />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyVideos
                  title="No videos yet"
                  subtitle="Upload your first video !"
               />
            )}
         />
      </SafeAreaView>
   )
}

export default Profile
