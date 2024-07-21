import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

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
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register User
export const createUser = async (email, password, username) => {
   try {
      const newAccount = await account.create(ID.unique(), email, password, username)

      if (!newAccount) {
         throw new Error("Failed to create user")
      }

      const avatarURL = avatars.getInitials(username)

      signIn(email, password)

      const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
         accountId: newAccount.$id,
         email,
         username,
         avatar: avatarURL,
      })

      return newUser
   } catch (error) {
      console.error(error)
      throw new Error(error)
   }
}

export const signIn = async (email, password) => {
   try {
      const session = await account.createEmailPasswordSession(email, password)

      if (!session) {
         throw new Error("Failed to sign in")
      }

      return session
   } catch (error) {
      console.error(error)
      if (error.message === "AppwriteException: Creation of a session is prohibited when a session is active.") {
      } else {
         throw new Error(error)
      }
   }
}

export const getCurrentUser = async () => {
   try {
      const currentAccount = await account.get()

      if (!currentAccount) {
         throw new Error("No current account")
      }

      const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
         Query.equal("accountId", currentAccount.$id),
      ])

      if (!currentUser) {
         throw new Error("No current user")
      }

      //console.log("currentUser", currentUser)
      return currentUser.documents[0]
   } catch (error) {
      console.error(error)
   }
}