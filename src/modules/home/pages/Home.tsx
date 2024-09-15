import React, { useEffect, useState } from 'react'
import { Header } from 'components/Header/Header'
import { MediaList } from 'components/MediaList/MediaList'
import { get } from 'utils/helpers'
import { Media } from '../../../models/Media.model'
import { useParams } from 'react-router-dom'
import { Type } from 'models/Type.model'
import { MediaCatalogue } from 'components/MediaCatalogue/MediaCatalogue'

export const Home = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [types, setTypes] = useState<Type>()
  const params = useParams()

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await get('movies')
        const typesData = await get('types')
        setMediaItems(items.data)
        setTypes(typesData)
      } catch(err) {
        console.log(err)
      }
    }

    getItems()
  }, [])

  return (
    <div className="bg-zinc-900">
      <Header />
      {/* <MediaList mediaItems={mediaItems} /> */}
      <MediaCatalogue mediaItems={mediaItems} />
    </div>
  )
}