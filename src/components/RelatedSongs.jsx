import React from 'react';

import SongBar from './SongBar';
import { useLanguage } from '../context/LanguageContext';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">{t.relatedSongs}</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
