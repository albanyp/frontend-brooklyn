import React from 'react'
import { MediaCard } from 'components/MediaCard/MediaCard'
import { Media } from '../../models/Media.model'

interface MediaListProps {
  mediaItems: Media[]
}

export const MediaList = ({ mediaItems }: MediaListProps) => {

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto px-4 py-8 sm:px-6">
        <h2 className="font-semibold my-4">Movies</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 xl:gap-x-2">
          {mediaItems.map((mediaItem) => (
            <MediaCard
              key={mediaItem.id}
              media={mediaItem}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto px-4 py-8 sm:px-6">
        <h2 className="font-semibold my-4">Series</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 xl:gap-x-2">
          {mediaItems.map((mediaItem) => (
            <MediaCard
              key={mediaItem.id}
              media={mediaItem}
            />
          ))}
        </div>
      </div>
    </div>
  )
}