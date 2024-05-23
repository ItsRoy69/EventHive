import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const config = {
    endpoint: '',
    platform: '',
    projectId: '',
    databaseId: '',
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
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
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