import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, DetailsSkeleton, Error, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { t } = useLanguage();

  const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const isLoading = isFetchingSongDetails || isFetchinRelatedSongs;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      {isLoading ? <DetailsSkeleton /> : (
        <>
          <DetailsHeader
            artistId={artistId}
            songData={songData}
          />

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.lyrics}</h2>

            <div className="mt-5">
              {songData?.sections?.[1]?.type === 'LYRICS'
                ? songData?.sections?.[1]?.text?.map((line, i) => (
                  <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
                ))
                : (
                  <p className="text-gray-400 text-base my-1">{t.noLyrics}</p>
                )}
            </div>
          </div>

          <RelatedSongs
            data={data}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </>
      )}
    </div>
  );
};

export default SongDetails;
