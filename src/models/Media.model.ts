import { Franchise } from "./Franchise.model"
import { Type } from "./Type.model"

// What's returned from the backend, should be equal to the backend entity
export interface Media {
  id?: string
  title: string
  typeId: string
  createdAt?: Date
  updatedAt?: Date
  description?: string
  author?: string
  releaseDate?: Date
  groupName?: string
  position?: number
  producer?: string
  logoUrl?: string
  coverUrl?: string
  franchiseId?: string 
}

// What is send to the backend in order to create a "media"
// is not always the same as the entity, but in most cases is
// export type MediaRequest = Media
export type MediaRequest = Partial<Media> & {
  franchise?: string | Franchise
  mediaType?: string | Type
  logoFile?: File
  coverFile?: File
}

// The UI form, which can be completely different based on the UI needs for searching, mapping and logic
export interface MediaForm extends Media {
  franchise?: string | Franchise
  mediaType?: string | Type
  logoFile?: File
  coverFile?: File
}