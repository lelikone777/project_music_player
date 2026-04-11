import React from 'react';
import { useSelector } from 'react-redux';

import { Error, PageHeaderSkeleton, SongCard, SongGridSkeleton } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { t } = useLanguage();

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {isFetching ? <PageHeaderSkeleton /> : <h2 className="mb-6 mt-2 text-left text-2xl font-bold text-white sm:mb-10 sm:mt-4 sm:text-3xl">{t.discoverTopCharts}</h2>}

      {isFetching ? <SongGridSkeleton /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
          {data?.slice(0, 8).map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCharts;
