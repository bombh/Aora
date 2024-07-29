import { View, Text, ScrollView, Pressable, Image } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Video, ResizeMode } from "expo-av"
import { router } from "expo-router"
import * as ImagePicker from "expo-image-picker"

import FormField from "@/src/components/FormField"
import { icons } from "@/src/constants"
import CustomButton from "@/src/components/CustomButton"
import { createPost } from "@/src/lib/appwrite"
import { useGlobalContext } from "@/src/context/GlobalProvider"

const Create = () => {
   const { user } = useGlobalContext()
   const [uploading, setUploading] = useState(false)

   const [form, setForm] = useState({
      title: "",
      prompt: "",
      video: null,
      thumbnail: null,
   })

   const openPicker = async (selectedType) => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes:
            selectedType === "video" ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      })

      if (!result.canceled) {
         if (selectedType === "video") {
            setForm({
               ...form,
               video: result.assets[0],
            })
         } else if (selectedType === "image") {
            setForm({
               ...form,
               thumbnail: result.assets[0],
            })
         }
      }
   }

   const submit = async () => {
      if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
         return Alert.alert("Error", "Please fill in all fields")
      }

      setUploading(true)

      try {
         // Upload video
         const newPost = createPost({ ...form, userId: user.$id })

         Alert.alert("Success", "Video uploaded successfully")
         router.push("/home")
      } catch (error) {
         Alert.alert("Error", error.message)
      } finally {
         setForm({
            title: "",
            prompt: "",
            video: null,
            thumbnail: null,
         })
         setUploading(false)
      }
   }

   return (
      <SafeAreaView className="bg-primary flex-1 p-0 m-0">
         <ScrollView className="flex-1 h-full px-4 mt-6 mb-0 py-0">
            <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

            <FormField
               title="Title"
               value={form.title}
               placeholder={"Enter title"}
               handleChange={(e) =>
                  setForm({
                     ...form,
                     title: e,
                  })
               }
               containerStyles={"mt-10"}
            />

            <View className="mt-7 space-y-2">
               <Text className="text-base text-gray-100 font-pmedium">Video</Text>

               <Pressable onPress={() => openPicker("video")}>
                  {form.video ? (
                     <Video
                        source={{ uri: form.video.uri }}
                        className="w-full h-40 rounded-xl"
                        resizeMode={ResizeMode.COVER}
                     />
                  ) : (
                     <View className="w-full h-40 items-center justify-center rounded-xl px-4 bg-black-100 ">
                        <View className="w-14 h-14 items-center justify-center border border-dashed border-secondary-100">
                           <Image
                              source={icons.upload}
                              className="w-1/2 h-1/2"
                              resizeMode="contain"
                           />
                        </View>
                     </View>
                  )}
               </Pressable>
            </View>

            <View className="mt-7 space-y-2">
               <Text className="text-base text-gray-100 font-pmedium">Thumbnail</Text>

               <Pressable onPress={() => openPicker("image")}>
                  {form.thumbnail ? (
                     <Image
                        source={{ uri: form.thumbnail.uri }}
                        className="w-full h-64 rounded-xl"
                        resizeMode="cover"
                     />
                  ) : (
                     <View className="flex-row space-x-2 w-full h-16 items-center justify-center rounded-xl px-4 bg-black-100 border border-black-200">
                        <Image
                           source={icons.upload}
                           className="w-6 h-6"
                           resizeMode="contain"
                        />
                        <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                     </View>
                  )}
               </Pressable>
            </View>

            <FormField
               title="Prompt"
               value={form.prompt}
               placeholder={"The prompt you used to create this video"}
               handleChange={(e) =>
                  setForm({
                     ...form,
                     prompt: e,
                  })
               }
               containerStyles={"mt-7"}
            />

            <CustomButton
               title="Submit & Publish"
               handlePress={submit}
               containerStyles="mt-7"
               isLoading={uploading}
            />
         </ScrollView>
      </SafeAreaView>
   )
}

export default Create
