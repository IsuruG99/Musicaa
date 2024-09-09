import { QualifiedSlot } from 'expo-router/build/views/Navigator';
import { Account, Client, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.shinohaya.musicaa',
    projectID: '66da6297000f1bb0616e',
    databaseID: '66da63bd003ba1398cb0',
    collectionID: '66da63e400010b42475a',
    musicCollectionID: '66da63bd003ba1398cb0',
    storageID: '66da6606003591ec2d3e'
};

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectID) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw error;
        
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseID, 
            appwriteConfig.collectionID, 
            [Query.equal('email', currentAccount.email)]
        )
        if (!currentUser) throw error;
        console.log("Welcome back,", currentUser.documents[0].username);

        return currentUser.documents[0];
    } catch (error) {
        throw new Error(error);
    }
};