import { Account, Client, Databases } from 'appwrite'

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('688a5a97001a57f42352')

export const databases = new Databases(client)
export const account = new Account(client)

export const DATABASE_ID = '688a5d58002c2c08a1a6'
export const STUDIO_COLLECTION_ID = '68a05367003c458f2377'
export const EXAMPLE_STUDIO_ID = '68a0f84d00354bec9b64'
export const PROJECT_COLLECTION_ID = '688a5d69001d567399ce'
export const CLIENT_COLLECTION_ID = '688f3ac200315d2fc5cc'
