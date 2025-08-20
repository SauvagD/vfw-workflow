import { Account, Client, Databases, Storage } from 'appwrite'

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('688a5a97001a57f42352')

export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client)
