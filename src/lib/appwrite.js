import { Account, Client, ID } from "react-native-appwrite"

// Appwrite Config
export const config = {
   endpoint: "https://cloud.appwrite.io/v1",
   platform: "com.bombh.aora",
   projectId: "6696fa2700166e200234",
   databaseId: "6696fd73001c53b5f3c8",
   userCollectionId: "6696fdc30024930750b1",
   videoCollectionId: "6696fdea0030840e425d",
   storageId: "669700e0003a37da155d",
}

// Init your React Native SDK
const client = new Client()
const account = new Account(client)
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

// Register User
export const createUser = () => {
   account.create(ID.unique(), "she@example.com", "password", "Jane Dooe").then(
      function (response) {
         console.log(response)
      },
      function (error) {
         console.log(error)
      }
   )
}
