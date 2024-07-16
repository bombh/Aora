import { View, Text, Pressable } from "react-native"
import React from "react"

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
   return (
      <Pressable
         onPress={handlePress}
         className={`bg-secondary-200 items-center justify-center rounded-xl min-h-[62px] ${containerStyles} ${
            isLoading ? "opacity-40" : ""
         } active:opacity-70`}
         disabled={isLoading}
      >
         <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>{title}</Text>
      </Pressable>
   )
}

export default CustomButton
