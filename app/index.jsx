import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
   return (
      <View className="flex-1 items-center justify-center">
         <Text className="text-3xl font-pblack font-bold">Aora!</Text>
         <Link
            href="/home"
            className="text-blue-500"
         >
            Go to Home
         </Link>
      </View>
   )
}
