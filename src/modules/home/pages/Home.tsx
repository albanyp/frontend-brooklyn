import React, { useEffect, useState } from 'react'
import { Header } from 'components/Header/Header'
import { MediaList } from 'components/MediaList/MediaList'
import { get } from 'utils/helpers'
import { Media } from '../../../models/Media.model'

export const Home = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await get('movies')
        setMediaItems(items.data)
      } catch(err) {
        console.log(err)
      }
    }

    getItems()
  }, [])


  return (
    <>
      <Header />
      <MediaList mediaItems={mediaItems} />
    </>
  )
}