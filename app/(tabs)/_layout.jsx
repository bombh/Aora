import { View, Text, Image } from "react-native"
import React from "react"
import { Redirect, Tabs } from "expo-router"
import colors from "tailwindcss/colors"

import { icons } from "@/src/constants"
import { StatusBar } from "expo-status-bar"

const TabIcon = ({ icon, name, color, focused }) => {
   return (
      <View className="items-center justify-center pt-3 gap-2">
         <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
         />
         <Text
            className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
            style={{
               color: color,
            }}
         >
            {name}
         </Text>
      </View>
   )
}

const TabsLayout = () => {
   return (
      <>
         <StatusBar
            backgroundColor="#161622"
            style="light"
         />

         <Tabs
            screenOptions={{
               tabBarShowLabel: false,
               tabBarActiveTintColor: "#FFA001",
               tabBarInactiveTintColor: "#CDCDE0",
               tabBarStyle: {
                  backgroundColor: "#161622",
                  borderTopWidth: 1,
                  borderTopColor: "#232533",
                  height: 84,
               },
            }}
         >
            <Tabs.Screen
               name="home"
               options={{
                  title: "Home",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        icon={icons.home}
                        name="Home"
                        color={color}
                        focused={focused}
                     />
                  ),
               }}
            />

            <Tabs.Screen
               name="bookmark"
               options={{
                  title: "Bookmark",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        icon={icons.bookmark}
                        name="Bookmark"
                        color={color}
                        focused={focused}
                     />
                  ),
               }}
            />

            <Tabs.Screen
               name="create"
               options={{
                  title: "Create",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        icon={icons.plus}
                        name="Create"
                        color={color}
                        focused={focused}
                     />
                  ),
               }}
            />

            <Tabs.Screen
               name="profile"
               options={{
                  title: "Profile",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        icon={icons.profile}
                        name="Profile"
                        color={color}
                        focused={focused}
                     />
                  ),
               }}
            />
         </Tabs>
      </>
   )
}

export default TabsLayout
