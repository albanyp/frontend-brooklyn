import React from 'react'
import { Media } from '../../models/Media.model'
import clsx from 'clsx'
export interface MediaCardProps {
  media: Media
  onClick?: any
}

export const MediaCard = ({ logoUrl, title, onClick, style = '' }) => {
  return (
    <button className={clsx("max-w-10 shrink-0 h-56 w-36 sm:h-60 sm:w-40 sm:max-h-80 md:max-h-full ", style)}>
      <a className="group" onClick={onClick}>
        <div className="aspect-h-1 aspect-w-1 h-full w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={logoUrl}
            alt={title}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </a>

    </button>
  )
}