import React from 'react';

import { ArtistCard, ArtistGridSkeleton, Error, PageHeaderSkeleton } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useLanguage } from '../context/LanguageContext';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { t } = useLanguage();
  const artists = Array.from(new Map((data || []).map((track) => [track.subtitle, {
    ...track,
    key: `${track.artists?.[0]?.adamid || track.subtitle}-${track.key}`,
  }])).values());

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {isFetching ? <PageHeaderSkeleton /> : <h2 className="mb-6 mt-2 text-left text-2xl font-bold text-white sm:mb-10 sm:mt-4 sm:text-3xl">{t.topArtists}</h2>}

      {isFetching ? <ArtistGridSkeleton /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
          {artists.slice(0, 8).map((track) => <ArtistCard key={track.key} track={track} />)}
        </div>
      )}
    </div>
  );
};

export default TopArtists;
