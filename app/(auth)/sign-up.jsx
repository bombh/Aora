import { View, Text, ScrollView, Image, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/src/constants"
import CustomButton from "@/src/components/CustomButton"
import { Link, router } from "expo-router"
import FormField from "@/src/components/FormField"
import { createUser } from "@/src/lib/appwrite"

const SignUp = () => {
   const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
   })

   const [isSubmitting, setIsSubmitting] = useState(false)

   const submit = async () => {
      if (!form.username || !form.email || !form.password) {
         Alert.alert("Error", "Please fill in all fields")
         return
      }

      setIsSubmitting(true)

      try {
         // Create user
         const result = await createUser(form.email, form.password, form.username)

         // Tricks to avoid the error
         // setUser(result)
         // setIsLoggedIn(true)

         // Set user in context...
         router.replace("/home")
      } catch (error) {
         Alert.alert("Error", error.message)
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <SafeAreaView className="bg-primary h-full">
         <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full h-full min-h-[85vh] justify-center px-4 my-6">
               <Image
                  source={images.logo}
                  className="w-[115px] h-[35px]"
                  resizeMode="contain"
               />

               <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Sign up to Aora</Text>

               <FormField
                  title="Name"
                  value={form.username}
                  handleChange={(value) => setForm({ ...form, username: value })}
                  containerStyles="mt-7"
                  placeholder="Enter your name"
               />

               <FormField
                  title="Email"
                  value={form.email}
                  handleChange={(value) => setForm({ ...form, email: value })}
                  containerStyles="mt-7"
                  keyboardType="email-address"
                  placeholder="Enter your email"
               />

               <FormField
                  title="Password"
                  value={form.password}
                  handleChange={(value) => setForm({ ...form, password: value })}
                  containerStyles="mt-7"
                  placeholder="Enter your password"
               />

               <CustomButton
                  title="Sign Up"
                  handlePress={submit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
               />

               <View className="flex justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                  <Link
                     href="/sign-in"
                     className="text-lg font-psemibold text-secondary"
                  >
                     Sign In
                  </Link>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default SignUp
