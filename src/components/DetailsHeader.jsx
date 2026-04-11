import React from 'react';
import { Link } from 'react-router-dom';

const getArtistImage = (artistData) => {
  const image = artistData?.attributes?.artwork?.url || '';
  return image.replace('{w}', '500').replace('{h}', '500');
};

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className="relative mb-8 w-full overflow-hidden rounded-[2rem] bg-gradient-to-r from-white/10 via-white/5 to-transparent p-4 sm:p-6">
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
    <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
      <img
        alt="profile"
        src={artistId ? getArtistImage(artistData) : songData?.images?.coverart}
        className="h-28 w-28 shrink-0 rounded-full border-2 object-cover shadow-xl shadow-black sm:h-40 sm:w-40 lg:h-48 lg:w-48"
      />

      <div className="min-w-0 flex-1">
        <p className="break-words font-bold text-2xl text-white sm:text-3xl lg:text-4xl">
          {artistId ? artistData?.attributes?.name : songData?.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
            <p className="mt-2 text-sm text-gray-300 sm:text-base">{songData?.subtitle}</p>
          </Link>
        )}

        <p className="mt-2 text-sm text-gray-300 sm:text-base">
          {artistId
            ? artistData?.attributes?.genreNames?.[0]
            : songData?.genres?.primary}
        </p>
      </div>
    </div>
  </div>
);

export default DetailsHeader;
