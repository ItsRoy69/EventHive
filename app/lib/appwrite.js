import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fueled.eventhive',
    projectId: '66499453000d1687fadf',
    databaseId: '664996160001a6d38b0d',
    userCollectionId: ''
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId
} = config

const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ] 
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (err) {
        console.log(err) 
        throw new Error(err)
    }
}