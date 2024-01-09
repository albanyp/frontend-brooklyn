import React, { useState } from 'react'
import { MediaCard } from 'components/MediaCard/MediaCard'
import { Media } from 'models/Media.model'
import { Modal } from 'components/Modal/Modal'

interface MediaListProps {
  mediaItems: Media[]
}

export const MediaList = ({ mediaItems }: MediaListProps) => {
  const [showMediaModal, setShowMediaModal] = useState<boolean>()

  const displayModal = () => {
    console.log('trigger event')
    setShowMediaModal(true)
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto px-4 pt-4 pb-8 sm:px-6">
        <h2 className="font-semibold text-lg my-4">Movies</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 xl:gap-x-2">
          {mediaItems.map(item => (
            <MediaCard
              key={item.id}
              // media={item}
              logoUrl={item.logoUrl}
              title={item.title}
              onClick={displayModal}
            />
            ))}
            {showMediaModal && <Modal /> }
        </div>
      </div>

      <div className="mx-auto px-4 pb-8 sm:px-6">
        <h2 className="font-semibold text-lg my-4">Series</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 xl:gap-x-2">
          {mediaItems.map((item) => (
            <MediaCard
              key={item.id}
              // media={item}
              logoUrl={item.logoUrl}
              title={item.title}
              onClick={displayModal}
            />
          ))}
        </div>
      </div>
    </div>
  )
}