import React from 'react';

import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { t } = useLanguage();

  if (isFetching) return <Loader title={t.loadingArtists} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="mb-6 mt-2 text-left text-2xl font-bold text-white sm:mb-10 sm:mt-4 sm:text-3xl">{t.topArtists}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.slice(0, 8).map((track) => <ArtistCard key={track.key} track={track} />)}
      </div>
    </div>
  );
};

export default TopArtists;
