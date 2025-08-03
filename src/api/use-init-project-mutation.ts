import { client, databases } from '@/utils/app-write-util'
import { useMutation } from '@tanstack/react-query'
import { Account, ID } from 'appwrite'

export function useInitProjectMutation() {
  return useMutation({
    mutationFn: async ({ customer, project }: any) => {
      const account = new Account(client)
      const userId = ID.unique()
      const token = await account.createMagicURLToken(
        userId,
        customer.email,
        'http://localhost:3000/callback-client',
      )

      console.log('token', token)
      // Ajouter un record dans la table client avec le contenu du formulaire contact
      const newCustomer = await databases.createDocument(
        '688a5d58002c2c08a1a6',
        '688f3ac200315d2fc5cc',
        userId,
        {
          userId,
          lastname: customer.lastName,
          firstname: customer.firstName,
        },
      )

      const newProject = await databases.createDocument(
        '688a5d58002c2c08a1a6',
        '688a5d69001d567399ce',
        ID.unique(),
        {
          client: newCustomer.$id,
          status: 'pending',
          ...project,
        },
      )

      console.log('newProject', newProject)
    },
  })
}
