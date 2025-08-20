import {
  CALLBACK_URL,
  CUSTOMER_COLLECTION_ID,
  DATABASE_ID,
  PROJECT_COLLECTION_ID,
} from '@/config/app-write-config'
import { ProjectStatusEnum, type ProjectEntity } from '@/types/project-types'
import { client, databases, storage } from '@/utils/app-write-util'
import { useMutation } from '@tanstack/react-query'
import { Account, ID } from 'appwrite'

export function useInitProjectMutation() {
  return useMutation({
    mutationFn: async ({
      customer,
      project,
    }: {
      customer: any
      project: Partial<ProjectEntity>
    }) => {
      /*
      
        - Créer un utilisateur en lui envoyant un mail
        - Si il y a déjà une session en cours, il est nécessaire de passer l'étape de contact, et de ne pas lui envoyé de lien.
        Si l'utilisateur n'est pas connecté, il faudrait revoir la façon dont on fait le formulaire de contact
        - Si c'est un nouvel utilisteur, créer un nouveau customer
        - Avec le customer Id, créer un nouveau projet
        - Créer les références avec les urls et les files du projet
        - Assigner les références au projet.
      
      */

      const account = new Account(client)
      const userId = ID.unique()
      await account.createMagicURLToken(userId, customer.email, CALLBACK_URL)

      // Ajouter un record dans la table client avec le contenu du formulaire contact
      const newCustomer = await databases.createDocument(
        DATABASE_ID,
        CUSTOMER_COLLECTION_ID,
        userId,
        {
          userId,
          lastname: customer.lastName,
          firstname: customer.firstName,
        },
      )

      const projectId = ID.unique()

      // Ajouter un projet
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
      )

      console.log('filesReferences', filesReferences)
    },
  })
}
