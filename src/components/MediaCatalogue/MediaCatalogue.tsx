import { MediaList } from "components/MediaList/MediaList";
import { Modal } from "components/Modal/Modal";
import { Media } from "models/Media.model";
import { Type } from "models/Type.model";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "utils/helpers";

export const MediaCatalogue = (mediaItems) => {
	const [media, setMedia] = useState<Media>();
	const [types, setTypes] = useState<Type[]>();
	const [queryParams] = useSearchParams()
	const navigate = useNavigate()

	const movies = [];
	const series = [];
	const documentaries = [];
	const limitedSeries = [];

	useEffect(() => {
		(async () => {
			const typesData = await get("types");
			setTypes(typesData.data);

			const mediaId = queryParams.get("media_id")
			if (mediaId) {
				const selectedMedia = await get(`movies/${mediaId}`)
				setMedia(selectedMedia)
			}

		})();
	}, [queryParams]);

	(function () {
		mediaItems.mediaItems.map(mediaItem => {
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

	const handleClick = (id) => {
		navigate(`/?media_id=${id}`, { replace: true });
	}

	const handleClose = () => {
		setMedia(null)
		navigate("/", { replace: true });
	}

	return (
		<div className="flex flex-col h-screen bg-zinc-900 overscroll-none">
			<div className="mx-auto px-4 pt-4 pb-8 sm:px-6 overflow-x-auto w-full">
				<Modal
					show={!!media}
					content={media}
					onClose={handleClose}
				/>
				<MediaList handleMediaClick={handleClick} title="Movies" mediaItems={movies} />
				<MediaList handleMediaClick={handleClick} title="Series" mediaItems={series} />
				<MediaList handleMediaClick={handleClick} title="Documentaries" mediaItems={documentaries} />
				<MediaList handleMediaClick={handleClick} title="Limited Series" mediaItems={limitedSeries} />
			</div>
		</div>
	);
};
