export interface Media {
  id: string
  title: string
  typeId: string
  createdAt: Date
  updatedAt: Date
  author?: string
  releaseDate?: Date
  groupName?: string
  position?: number
  producer?: string
  logoUrl?: string
  franchiseId?: string
}