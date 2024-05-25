import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fueled.eventhive',
    projectId: '66499453000d1687fadf',
    databaseId: '664996160001a6d38b0d',
    hostsCollectionId: '6649ae9600271eb7fd62',
    guestsCollectionId: '6649af0f000ce9cc96fa',
    eventsCollectionId: '6649aa8100204092e176',
    venuesCollectionId: '6649b02b0019611468ec',
    rsvpsCollectionId: '6649b0ac00220db85dd5',
    vendorsCollectionId: '6649e83e000e9eacb585',
    chatsCollectionId: '6649e91200015b4d1554',
    chatParticipantsCollectionId: '664a0be70013b39e3cde',
    channelsCollectionId: '664a12a000067efb542a',
    channelParticipantsCollectionId: '664a1452003661b29a68',
    channelMessageCollectionId: '664a14db00146d3e3c58'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    hostsCollectionId,
    guestsCollectionId,
    eventsCollectionId,
    venuesCollectionId,
    rsvpsCollectionId,
    vendorsCollectionId,
    chatsCollectionId,
    chatParticipantsCollectionId,
    channelsCollectionId,
    channelParticipantsCollectionId,
    channelMessageCollectionId
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