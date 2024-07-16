import { View, Text, ScrollView, Image } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/constants"
import CustomButton from "@/src/components/CustomButton"
import { Link } from "expo-router"
import FormField from "@/src/components/FormField"

const SignIn = () => {
   const [form, setForm] = useState({
      email: "",
      password: "",
   })

   const [isSubmitting, setIsSubmitting] = useState(false)

   const submit = () => {}

   return (
      <SafeAreaView className="bg-primary h-full">
         <ScrollView>
            <View className="w-full min-h-[80vh] justify-center px-4 my-6">
               <Image
                  source={images.logo}
                  className="w-[115px] h-[35px]"
                  resizeMode="contain"
               />

               <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Log in to Aora</Text>

               <FormField
                  title="Email"
                  value={form.email}
                  handeChange={(value) => setform({ ...form, email: value })}
                  containerStyles="mt-7"
                  keyboardType="email-address"
                  placeholder="Enter your email"
               />

               <FormField
                  title="Password"
                  value={form.password}
                  handeChange={(value) => setform({ ...form, password: value })}
                  containerStyles="mt-7"
                  placeholder="Enter your password"
               />

               <CustomButton
                  title="Sign In"
                  handlePress={submit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
               />

               <View className="flex justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                  <Link
                     href="/sign-up"
                     className="text-lg font-psemibold text-secondary"
                  >
                     Sign Up
                  </Link>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default SignIn
