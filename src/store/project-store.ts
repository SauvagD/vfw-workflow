import type { FileWithPath } from '@mantine/dropzone'
import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'

/* --------------------------------- ENUMS ---------------------------------- */

export enum ProjectTypeEnum {
  Arch = 'arch',
  Modeling = 'modeling',
  Animating = 'animating',
  GamingAssets = 'gaming-assets',
  Photo = 'photo',
  Design = 'design',
}

export enum ProjectObjectifEnum {
  Comm = 'comm',
  Diapo = 'diapo',
  ECommerce = 'e-commerce',
  Internal = 'internal',
  Web = 'web',
  Forum = 'forum',
}

export enum ProjectPlatformEnum {
  Web = 'web',
  Mobile = 'mobile',
  Desktop = 'desktop',
  Impression = 'impression',
  VrAr = 'vr-ar',
  VideoGames = 'video-games',
  Socials = 'socials',
  Diapo = 'diapo',
}

export enum ProjectStatusEnum {
  Draft = 'draft',
  InProgress = 'in-progress',
  Done = 'done',
}

/* -------------------------------- TYPES ----------------------------------- */

export type Client = {
  email: string
  tel?: string
  lastName: string
  firstName: string
  companyName?: string
  website?: string
}

export type ProjectEntity = {
  type: ProjectTypeEnum
  description: string
  objectif: ProjectObjectifEnum
  platform: ProjectPlatformEnum[]
  status: ProjectStatusEnum
  fileReferences: FileWithPath[]
  urlReferences: string[]
  client: Client
}

/* ------------------- UTILITAIRE: DeepNullable avec exception ------------------ */

type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<U | null> | null
      : DeepNullable<T[K]> | null
    : T[K] | null
}

type DeepNullableBut<T, K extends keyof T> = {
  [P in keyof T]: P extends K
    ? NonNullable<T[P]> extends object
      ? DeepNullable<NonNullable<T[P]>>
      : NonNullable<T[P]>
    : T[P] extends object
      ? T[P] extends Array<infer U>
        ? Array<U | null> | null
        : DeepNullable<T[P]> | null
      : T[P] | null
}

/* ---------------------------- FORMULAIRE TYPE ----------------------------- */

export type ProjectForm = DeepNullableBut<ProjectEntity, 'client'>

/* ---------------------------- FORMULAIRE DEFAULT -------------------------- */

const defaultProjectFormAtom: ProjectForm = {
  type: null,
  description: null,
  objectif: null,
  platform: null,
  status: null,
  fileReferences: [],
  urlReferences: [],
  client: {
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

export const clientFormAtom = focusAtom(projectFormAtom, (optic) =>
  optic.prop('client'),
)
