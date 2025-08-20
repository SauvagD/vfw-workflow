import type { Customer } from '@/types/customer-types'
import type { FileWithPath } from '@mantine/dropzone'

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

export type ProjectEntity = {
  type: ProjectTypeEnum
  description: string
  objectif: ProjectObjectifEnum
  platform: ProjectPlatformEnum[]
  status: ProjectStatusEnum
  fileReferences: FileWithPath[]
  urlReferences: string[]
  customer: Customer
}
