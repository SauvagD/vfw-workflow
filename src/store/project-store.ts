import type { DeepNullableBut } from '@/types/global-types'
import type { ProjectEntity } from '@/types/project-types'
import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'

/* ---------------------------- FORMULAIRE TYPE ----------------------------- */

export type ProjectForm = DeepNullableBut<ProjectEntity, 'customer'>

/* ---------------------------- FORMULAIRE DEFAULT -------------------------- */

const defaultProjectFormAtom: ProjectForm = {
  type: null,
  description: null,
  objectif: null,
  platform: null,
  status: null,
  fileReferences: [],
  urlReferences: [],
  customer: {
    email: null,
    tel: null,
    lastName: null,
    firstName: null,
    companyName: null,
    website: null,
  },
}

/* ---------------------------------- ATOMS ---------------------------------- */

export const projectFormAtom = atom<ProjectForm>(defaultProjectFormAtom)

export const customerFormAtom = focusAtom(projectFormAtom, (optic) =>
  optic.prop('customer'),
)
