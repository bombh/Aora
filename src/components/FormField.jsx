import { View, Text, TextInput, Pressable, Image } from "react-native"
import React, { useState } from "react"

import { icons } from "@/src/constants"

const FormField = ({ title, value, handeChange, containerStyles, placeholder, ...props }) => {
   const [showPassword, setShowPassword] = useState(false)

   return (
      <View className={`space-y-2 ${containerStyles}`}>
         <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

         <View className="flex-row w-full h-16 px-4 items-center rounded-xl bg-black-100 border border-black-200 focus:border-secondary">
            <TextInput
               value={value}
               onChangeText={handeChange}
               placeholder={placeholder}
               placeholderTextColor="#7B7B8B"
               className="flex-1 text-white text-base font-psemibold"
               secureTextEntry={title === "Password" && !showPassword}
               {...props}
            />

            {title === "Password" && (
               <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="active:opacity-70"
               >
                  <Image
                     source={!showPassword ? icons.eye : icons.eyeHide}
                     className="w-6 h-6"
                     resizeMode="contain"
                  />
               </Pressable>
            )}
         </View>
      </View>
   )
}

export default FormField
