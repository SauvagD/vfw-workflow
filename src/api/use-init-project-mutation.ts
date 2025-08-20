import { account, databases } from '@/utils/app-write-util'
import { useMutation } from '@tanstack/react-query'
import { ID, Query } from 'appwrite'

/*

  J'ai besoin de détecter si l'utilisateur est connecté ou non.
  La logique de la connection d'app write fonctionne par une session. Pour se connecter à une session, il faut 
  envoyer un email à l'utilisateur avec un lien de connexion. Une fois cela fait, la session sera créer et l'utilisateur connecté
  Si l'utilisateur n'est pas connecté, alors, il faut soit créer un utilisateur avec l'email, sélectionner, soit au contraire
  fetch le customer

      await databases.createDocument(
        DATABASE_ID,
        PROJECT_COLLECTION_ID,
        projectId,
        {
          type: project.type,
          description: project.description,
          objectif: project.objectif,
          platform: project.platform,
          client: newCustomer.$id,
          status: ProjectStatusEnum.Draft,
        },
      )

      const filesReferences = await Promise.allSettled(
        project.fileReferences?.map(
          async (file) =>
            await storage.createFile('6890f8ed002d39789707', ID.unique(), file),
        ),
      )

      const references = await Promise.allSettled(
        filesReferences.map(
          async ({ values }) =>
            await databases.createDocument(
              DATABASE_ID,
              '688a5ed80010344c33c5',
              projectId,
              {
                type: 'file',
                fileId: values?.$id,
              },
            ),
        ),
      )

      console.log('references', references)

      await databases.updateDocument(
        DATABASE_ID,
        '688a5d69001d567399ce',
        projectId,
        {
          reference: references.map(({ value }) => value?.$id),
        },

*/

export function useInitProjectMutation() {
  return useMutation({
    mutationFn: async ({ customer, project }: any) => {
      // const session = await account.get()
      // console.log('session', session)

      const clients = await databases.listDocuments(
        '688a5d58002c2c08a1a6',
        '688f3ac200315d2fc5cc',
        [Query.equal('email', customer.email)],
      )

      console.log('clients', clients)

      if (clients.total === 0) {
        const userId = ID.unique()
        // Si le client n'existe pas, on le crée
        const newCustomer = await databases.createDocument(
          '688a5d58002c2c08a1a6',
          '688f3ac200315d2fc5cc',
          userId,
          {
            email: customer.email,
            userId,
          },
        )
        await account.createMagicURLToken(
          userId,
          newCustomer.email,
          'http://localhost:3000/callback-client',
        )
        return
      }

      // Il faudrait vérifier si le client est connecté ou non
      const client = clients.documents[0]

      await databases.createDocument(
        '688a5d58002c2c08a1a6',
        '688a5d69001d567399ce',
        ID.unique(),
        {
          client: client.$id,
          status: 'pending',
          ...project,
        },
      )
    },
  })
}
