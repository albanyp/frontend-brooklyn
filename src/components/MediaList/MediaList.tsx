import React, { useEffect, useState } from "react";
import { MediaCard } from "components/MediaCard/MediaCard";
import { Media } from "models/Media.model";
import { Modal } from "components/Modal/Modal";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { get } from "utils/helpers";
import { Type } from "models/Type.model";

interface MediaListProps {
  title: string;
  mediaItems: Media[];
  handleMediaClick: any
}

export const MediaList = ({ title, mediaItems, handleMediaClick }: MediaListProps) => {
  const [types, setTypes] = useState<Type[]>();

  const movies = []
  const series = []
  const documentaries = []
  const limitedSeries = []

  useEffect(() => {
    (async () => {
      const typesData = await get("types");
      setTypes(typesData.data);
    })();
  }, []);

  (function () {
    mediaItems.map(mediaItem => {
      types.forEach(type => {
        switch (type.name) {
          case 'movie':
            if (mediaItem.typeId == type.id) {
              movies.push(mediaItem)
            }
            break
          case 'series':
            if (mediaItem.typeId == type.id) {
              series.push(mediaItem)
            }
            break
          case 'documentary':
            if (mediaItem.typeId == type.id) {
              documentaries.push(mediaItem)
            }
            break
          case 'Limited Series':
            if (mediaItem.typeId == type.id) {
              limitedSeries.push(mediaItem)
              break
            }
        }
      })
    })
  })()

  return (
    <div className="mb-6">
      <h2 className="font-bold text-xl mb-2 text-zinc-300">{title}</h2>
      <div className="flex overflow-x-auto">
        {mediaItems.map((item) => {
          return (
            <MediaCard
              key={item.id}
              logoUrl={`${process.env.REACT_APP_BASE_URL}/${item.logoUrl}`}
              title={item.title}
              onClick={() => handleMediaClick(item.id)}
              style="mr-1.5 sm:mr-2"
            />
          );
        })}
      </div>
    </div>
  );
};
