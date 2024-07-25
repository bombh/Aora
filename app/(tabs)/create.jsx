import { View, Text, ScrollView, Pressable, Image } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Video, ResizeMode } from "expo-av"

import FormField from "@/src/components/FormField"
import { icons } from "@/src/constants"
import CustomButton from "@/src/components/CustomButton"

const Create = () => {
   const [uploading, setUploading] = useState(false)

   const [form, setForm] = useState({
      title: "",
      prompt: "",
      video: null,
      thumbnail: null,
   })

   const submit = async () => {}

   return (
      <SafeAreaView className="bg-primary h-full">
         <ScrollView className="px-4 my-6">
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

               <Pressable>
                  {form.video ? (
                     <Video
                        source={{ uri: form.video.uri }}
                        className="w-full h-40 rounded-xl"
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        useNativeControls
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

               <Pressable>
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
