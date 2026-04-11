import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, PageHeaderSkeleton, SongCard, SongGridSkeleton } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data || [];
  const { t } = useLanguage();

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {isFetching ? <PageHeaderSkeleton /> : (
        <h2 className="mb-6 mt-2 text-left text-2xl font-bold text-white sm:mb-10 sm:mt-4 sm:text-3xl">
          {t.showingResultsFor}
          {' '}
          <span className="break-all font-black">{searchTerm}</span>
        </h2>
      )}

      {isFetching ? <SongGridSkeleton /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
          {songs?.slice(0, 8).map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={songs}
              i={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
